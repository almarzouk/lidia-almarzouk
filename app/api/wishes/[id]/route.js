import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Wish from "../../../models/Wish";

// ✅ تحديث نص الأمنية
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "يجب إدخال نص الأمنية" },
        { status: 400 }
      );
    }

    // تحديث الأمنية
    const updatedWish = await Wish.findByIdAndUpdate(
      id,
      { text },
      { new: true }
    );

    if (!updatedWish) {
      return NextResponse.json(
        { error: "الأمنية غير موجودة" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "تم تحديث الأمنية بنجاح",
      wish: updatedWish,
    });
  } catch (error) {
    console.error("❌ خطأ أثناء تحديث الأمنية:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء التحديث" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deletedWish = await Wish.findByIdAndDelete(id);

    if (!deletedWish) {
      return NextResponse.json(
        { error: "الأمنية غير موجودة" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "تم حذف الأمنية بنجاح",
      wish: deletedWish,
    });
  } catch (error) {
    console.error("❌ خطأ أثناء حذف الأمنية:", error);
    return NextResponse.json({ error: "حدث خطأ أثناء الحذف" }, { status: 500 });
  }
}
