import { useState } from "react";

export default function TransactionForm({ onTransactionAdded }) {
  const [form, setForm] = useState({ amount: "", date: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    onTransactionAdded();
    setForm({ amount: "", date: "", description: "" });
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-6 bg-white shadow-lg rounded-md flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <label className="font-medium text-gray-700">Amount</label>
      <input 
        name="amount" 
        type="number" 
        value={form.amount} 
        onChange={handleChange} 
        placeholder="Enter Amount" 
        required 
        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="font-medium text-gray-700">Date</label>
      <input 
        name="date" 
        type="date" 
        value={form.date} 
        onChange={handleChange} 
        required 
        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="font-medium text-gray-700">Description</label>
      <input 
        name="description" 
        type="text" 
        value={form.description} 
        onChange={handleChange} 
        placeholder="Enter Description" 
        required 
        className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button 
        type="submit" 
        className="bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition"
      >
        Add Transaction
      </button>
    </form>
  );
}
