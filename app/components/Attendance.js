"use client";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";
export default function Attendance() {
  const { data: session } = useSession();
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    attendingCount: 0,
    notAttendingCount: 0,
  });

  // ✅ تحميل الحضور والإحصائيات من قاعدة البيانات
  useEffect(() => {
    const fetchAttendance = async () => {
      if (!session) return;
      try {
        const res = await fetch(
          `/api/attendance?userEmail=${session.user.email}`
        );
        const data = await res.json();
        if (data.response) {
          setAttendance(data.response);
        }
      } catch (error) {
        console.error("❌ خطأ أثناء تحميل الحضور:", error);
      }
    };

    fetchAttendance();
    fetchStats();
  }, [session]);

  const fetchAttendance = async () => {
    if (!session) return;
    try {
      const res = await fetch(
        `/api/attendance?userEmail=${session.user.email}`
      );
      const data = await res.json();
      if (data.response) {
        setAttendance(data.response);
      }
    } catch (error) {
      console.error("❌ خطأ أثناء تحميل الحضور:", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/attendance");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("❌ خطأ أثناء تحميل الإحصائيات:", error);
    }
  };

  // ✅ تحديث أو تعديل الحضور في قاعدة البيانات
  const handleResponse = async (response) => {
    setLoading(true);
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: session.user.email, response }),
      });

      if (res.ok) {
        setAttendance(response);
        fetchStats(); // ✅ تحديث الإحصائيات مباشرة بعد الحجز
      } else {
        console.error("❌ خطأ أثناء تحديث الحضور");
      }
    } catch (error) {
      console.error("❌ خطأ أثناء تحديث الحضور:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-16 md:py-24 text-center bg-gradient-to-br from-blue-500 to-purple-700 text-white min-h-screen flex items-center justify-center relative px-4">
      {/* ⭐ نجوم متلألئة */}
      <div className="absolute top-4 left-6 animate-pulse text-yellow-300 text-2xl">
        ⭐
      </div>
      <div className="absolute top-10 right-10 animate-bounce text-yellow-300 text-3xl">
        🌟
      </div>

      <div className="max-w-3xl mx-auto p-6 md:p-10 bg-white bg-opacity-20 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/30">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 text-gray-900 drop-shadow-lg">
          🎊 هل ستنضمون إلينا؟
        </h2>

        {session ? (
          <div className="text-lg font-medium">
            <p className="mb-6 text-black">
              {attendance
                ? attendance === "yes"
                  ? "🎉 نراك هناك! شكراً لتأكيد حضورك."
                  : "😢 نتمنى رؤيتك في المناسبة القادمة!"
                : "👀 لم تحدد بعد، هل ستنضم إلينا؟"}
            </p>

            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6 mt-6">
              <motion.button
                onClick={() => handleResponse("yes")}
                disabled={loading}
                whileHover={{
                  scale: attendance === "yes" ? 1 : 1.1,
                  rotate: 1,
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: "0px 4px 15px rgba(0, 128, 0, 0.5)",
                }}
                className={`relative w-full md:w-auto py-4 px-8 rounded-full text-lg font-bold shadow-xl transition-all duration-300 overflow-hidden
      ${
        attendance === "yes"
          ? "bg-green-700 text-white cursor-not-allowed"
          : "bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white"
      }`}
              >
                {attendance === "yes" ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    🎉 تم التأكيد
                  </motion.span>
                ) : (
                  <span>✅ نعم، سأحضر</span>
                )}
              </motion.button>

              <motion.button
                onClick={() => handleResponse("no")}
                disabled={loading}
                whileHover={{
                  scale: attendance === "no" ? 1 : 1.1,
                  rotate: -1,
                }}
                whileTap={{
                  scale: 0.95,
                  boxShadow: "0px 4px 15px rgba(255, 0, 0, 0.5)",
                }}
                className={`relative w-full md:w-auto py-4 px-8 rounded-full text-lg font-bold shadow-xl transition-all duration-300 overflow-hidden
      ${
        attendance === "no"
          ? "bg-red-700 text-white cursor-not-allowed"
          : "bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white"
      }`}
              >
                {attendance === "no" ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    😞 تم الإلغاء
                  </motion.span>
                ) : (
                  <span>❌ لا، للأسف</span>
                )}
              </motion.button>
            </div>
          </div>
        ) : (
          <p className="text-lg text-white">
            ⛔ يجب{" "}
            <span
              onClick={signIn}
              className="text-blue-300 cursor-pointer underline"
            >
              تسجيل الدخول
            </span>{" "}
            لتأكيد حضورك!
          </p>
        )}

        {/* ✅ قسم الإحصائيات */}
        <div className="mt-10 p-6 bg-white bg-opacity-40 backdrop-blur-lg shadow-lg rounded-xl text-gray-900">
          <h3 className="text-2xl font-bold text-purple-800">
            📊 إحصائيات الحضور
          </h3>
          <div className="mt-4 flex flex-col md:flex-row justify-around text-lg font-semibold space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-green-700 text-3xl">✅</span>
              <span>{stats.attendingCount} أكدوا الحضور</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-700 text-3xl">❌</span>
              <span>{stats.notAttendingCount} اعتذروا</span>
            </div>
          </div>

          {/* 🔄 زر تحديث الإحصائيات */}
          <button
            onClick={fetchStats}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full text-lg font-bold shadow-md transition transform hover:scale-105"
          >
            🔄 تحديث الإحصائيات
          </button>
        </div>
      </div>
    </section>
  );
}
