import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Gift from "../../../../models/Gift";

export async function POST(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const gift = await Gift.findById(id);
    if (!gift) {
      return NextResponse.json({ error: "الهدية غير موجودة" }, { status: 404 });
    }

    // تحديث حالة الحجز
    gift.reserved = false;
    gift.reservedBy = null;
    await gift.save();

    return NextResponse.json({ message: "تم إلغاء الحجز بنجاح" });
  } catch (error) {
    console.error("❌ خطأ أثناء إلغاء الحجز:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إلغاء الحجز" },
      { status: 500 }
    );
  }
}
