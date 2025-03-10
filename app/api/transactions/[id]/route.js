
import { connectToDB } from "@/lib/mongodb";
import transaction from "@/models/transaction";

import { NextResponse } from "next/server";

// GET: Fetch a single transaction by ID
export async function GET(req) {
    try {
      await connectToDB();
      const transactions = await transaction.find();
      console.log("Transactions from DB:", transactions); // ✅ Debugging line
  
      return new Response(JSON.stringify(transactions), { status: 200 });
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return new Response("Error fetching transactions", { status: 500 });
    }
  }

// PUT: Update a transaction by ID
export async function PUT(req, { params }) {
    try {
        await connectToDB();
        const { amount, date, description } = await req.json();

        const updatedTransaction = await transaction.findByIdAndUpdate(
            params.id,
            { amount, date, description },
            { new: true, runValidators: true }
        );

        if (!updatedTransaction) {
            return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTransaction, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error updating transaction", error }, { status: 500 });
    }
}

// DELETE: Remove a transaction by ID
export async function DELETE(req, { params }) {
    try {
        await connectToDB();
        const deletedTransaction = await transaction.findByIdAndDelete(params.id);

        if (!deletedTransaction) {
            return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Transaction deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting transaction", error }, { status: 500 });
    }
}
