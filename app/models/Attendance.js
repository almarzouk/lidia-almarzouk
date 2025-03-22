import mongoose from "mongoose";

// ✅ تعريف مخطط الحضور
const AttendanceSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true, unique: true },
    response: { type: String, enum: ["yes", "no"], required: true },
  },
  { timestamps: true } // ✅ إضافة تاريخ الإنشاء والتحديث
);

// ✅ إنشاء أو استخدام المودل
const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);

export default Attendance;
