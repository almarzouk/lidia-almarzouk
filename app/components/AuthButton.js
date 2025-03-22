"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 shadow-md py-4 px-6 flex justify-between items-center z-50">
      {/* شعار الموقع */}
      <h1 className="text-white text-2xl font-bold">
        🎁 عيد ميلاد ليديا الأول
      </h1>

      {/* زر تسجيل الدخول/الخروج */}
      {session ? (
        <div className="flex items-center gap-4">
          <p className="text-white text-lg hidden sm:block">
            مرحبًا، {session.user.name} 👋
          </p>
          <Image
            width={30}
            height={30}
            src={session.user.image}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-blue-400 shadow-lg relative"
          />
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl shadow-md transition duration-300"
          >
            تسجيل الخروج
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-xl shadow-md transition duration-300"
        >
          تسجيل الدخول باستخدام Google
        </button>
      )}
    </nav>
  );
}
