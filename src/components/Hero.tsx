"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";
import { useAdmin } from "@/context/AdminContext";

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const { content } = useAdmin();

  return (
    <section 
      ref={ref}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
      >
        <EditableImage contentKey="hero.bgImage" fill alt="Hero Background" className="object-cover" />
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/80 to-transparent pointer-events-none" />
      </motion.div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex items-center">
        <div className="max-w-3xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <EditableText contentKey="hero.headline" />
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl leading-relaxed"
          >
            <EditableText contentKey="hero.subheadline" multiline />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link 
              href="#kontakt" 
              className="px-8 py-4 rounded-full bg-brand-accent text-white font-semibold flex items-center justify-center gap-2 hover:bg-white hover:text-brand-primary transition-all duration-300 shadow-lg group transform hover:scale-105 active:scale-95"
            >
              <EditableText contentKey="hero.ctaPrimary" />
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#leistungen" 
              className="px-8 py-4 rounded-full bg-white/10 glass text-white font-semibold flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <EditableText contentKey="hero.ctaSecondary" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap items-center gap-6 text-sm font-medium text-white/80"
          >
            {content?.benefits?.items?.map((badge: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-accent" />
                <EditableText contentKey={`benefits.items.${idx}.title`} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
