import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import Gift from "../../../../models/Gift";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const gift = await Gift.findById(id);
    if (!gift) {
      return NextResponse.json(
        { error: "❌ الهدية غير موجودة" },
        { status: 404 }
      );
    }

    await Gift.findByIdAndDelete(id);

    return NextResponse.json({ message: "✅ تم حذف الهدية بنجاح" });
  } catch (error) {
    return NextResponse.json(
      { error: "❌ خطأ أثناء حذف الهدية" },
      { status: 500 }
    );
  }
}
