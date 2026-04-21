"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Leistungen", href: "#leistungen" },
  { name: "Über Uns", href: "#ueber-uns" },
  { name: "Vorteile", href: "#vorteile" },
  { name: "Kontakt", href: "#kontakt" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-brand-primary p-2 rounded-lg text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
            <Sparkles size={24} />
          </div>
          <span className={cn(
            "text-xl font-bold tracking-tight transition-colors duration-300",
            isScrolled ? "text-brand-primary" : "text-white md:text-brand-primary"
          )}>
            Baumann <span className="font-light hidden sm:inline">Reinigungssysteme</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium hover:text-brand-accent transition-colors duration-200",
                    isScrolled ? "text-gray-600" : "text-white/90 md:text-gray-600"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#kontakt"
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg",
              isScrolled 
                ? "bg-brand-primary text-white hover:bg-brand-primary/90 hover:shadow-brand-primary/20" 
                : "bg-brand-accent text-white hover:bg-brand-accent/90 md:bg-brand-primary md:hover:bg-brand-primary/90"
            )}
          >
            Jetzt Angebot anfordern
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={cn(
            "md:hidden p-2 rounded-md",
            isScrolled ? "text-brand-primary" : "text-white"
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100 md:hidden flex flex-col"
          >
            <ul className="flex flex-col py-4 px-6 gap-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-800 text-lg font-medium hover:text-brand-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4 mt-2 border-t border-gray-100">
                <Link
                  href="#kontakt"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold shadow-md active:scale-95 transition-transform"
                >
                  Jetzt Angebot anfordern
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
