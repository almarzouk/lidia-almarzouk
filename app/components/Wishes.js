"use client";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function Wishes() {
  const { data: session } = useSession();
  const [wishes, setWishes] = useState([]);
  const [newWish, setNewWish] = useState("");
  const [userWish, setUserWish] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingWish, setEditingWish] = useState(false);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const res = await fetch("/api/wishes");
        const data = await res.json();
        setWishes(data);

        if (session) {
          const existingWish = data.find(
            (wish) => wish.userEmail === session.user.email
          );
          if (existingWish) {
            setUserWish(existingWish);
            setNewWish(existingWish.text);
          }
        }
      } catch (error) {
        console.error("❌ خطأ أثناء جلب الأمنيات:", error);
      }
    };

    fetchWishes();
  }, [session]);

  const deleteWish = async () => {
    if (!window.confirm("هل أنت متأكد أنك تريد حذف الأمنية؟")) return;

    try {
      const res = await fetch(`/api/wishes/${userWish._id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUserWish(null);
        setNewWish("");
        fetchWishes();
      } else {
        console.error("❌ فشل في حذف الأمنية");
      }
    } catch (error) {
      console.error("❌ خطأ أثناء حذف الأمنية:", error);
    }
  };
  const submitWish = async () => {
    if (!newWish.trim()) return;
    setLoading(true);

    if (userWish && !editingWish) {
      window.alert("❌ لا يمكنك إضافة أكثر من أمنية واحدة!");
      setLoading(false);
      return;
    }

    const method = userWish ? "PUT" : "POST";
    const url = userWish ? `/api/wishes/${userWish._id}` : "/api/wishes";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: newWish,
          userEmail: session.user.email,
          userName: session.user.name,
          userImage: session.user.image,
        }),
      });

      if (res.ok) {
        fetchWishes();
        setEditingWish(false);
      } else {
        console.error("❌ خطأ أثناء حفظ الأمنية");
      }
    } catch (error) {
      console.error("❌ خطأ أثناء حفظ الأمنية:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-20 px-6 bg-gradient-to-b from-purple-50 to-purple-100 text-center">
      <motion.div
        className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-purple-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-5xl font-extrabold text-purple-700 mb-6">
          🌟 أضف أمنية لليديا في عيد ميلادها! 🎂🎉
        </h2>

        {/* ✅ نموذج إدخال الأمنية */}
        {session ? (
          userWish && !editingWish ? (
            <motion.p
              className="text-lg text-green-600 font-semibold bg-green-100 p-4 rounded-xl shadow-sm"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              ✅ تم تسجيل أمنيتك: &quot;{userWish.text}&quot;{" "}
            </motion.p>
          ) : (
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <textarea
                value={newWish}
                onChange={(e) => setNewWish(e.target.value)}
                placeholder="✨ اكتب أمنيتك هنا..."
                className="w-full p-4 border-2 border-purple-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 text-lg resize-none text-black bg-purple-50 shadow-inner"
                rows="3"
              />
              <motion.button
                onClick={submitWish}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg transition duration-300"
              >
                {loading
                  ? "⏳ جاري الحفظ..."
                  : editingWish
                  ? "💾 حفظ التعديلات"
                  : "✨ إضافة الأمنية"}
              </motion.button>
            </motion.div>
          )
        ) : (
          <motion.p
            className="text-lg text-gray-600 bg-gray-100 p-4 rounded-xl shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ⛔ يجب{" "}
            <span
              onClick={signIn}
              className="text-blue-500 cursor-pointer underline font-bold"
            >
              تسجيل الدخول
            </span>{" "}
            لإضافة أمنية!
          </motion.p>
        )}

        {/* ✅ عرض الأمنيات */}
        <h3 className="text-3xl font-bold text-gray-800 mt-10 mb-6">
          📜 الأمنيات المضافة
        </h3>
        {wishes.length === 0 ? (
          <p className="text-gray-500">
            لا توجد أمنيات حتى الآن! كن أول من يكتب أمنية! 🎉
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {wishes.map((wish) => (
              <motion.div
                key={wish._id}
                className="relative bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex items-center space-x-4 transform transition hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-left">
                  <h4 className="text-lg font-bold text-purple-700">
                    {wish.userName}
                  </h4>
                  <p className="text-gray-700">{wish.text}</p>
                </div>

                {/* ✅ زر التعديل */}
                {session && session.user.email === wish.userEmail && (
                  <>
                    <motion.button
                      onClick={() => {
                        setEditingWish(true);
                        setNewWish(wish.text);
                        setUserWish(wish);
                      }}
                      whileHover={{ scale: 1.2 }}
                      className="mr-10 absolute top-2 right-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full text-sm shadow-md transition"
                      title="تعديل الأمنية"
                    >
                      ✏️
                    </motion.button>
                    <motion.button
                      onClick={deleteWish}
                      whileHover={{ scale: 1.2 }}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full text-sm shadow-md transition"
                      title="حذف الأمنية"
                    >
                      🗑️
                    </motion.button>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
