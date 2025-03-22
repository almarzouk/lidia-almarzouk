import { motion } from "framer-motion";

export default function Balloons() {
  const balloons = Array.from({ length: 10 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {balloons.map((_, i) => (
        <motion.img
          key={i}
          src="/ballons.png"
          alt="Balloon"
          className="absolute w-14 md:w-20"
          initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
          animate={{ y: "-10vh", x: Math.random() * window.innerWidth }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
