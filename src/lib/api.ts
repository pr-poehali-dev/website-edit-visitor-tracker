const API_URLS = {
  deposits: 'https://functions.poehali.dev/642a5370-29be-4598-acdb-631ed0f26a5c',
  withdrawals: 'https://functions.poehali.dev/8579d82c-1127-4572-812b-0c58dd919bae',
  referrals: 'https://functions.poehali.dev/007d145d-c251-4d36-bfaf-b862c118c3af',
};

export const createDeposit = async (userId: number, amount: number, checkImageUrl: string) => {
  const response = await fetch(API_URLS.deposits, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      amount,
      check_image_url: checkImageUrl,
    }),
  });
  return response.json();
};

export const getUserDeposits = async (userId: number) => {
  const response = await fetch(`${API_URLS.deposits}?user_id=${userId}`);
  return response.json();
};

export const createWithdrawal = async (
  userId: number,
  amount: number,
  cardNumber: string,
  bankName: string
) => {
  const response = await fetch(API_URLS.withdrawals, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      amount,
      card_number: cardNumber,
      bank_name: bankName,
    }),
  });
  return response.json();
};

export const getUserWithdrawals = async (userId: number) => {
  const response = await fetch(`${API_URLS.withdrawals}?user_id=${userId}`);
  return response.json();
};

export const registerReferral = async (referrerId: number, referredId: number) => {
  const response = await fetch(API_URLS.referrals, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      referrer_id: referrerId,
      referred_id: referredId,
    }),
  });
  return response.json();
};

export const getUserReferrals = async (userId: number) => {
  const response = await fetch(`${API_URLS.referrals}?user_id=${userId}`);
  return response.json();
};

export const activateReferralReward = async (referralId: number, conditionsMet: boolean = true) => {
  const response = await fetch(API_URLS.referrals, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      referral_id: referralId,
      conditions_met: conditionsMet,
    }),
  });
  return response.json();
};
