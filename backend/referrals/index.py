'''
Business: Управление реферальной программой - регистрация рефералов и начисление наград
Args: event - dict с httpMethod, body (referrer_id, referred_id) или queryStringParameters
Returns: HTTP response с данными о рефералах и наградах
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database configuration missing'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        referrer_id = body_data.get('referrer_id')
        referred_id = body_data.get('referred_id')
        
        if not referrer_id or not referred_id:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'referrer_id and referred_id required'}),
                'isBase64Encoded': False
            }
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute('''
            INSERT INTO referrals (referrer_id, referred_id, reward_amount, conditions_met)
            VALUES (%s, %s, %s, %s)
            RETURNING id, referrer_id, referred_id, reward_amount, conditions_met, created_at
        ''', (referrer_id, referred_id, 200.00, False))
        
        referral = cursor.fetchone()
        
        cursor.execute('UPDATE users SET referred_by = %s WHERE id = %s', (referrer_id, referred_id))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'message': 'Реферал зарегистрирован',
                'referral': dict(referral)
            }, default=str),
            'isBase64Encoded': False
        }
    
    if method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        referral_id = body_data.get('referral_id')
        conditions_met = body_data.get('conditions_met', True)
        
        if not referral_id:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'referral_id required'}),
                'isBase64Encoded': False
            }
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute('''
            UPDATE referrals 
            SET conditions_met = %s, reward_paid = %s, paid_at = CURRENT_TIMESTAMP
            WHERE id = %s
            RETURNING id, referrer_id, reward_amount
        ''', (conditions_met, True, referral_id))
        
        referral = cursor.fetchone()
        
        if referral and conditions_met:
            cursor.execute('''
                UPDATE users 
                SET balance = balance + %s 
                WHERE id = %s
            ''', (referral['reward_amount'], referral['referrer_id']))
            
            cursor.execute('''
                INSERT INTO transactions (user_id, type, amount, status, description)
                VALUES (%s, %s, %s, %s, %s)
            ''', (referral['referrer_id'], 'referral', referral['reward_amount'], 'success', 'Реферальная награда'))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'message': 'Награда начислена',
                'referral': dict(referral) if referral else None
            }, default=str),
            'isBase64Encoded': False
        }
    
    if method == 'GET':
        user_id = event.get('queryStringParameters', {}).get('user_id')
        
        if not user_id:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'user_id required'}),
                'isBase64Encoded': False
            }
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute('''
            SELECT r.id, r.referred_id, r.reward_amount, r.reward_paid, r.conditions_met, 
                   r.created_at, r.paid_at, u.first_name, u.username
            FROM referrals r
            JOIN users u ON u.id = r.referred_id
            WHERE r.referrer_id = %s
            ORDER BY r.created_at DESC
        ''', (user_id,))
        
        referrals = cursor.fetchall()
        
        cursor.execute('''
            SELECT SUM(reward_amount) as total_earned
            FROM referrals
            WHERE referrer_id = %s AND reward_paid = true
        ''', (user_id,))
        
        stats = cursor.fetchone()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'referrals': [dict(r) for r in referrals],
                'total_earned': float(stats['total_earned']) if stats['total_earned'] else 0.0,
                'total_count': len(referrals)
            }, default=str),
            'isBase64Encoded': False
        }
    
    conn.close()
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
