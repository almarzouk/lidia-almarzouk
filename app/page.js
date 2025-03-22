import Hero from "./components/Hero";
import BirthdayInfo from "./components/BirthdayInfo";
import Attendance from "./components/Attendance";
import GiftList from "./components/GiftList";
import AuthButton from "./components/AuthButton";
import Wishes from "./components/Wishes";
import ConfettiEffect from "./components/ConfiettiEffect";

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
      <AuthButton />
      <Hero />
      <ConfettiEffect />
      <BirthdayInfo />
      <Attendance />
      <GiftList />
      <Wishes />
    </main>
  );
}
