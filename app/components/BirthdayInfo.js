import MusicPlayer from "./MusicPlayer";

export default function BirthdayInfo() {
  return (
    <section className="w-full py-16 md:py-24 text-center bg-gradient-to-br from-pink-100 via-purple-200 to-blue-100 backdrop-blur-xl shadow-xl rounded-lg px-6 md:px-12 relative">
      {/* 🎈 بالونات متحركة */}
      <div className="absolute top-4 left-4 animate-bounce">🎈</div>
      <div className="absolute top-8 right-10 animate-bounce">🎈</div>

      <div className="max-w-3xl mx-auto p-6 md:p-10">
        {/* 🕓 العنوان */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 text-gray-900 drop-shadow-lg">
          🎉 متى وأين؟ 🎈
        </h2>

        {/* 📅 تاريخ الحفل */}
        <p className="text-lg md:text-2xl text-gray-700 mb-6 font-medium leading-relaxed">
          <strong className="text-pink-700 text-2xl md:text-3xl">
            20 April 2025
          </strong>{" "}
          سنحتفل بعيد ميلاد ! 🎂🎁
        </p>

        {/* 📍 زر عرض الموقع على الخريطة */}
        <a
          href="https://maps.app.goo.gl/6F1LSEGHH9VGvGo48"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-8 rounded-full text-lg font-bold shadow-lg transition duration-300 transform hover:scale-110"
        >
          📍 عرض الموقع على الخريطة
        </a>

        {/* 🎶 موسيقى الحفل */}
        <div className="mt-8">
          <p className="text-xl text-gray-700 font-semibold mb-3">
            🎵 استمعوا إلى الأغنية المفضلة لليديا أثناء التحضير للحفل!
          </p>
        </div>
      </div>
    </section>
  );
}
