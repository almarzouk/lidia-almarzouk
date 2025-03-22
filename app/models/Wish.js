import mongoose from "mongoose";

// ✅ تعريف مخطط الأمنيات
const WishSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "يجب كتابة الأمنية"],
      trim: true,
      maxlength: [500, "يجب ألا تتجاوز الأمنية 500 حرف"],
    },
    userEmail: {
      type: String,
      required: [true, "يجب إدخال البريد الإلكتروني"],
      unique: true, // ✅ كل مستخدم يمكنه إضافة أمنية واحدة فقط
    },
    userName: {
      type: String,
      required: [true, "يجب إدخال اسم المستخدم"],
    },
    userImage: {
      type: String, // ✅ تخزين صورة المستخدم
    },
    likes: {
      type: Number,
      default: 0, // ✅ عدد الإعجابات يبدأ من 0
    },
  },
  { timestamps: true }
);

// ✅ إنشاء المودل أو استخدامه إذا كان موجودًا مسبقًا
const Wish = mongoose.models.Wish || mongoose.model("Wish", WishSchema);

export default Wish;
