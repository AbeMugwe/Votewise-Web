"use client";
import { useRef, useState, useEffect } from "react";

export default function Confetti({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    setOpacity(1);
    setVisible(true);
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ["#16a34a", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6", "#a855f7"];
    const pieces = Array.from({ length: 130 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * -300,
      w: Math.random() * 9 + 4, h: Math.random() * 5 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 2.5, vy: Math.random() * 3 + 2,
      angle: Math.random() * 360, va: (Math.random() - 0.5) * 5,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
        p.x += p.vx; p.y += p.vy; p.angle += p.va;
        if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const stop = setTimeout(() => {
      cancelAnimationFrame(raf);
      setOpacity(0);
      setTimeout(() => setVisible(false), 800);
    }, 4000);
    return () => { cancelAnimationFrame(raf); clearTimeout(stop); };
  }, [active]);

  if (!visible) return null;
  return (
    <canvas ref={ref} style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999,
      opacity, transition: "opacity 0.8s ease",
    }} />
  );
}