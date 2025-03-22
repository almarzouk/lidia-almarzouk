import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import Gift from "../../models/Gift";

export async function GET() {
  await connectDB();
  const gifts = await Gift.find();
  return NextResponse.json(gifts);
}

export async function POST(req) {
  try {
    await connectDB();
    const { name, price, image, link } = await req.json();

    if (!name || !price || !image || !link) {
      return NextResponse.json(
        { error: "جميع الحقول مطلوبة" },
        { status: 400 }
      );
    }

    const newGift = new Gift({
      name,
      price: parseFloat(price), // تحويل السعر إلى رقم
      image,
      reserved: false,
      reservedBy: null,
      link,
    });

    await newGift.save();
    console.log("✅ الهدية المضافة:", newGift);
    return NextResponse.json(newGift, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "حدث خطأ أثناء إضافة الهدية" },
      { status: 500 }
    );
  }
}
