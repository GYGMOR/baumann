import { Sparkles, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white/80 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-brand-accent p-2 rounded-lg text-white">
                <Sparkles size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Baumann <span className="font-light">Reinigungssysteme</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-white/60">
              Professionelle Gebäudereinigung für Unternehmen, Verwaltungen und Privatkunden, 
              die Wert auf höchste Sauberkeit und einen perfekten Eindruck legen.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#leistungen" className="hover:text-brand-accent transition-colors">Leistungen</Link></li>
              <li><Link href="#ueber-uns" className="hover:text-brand-accent transition-colors">Über Uns</Link></li>
              <li><Link href="#vorteile" className="hover:text-brand-accent transition-colors">Vorteile</Link></li>
              <li><Link href="#kontakt" className="hover:text-brand-accent transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-semibold mb-6">Kontakt</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-brand-accent shrink-0 mt-0.5" />
                <a href="tel:+41797670421" className="hover:text-white transition-colors">079 767 04 21</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-brand-accent shrink-0 mt-0.5" />
                <a href="mailto:info@baumannreinigungssysteme.ch" className="hover:text-white transition-colors">info@baumannreinigungssysteme.ch</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-accent shrink-0 mt-0.5" />
                <address className="not-italic hover:text-white transition-colors">
                  Pilatusweg 9<br />
                  5614 Sarmenstorf<br />
                  Schweiz
                </address>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-6">Rechtliches</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/impressum" className="hover:text-brand-accent transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="hover:text-brand-accent transition-colors">Datenschutz</Link></li>
              <li><Link href="/agb" className="hover:text-brand-accent transition-colors">AGB</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Baumann Reinigungssysteme GmbH. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-white/50 relative top-[1px]">Created by</span>
            <a href="https://gross-ict.ch" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity" title="Gross ICT">
              <Image src="/images/logo-gross-ict.png" alt="Gross ICT" width={140} height={40} className="object-contain brightness-0 invert" unoptimized />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
