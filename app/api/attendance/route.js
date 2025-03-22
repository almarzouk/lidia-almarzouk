import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import Attendance from "../../models/Attendance";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");

  if (userEmail) {
    const attendance = await Attendance.findOne({ userEmail });
    return NextResponse.json(attendance || {});
  }

  // ✅ جلب إحصائيات الحضور والاعتذار
  const attendingCount = await Attendance.countDocuments({ response: "yes" });
  const notAttendingCount = await Attendance.countDocuments({ response: "no" });

  return NextResponse.json({ attendingCount, notAttendingCount });
}

// ✅ إضافة أو تحديث الحضور
export async function POST(req) {
  await connectDB();
  const { userEmail, response } = await req.json();

  if (!userEmail || !response) {
    return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
  }

  // ✅ البحث عن الحضور للمستخدم وتحديثه إذا كان موجودًا
  const updatedAttendance = await Attendance.findOneAndUpdate(
    { userEmail },
    { response },
    { new: true, upsert: true } // 🔄 upsert: true لإنشاءه إذا لم يكن موجودًا
  );

  return NextResponse.json(updatedAttendance);
}
