"use client";
import MonthlyChart from "@/components/MonthyChart";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import { useEffect, useState } from "react";

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://your-deployed-url.com";

const fetchTransactions = async () => {
  try {
    const res = await fetch(`${API_URL}/api/transactions`);
    const data = await res.json();
    setTransactions(data);
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    fetchTransactions(); // Refresh data
  };

  const handleUpdate = () => {
    fetchTransactions(); // Refresh after update
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col items-center py-10 px-4">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-white mb-6">💰 Expense Tracker</h1>
      <p className="text-lg text-gray-200 mb-8 text-center max-w-lg">
        Keep track of your expenses effortlessly. Add, update, and analyze your transactions!
      </p>

      {/* Grid Layout */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transaction Form */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Add Transaction</h2>
          <TransactionForm onTransactionAdded={fetchTransactions} />
        </div>

        {/* Transaction List */}
        <div className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📜 Transactions</h2>
          <TransactionList transactions={transactions} onDelete={handleDelete} onUpdate={handleUpdate} />
        </div>
      </div>

      {/* Monthly Chart Section */}
      <div className="w-full max-w-5xl bg-white p-6 mt-8 rounded-lg shadow-lg transition hover:shadow-2xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Monthly Overview</h2>
        <MonthlyChart transactions={transactions} />
      </div>
    </div>
  );
}
