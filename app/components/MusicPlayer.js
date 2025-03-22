"use client";
import { useState, useEffect } from "react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("birthday-music");

    // ✅ محاولة تشغيل الموسيقى عند تحميل الصفحة
    const playMusic = () => {
      audio.play().catch((error) => {
        console.warn(
          "المتصفح منع التشغيل التلقائي، انتظر تفاعل المستخدم.",
          error
        );
      });
    };

    // ✅ تشغيل الموسيقى تلقائيًا عند تحميل الموقع بعد ثانية
    const timeout = setTimeout(playMusic, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const toggleMusic = () => {
    const audio = document.getElementById("birthday-music");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio id="birthday-music" loop>
        <source src="/lidia.mp3" type="audio/mp3" />
      </audio>
      <button
        onClick={toggleMusic}
        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg"
      >
        {isPlaying ? "🔇 إيقاف الموسيقى" : "🎶 تشغيل الموسيقى"}
      </button>
    </div>
  );
}
