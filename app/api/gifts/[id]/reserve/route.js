import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Gift from "../../../../models/Gift";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { reservedBy } = await req.json();

    console.log("📌 محاولة حجز الهدية:", id, "بواسطة:", reservedBy);

    const gift = await Gift.findById(id);
    if (!gift) {
      return NextResponse.json({ error: "الهدية غير موجودة" }, { status: 404 });
    }

    if (gift.reserved) {
      return NextResponse.json(
        { error: "تم حجز هذه الهدية بالفعل" },
        { status: 400 }
      );
    }

    gift.reserved = true;
    gift.reservedBy = reservedBy;
    await gift.save();

    return NextResponse.json(gift, { status: 200 });
  } catch (error) {
    console.error("❌ خطأ أثناء الحجز:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء الحجز" }, { status: 500 });
  }
}
