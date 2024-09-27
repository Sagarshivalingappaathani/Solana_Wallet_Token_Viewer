import { Connection, PublicKey } from '@solana/web3.js';

const SOLANA_NETWORK = 'https://api.devnet.solana.com';

// Token program IDs
const TOKEN_PROGRAM_IDS = [
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb', // token program-22
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA', // Official SPL token program ID
];

// Connect to user's wallet 
export const connectWallet = async () => {
  try {
    const provider = window.solana; 
    if (provider && provider.isPhantom) {
      await provider.connect();
      console.log('Connected to wallet:', provider.publicKey.toString());
      return provider.publicKey.toString(); 
    } else {
      alert('Please install a Solana wallet (e.g., Phantom).');
    }
  } catch (error) {
    console.error('Error connecting wallet:', error);
  }
};

export const getTokenAccounts = async (walletAddress) => {
  const connection = new Connection(SOLANA_NETWORK);

  let publicKey;
  try {
    publicKey = new PublicKey(walletAddress);
  } catch (error) {
    console.error("Invalid wallet address:", error);
    return [];
  }
  

  const tokenAccountsResults = [];

  try {
    for (const programId of TOKEN_PROGRAM_IDS) {
      try {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
          publicKey,
          {
            programId: new PublicKey(programId), 
          }
        );
        
        tokenAccounts.value.forEach((accountInfo) => {
          const tokenAmount = accountInfo.account.data.parsed.info.tokenAmount.uiAmount;
          const mintAddress = accountInfo.account.data.parsed.info.mint;
          const owner = accountInfo.account.data.parsed.info.owner;
          const state = accountInfo.account.data.parsed.info.state;
          tokenAccountsResults.push({ programId, mintAddress, tokenAmount, owner, state });
        });
      } catch (error) {
        console.error(`Error with program ID ${programId}:`, error);
      }
    }
    
    return tokenAccountsResults;
  } catch (error) {
    console.error('Error fetching token accounts:', error);
    return [];
  }
};


