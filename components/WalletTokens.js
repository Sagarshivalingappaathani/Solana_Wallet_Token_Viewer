import { useEffect, useState } from 'react';
import { connectWallet, getTokenAccounts } from '../utils/solana';

const WalletTokens = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      const address = await connectWallet();
      setWalletAddress(address);

      if (address) {
        const tokenAccounts = await getTokenAccounts(address);
        setTokens(tokenAccounts);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Wallet: {walletAddress ? walletAddress : 'Not Connected'}
        </h2>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Token Accounts:</h3>
        <ul className="space-y-4">
          {tokens.length > 0 ? (
            tokens.map((token, idx) => (
              <li 
                key={idx} 
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-md transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl"
              >
                <p className="text-gray-800">
                  <span className="font-semibold text-blue-600">Program ID:</span> {token.programId}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold text-blue-600">Mint Address:</span> {token.mintAddress}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold text-blue-600">Token Balance:</span> {token.tokenAmount}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold text-blue-600">Token Owner:</span> {token.owner}
                </p>
                <p className="text-gray-800">
                  <span className="font-semibold text-blue-600">State:</span> {token.state}
                </p>
              </li>
            ))
          ) : (
            <p className="text-red-500">No tokens found or wallet not connected.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default WalletTokens;
