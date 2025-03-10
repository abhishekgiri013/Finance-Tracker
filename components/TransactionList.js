"use client";
import { useState } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

export default function TransactionList({ transactions, onDelete, onUpdate }) {
  const [editTransaction, setEditTransaction] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const handleEdit = (transaction) => {
    setEditTransaction(transaction._id);
    setUpdatedData(transaction);
  };

  const handleUpdate = async () => {
    await fetch(`/api/transactions/${editTransaction}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    setEditTransaction(null);
    onUpdate(); // Refresh data
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Transactions</h2>
      <ul className="bg-white shadow-md rounded-lg p-4">
        {transactions.map((transaction) => (
          <li key={transaction._id} className="mb-3 p-3 border rounded-lg flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition">
            {editTransaction === transaction._id ? (
              <div className="flex flex-wrap items-center gap-2 w-full">
                <input
                  type="number"
                  value={updatedData.amount}
                  onChange={(e) => setUpdatedData({ ...updatedData, amount: e.target.value })}
                  className="p-2 border rounded w-20"
                />
                <input
                  type="date"
                  value={updatedData.date}
                  onChange={(e) => setUpdatedData({ ...updatedData, date: e.target.value })}
                  className="p-2 border rounded w-32"
                />
                <input
                  type="text"
                  value={updatedData.description}
                  onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                  className="p-2 border rounded flex-1"
                />
                <button onClick={handleUpdate} className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition">
                  <FaCheck />
                </button>
                <button onClick={() => setEditTransaction(null)} className="bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition">
                  <FaTimes />
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span className="text-gray-700 font-medium">{transaction.amount} | {transaction.date} | {transaction.description}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(transaction)} className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition">
                    <FaEdit />
                  </button>
                  <button onClick={() => onDelete(transaction._id)} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition">
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
