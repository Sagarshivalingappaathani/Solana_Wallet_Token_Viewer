"use client"
import WalletTokens from '../components/WalletTokens';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Your Solana Wallet All Tokens
        </h1>
        <WalletTokens />
      </div>
    </div>
  );
}
