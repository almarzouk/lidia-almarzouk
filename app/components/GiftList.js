"use client";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Modal from "./Modal";
import { FaGift, FaShoppingCart, FaTrash, FaTimesCircle } from "react-icons/fa";
import Image from "next/image";

export default function GiftList() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.email === "jumaa.almarzouk@gmail.com";
  const [gifts, setGifts] = useState([]);
  const [newGift, setNewGift] = useState({
    name: "",
    price: "",
    image: "",
    link: "",
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);

  // ✅ تحميل الهدايا من قاعدة البيانات
  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      const res = await fetch("/api/gifts");
      const data = await res.json();
      setGifts(data);
    } catch (error) {
      console.error("Error fetching gifts:", error);
    }
  };

  // ✅ إضافة هدية جديدة
  const addGift = async (e) => {
    e.preventDefault();
    if (!newGift.name || !newGift.price || !newGift.image || !newGift.link) {
      alert("يرجى ملء جميع الحقول!");
      return;
    }
    try {
      const res = await fetch("/api/gifts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGift),
      });

      if (!res.ok) {
        throw new Error("❌ فشل في إضافة الهدية");
      }

      const addedGift = await res.json();
      setGifts((prev) => [...prev, addedGift]); // ✅ تحديث القائمة مباشرة
      setNewGift({ name: "", price: "", image: "", link: "" }); // ✅ إعادة تعيين الحقول
    } catch (error) {
      console.error("❌ خطأ أثناء إضافة الهدية:", error);
    }
  };

  // ✅ تأكيد الحجز
  const confirmReservation = (giftId) => {
    if (!session) {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedGift(giftId);
    setIsConfirmModalOpen(true);
  };

  const reserveGift = async (giftId) => {
    if (!session) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      const res = await fetch(`/api/gifts/${giftId}/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservedBy: session.user.name }),
      });

      if (res.ok) {
        fetchGifts(); // ✅ تحديث القائمة بعد الحجز
        setIsConfirmModalOpen(false); // ✅ إغلاق المودال بعد نجاح الحجز
        setSelectedGift(null); // ✅ إعادة تعيين الاختيار
      } else {
        const errorData = await res.json();
        console.error("❌ خطأ أثناء الحجز:", errorData.error);
      }
    } catch (error) {
      console.error("❌ خطأ أثناء الحجز:", error);
    }
  };
  // ✅ تأكيد إلغاء الحجز
  const confirmCancelReservation = (giftId) => {
    setSelectedGift(giftId);
    setIsCancelModalOpen(true);
  };
  const deleteGift = async (giftId) => {
    if (!isAdmin) return;

    const confirmDelete = confirm("هل أنت متأكد أنك تريد حذف هذه الهدية؟");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/gifts/${giftId}/delete`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchGifts(); // ✅ تحديث القائمة بعد الحذف
      } else {
        console.error("❌ فشل حذف الهدية");
      }
    } catch (error) {
      console.error("❌ خطأ أثناء حذف الهدية:", error);
    }
  };
  // ✅ تنفيذ إلغاء الحجز عبر API
  const cancelReservation = async () => {
    if (!selectedGift) return;

    try {
      const res = await fetch(`/api/gifts/${selectedGift}/cancel`, {
        method: "POST",
      });

      if (res.ok) {
        fetchGifts(); // ✅ تحديث القائمة بعد إلغاء الحجز مباشرةً
      } else {
        const errorData = await res.json();
        console.error("❌ خطأ أثناء إلغاء الحجز:", errorData.error);
      }
    } catch (error) {
      console.error("❌ خطأ أثناء إلغاء الحجز:", error);
    }

    setIsCancelModalOpen(false);
    setSelectedGift(null);
  };
  // ✅ حساب عدد الهدايا المحجوزة
  const totalGifts = gifts.length;
  const reservedGifts = gifts.filter((gift) => gift.reserved).length;
  const remainingGifts = totalGifts - reservedGifts;
  const progressPercentage =
    totalGifts > 0 ? (reservedGifts / totalGifts) * 100 : 0;

  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-center">
      <div className="max-w-6xl mx-auto p-10 bg-gray-800 bg-opacity-80 backdrop-blur-sm text-white shadow-2xl rounded-3xl border border-gray-700">
        {/* ✅ عنوان الصفحة */}
        <div className="mb-12">
          <h1 className="text-6xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 text-transparent bg-clip-text">
            قائمة الهدايا
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            اختر هديتك المفضلة واحجزها قبل أن يسبقك أحد إليها!
          </p>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            تتسطيع حجز هديتين كحد أقصى
          </p>
        </div>

        {/* ✅ Progress Bar Section */}
        <div className="mb-12 text-center bg-gray-700 bg-opacity-50 p-6 rounded-2xl shadow-inner">
          <h3 className="text-2xl font-bold mb-4 text-white">تقدم الحجوزات</h3>
          <p className="text-lg font-semibold text-gray-300 mb-4 flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-gray-700 rounded-full">
              🎯 الهدف: {totalGifts} هدية
            </span>
            <span className="px-4 py-2 bg-green-700 bg-opacity-60 rounded-full">
              🎉 المحجوزة: {reservedGifts}
            </span>
            <span className="px-4 py-2 bg-blue-700 bg-opacity-60 rounded-full">
              ⏳ المتبقية: {remainingGifts}
            </span>
          </p>
          <div className="w-full bg-gray-700 h-6 rounded-full overflow-hidden shadow-md">
            <div
              className={`h-full transition-all duration-500 ${
                progressPercentage >= 100
                  ? "bg-yellow-400"
                  : "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"
              }`}
              style={{ width: `${progressPercentage}%` }}
            >
              {progressPercentage > 10 && (
                <span className="flex h-full items-center justify-center text-xs font-bold">
                  {Math.round(progressPercentage)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ✅ نموذج إضافة هدية */}
        {isAdmin && (
          <div className="mb-16 bg-gray-700 bg-opacity-50 p-8 rounded-2xl shadow-lg border border-gray-600">
            <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text flex items-center justify-center gap-2">
              <FaGift className="text-green-400" /> إضافة هدية جديدة
            </h2>

            <form className="mb-6 space-y-4" onSubmit={addGift}>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="اسم الهدية"
                  value={newGift.name}
                  onChange={(e) =>
                    setNewGift({ ...newGift, name: e.target.value })
                  }
                  className="w-full p-4 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
                <input
                  type="number"
                  placeholder="السعر (€)"
                  value={newGift.price}
                  onChange={(e) =>
                    setNewGift({ ...newGift, price: e.target.value })
                  }
                  className="w-full p-4 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>
              <input
                type="text"
                placeholder="رابط الصورة"
                value={newGift.image}
                onChange={(e) =>
                  setNewGift({ ...newGift, image: e.target.value })
                }
                className="w-full p-4 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <input
                type="text"
                placeholder="رابط المنتج"
                value={newGift.link}
                onChange={(e) =>
                  setNewGift({ ...newGift, link: e.target.value })
                }
                className="w-full p-4 rounded-lg border-2 border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white py-4 px-6 rounded-xl font-bold shadow-lg transition duration-300 flex items-center justify-center gap-2"
              >
                <FaGift /> إضافة الهدية
              </button>
            </form>
          </div>
        )}

        {/* ✅ عرض قائمة الهدايا */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.map((gift) => (
            <div
              key={gift._id}
              className="group relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-b from-gray-700 to-gray-800 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 z-10"></div>
              <div className="relative h-64 overflow-hidden">
                <Image
                  fill
                  src={gift.image}
                  alt={gift.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div
                className="relative z-20 p-6 -mt-10 bg-gradient-to-t from-gray-800 via-gray-800 to-transparent"
                style={{ minHeight: "100%" }}
              >
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {gift.name}
                </h3>
                <p className="text-gray-300 text-lg font-medium mb-4 flex items-center justify-center">
                  <span className="bg-gray-700 px-4 py-1 rounded-full flex items-center">
                    <span className="text-yellow-400 mr-1">💰</span>{" "}
                    {gift.price}€
                  </span>
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href={gift.link}
                    target="_blank"
                    className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-bold shadow-md transition duration-300 flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart /> اشتري الهدية من هنا
                  </a>
                  {gift.reserved ? (
                    <div className="mt-2">
                      <span className="block text-red-400 font-bold text-xl mb-2 bg-gray-700 bg-opacity-50 py-2 px-4 rounded-lg">
                        🎉 تم الحجز بواسطة {gift.reservedBy}
                      </span>
                      {session && session.user.name === gift.reservedBy && (
                        <button
                          onClick={() => confirmCancelReservation(gift._id)}
                          className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white py-2 px-6 rounded-xl font-bold shadow-md transition duration-300 flex items-center justify-center gap-2"
                        >
                          <FaTimesCircle /> إلغاء الحجز
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => confirmReservation(gift._id)}
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-bold shadow-md transition duration-300 flex items-center justify-center gap-2"
                    >
                      <FaShoppingCart /> احجز الهدية
                    </button>
                  )}
                </div>

                {isAdmin && (
                  <button
                    onClick={() => deleteGift(gift._id)}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full shadow-lg transition duration-300"
                    title="حذف الهدية"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* إذا لم تكن هناك هدايا */}
        {gifts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-400">لا توجد هدايا متاحة حالياً</p>
          </div>
        )}
      </div>

      {/* المودالات */}
      <Modal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        message="يجب تسجيل الدخول لحجز هدية!"
        actionText="تسجيل الدخول"
        onAction={() => {
          signIn();
          setIsAuthModalOpen(false);
        }}
      />

      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        message="هل تريد فعلاً حجز هذه الهدية؟"
        actionText="نعم، أريد الحجز"
        onAction={() => reserveGift(selectedGift)}
      />

      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        message="هل أنت متأكد من إلغاء حجز الهدية؟"
        actionText="نعم، إلغاء الحجز"
        onAction={() => cancelReservation(selectedGift)}
      />
    </section>
  );
}
