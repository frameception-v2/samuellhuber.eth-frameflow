/**
 * Reward DEGEN points to a wallet address
 * @param walletAddress Recipient's wallet address
 * @returns Promise with API response
 */
export async function rewardPoints(walletAddress: string): Promise<any> {
  try {
    const response = await fetch('https://api.degen.org/rewards', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEGEN_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ address: walletAddress, points: 10 })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to reward points:', error);
    throw error;
  }
}
