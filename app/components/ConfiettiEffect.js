"use client";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiEffect() {
  const [isRunning, setIsRunning] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // نضمن أننا في المتصفح
    setIsClient(true);
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const resizeHandler = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resizeHandler);

    // توقيف الكونفيتي بعد 5 ثواني
    const timeout = setTimeout(() => setIsRunning(false), 5000);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      clearTimeout(timeout);
    };
  }, []);

  if (!isClient) return null;

  return isRunning ? (
    <Confetti width={dimensions.width} height={dimensions.height} />
  ) : null;
}
