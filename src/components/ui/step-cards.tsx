"use client";
import { Sparkles, Heart, RefreshCw } from "lucide-react";

export default function StepsCards() {
  const steps = [
    {
      title: "Describe your vibe",
      desc: "Type a prompt (and optionally upload a reference). We’ll turn it into a visual moodboard.",
      Icon: Sparkles,
    },
    {
      title: "Save your favorites",
      desc: "Tap the heart on images you like. Liked visuals stay pinned across generations.",
      Icon: Heart,
    },
    {
      title: "Regenerate & refine",
      desc: "Click Generate again with a new or tweaked prompt. We replace only unliked images.",
      Icon: RefreshCw,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto mt-10 mb-20">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {steps.map(({ title, desc, Icon }) => (
          <div
            key={title}
            className="group relative rounded-2xl border border-[#1B1D1F] bg-[#131517] p-5"
          >

            <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-white/5" />
            <div className="flex items-center gap-3 mb-3">
              <div className="grid place-items-center w-10 h-10 rounded-xl bg-[#D1FE17] text-black">
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
