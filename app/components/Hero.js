"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Balloons from "./Ballons";
import MusicPlayer from "./MusicPlayer";
import { useMemo } from "react";
export default function Hero() {
  // 🕒 تحديد تاريخ عيد الميلاد
  const birthdayDate = useMemo(() => new Date("2025-03-30T00:00:00"), []);
  const [timeLeft, setTimeLeft] = useState(null);

  // ✅ قائمة صور السلايدر
  const images = [
    "/hero0.jpg",
    "/hero1.jpg",
    "/hero2.jpg",
    "/hero3.jpg",
    "/hero4.jpg",
    "/hero5.jpg",
    "/hero6.jpg",
    "/hero7.jpeg",
    "/hero8.jpeg",
    "/hero9.jpeg",
    "/hero10.jpeg",
    "/hero11.jpeg",
    "/hero12.jpeg",
    "/hero13.jpeg",
  ];
  const [currentImage, setCurrentImage] = useState(0);

  function calculateTimeLeft() {
    const now = new Date();
    const difference = birthdayDate - now;
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  // ✅ تغيير الصورة كل 2 ثانية
  useEffect(() => {
    function calculateTimeLeft() {
      const now = new Date();
      const difference = birthdayDate - now;
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdayDate]);

  if (!timeLeft) return null;
  return (
    <section className="relative w-full h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden mt-10">
      <MusicPlayer />
      <Balloons />
      {/* ✅ Floating Balloons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.img
          src="/ballons.png"
          alt="Balloon"
          className="absolute left-10 bottom-10 w-14 md:w-20"
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <motion.img
          src="/ballons.png"
          alt="Balloon"
          className="absolute right-10 bottom-20 w-14 md:w-20"
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        />
      </div>

      {/* ✅ Container (Grid for Image & Content) */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full bg-white bg-opacity-70 rounded-3xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* ✅ Left Side: Image Slider (Now visible on all screens) */}
        <div className="w-full relative min-h-[350px] md:min-h-[450px] overflow-hidden">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt="Birthday"
            className="absolute w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-t-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* ✅ Right Side: Content */}
        <div className="flex flex-col justify-center p-6 md:p-12 text-gray-800">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4 text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            🎉 عيد ميلاد ليديا 🎂
          </motion.h1>
          <p className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-center">
            انضموا إلينا للاحتفال بعيد ميلاد ليديا يوم{" "}
            <strong className="text-pink-400">30 مارس</strong>! 🎈🥳 استعدوا
            للحفلة الأروع مع العائلة والأصدقاء.
          </p>

          {/* ✅ القصة القصيرة */}
          <motion.div
            className="bg-purple-50 p-4 md:p-6 rounded-xl shadow-md mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <h2 className="text-2xl text-center md:text-3xl font-semibold text-gray-900 mb-3 md:mb-4">
              🌸 قصة ليديا 🌸
            </h2>
            <p className="text-right md:text-lg text-gray-700 leading-relaxed">
              عام مضى على ولادتها، منذ أن غدا صباحنا وجهها، وليلنا سهر بها،
              وعمرنا سمر وفرح بها. منحت الحياة فرحا وصخبا ودفئا كيوم ولادتك،
              ربيعا، مشمسا، دافئا، رحمة وسكونا ك ساعة الغروب من ثالث أيام رمضان
              <br />
              <br />
              💚 وشكرا لكل من ساندنا
            </p>
          </motion.div>

          {/* ✅ العد التنازلي */}
          <div className="grid grid-cols-4 gap-4 text-center">
            {Object.entries(timeLeft).map(([unit, value], index) => (
              <motion.div
                key={index}
                className="bg-purple-700 text-white p-3 md:p-5 rounded-xl shadow-md transform transition hover:scale-105"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <span className="text-3xl md:text-4xl font-bold">{value}</span>
                <span className="block text-sm md:text-lg mt-1">
                  {unit === "days"
                    ? "يوم"
                    : unit === "hours"
                    ? "ساعة"
                    : unit === "minutes"
                    ? "دقيقة"
                    : "ثانية"}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
