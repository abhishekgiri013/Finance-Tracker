import { connectToDB } from "@/lib/mongodb.js";
import transaction from "@/models/transaction";

// GET: Fetch all transactions
export async function GET() {
    try {
        await connectToDB();
        const transactions = await transaction.find().sort({ createdAt: -1 });
        return Response.json(transactions, { status: 200 });
    } catch (error) {
        return Response.json({ message: "Error fetching transactions", error }, { status: 500 });
    }
}

// POST: Create a new transaction
export async function POST(req) {
    try {
        await connectToDB();
        const { amount, date, description } = await req.json();

        if (!amount || !date || !description) {
            return Response.json({ message: "All fields are required" }, { status: 400 });
        }

        const newTransaction = await transaction.create({ amount, date, description });
        return Response.json(newTransaction, { status: 201 });
    } catch (error) {
        return Response.json({ message: "Error creating transaction", error }, { status: 500 });
    }
}
