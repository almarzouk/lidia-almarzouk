import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import Wish from "../../models/Wish";

export async function GET() {
  await connectDB();
  const wishes = await Wish.find();
  return NextResponse.json(wishes);
}

export async function POST(req) {
  await connectDB();
  const { text, userEmail, userName, userImage } = await req.json();

  if (!text || !userEmail || !userName || !userImage) {
    return NextResponse.json(
      { error: "❌ جميع الحقول مطلوبة" },
      { status: 400 }
    );
  }

  const newWish = new Wish({ text, userEmail, userName, userImage });
  await newWish.save();

  return NextResponse.json(newWish, { status: 201 });
}
