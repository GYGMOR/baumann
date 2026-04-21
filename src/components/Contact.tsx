"use client";

import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import EditableText from "./EditableText";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", firma: "", email: "", telefon: "", art: "", nachricht: "", datenschutz: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Vielen Dank für Ihre Anfrage. Wir werden uns in Kürze bei Ihnen melden.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <section id="kontakt" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-primary mb-4 leading-tight">
              <EditableText contentKey="contact.headline" />
            </h2>
            <div className="text-lg text-gray-600 block">
              <EditableText contentKey="contact.subheadline" multiline />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full lg:w-1/3">
            <div className="bg-brand-primary text-white p-10 rounded-3xl h-full shadow-2xl relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-[80px] -z-0" />
              <div className="relative z-10 space-y-10">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Kontaktinformationen</h3>
                  <p className="text-white/70">Wir sind jederzeit für Sie erreichbar.</p>
                </div>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Phone size={20} className="text-brand-accent" />
                    </div>
                    <div>
                      <span className="block text-white/60 text-sm mb-1">Telefon</span>
                      <div className="text-lg font-medium hover:text-brand-accent transition-colors"><EditableText contentKey="contact.phone" /></div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Mail size={20} className="text-brand-accent" />
                    </div>
                    <div>
                      <span className="block text-white/60 text-sm mb-1">E-Mail</span>
                      <div className="text-lg font-medium hover:text-brand-accent transition-colors break-all"><EditableText contentKey="contact.email" /></div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-brand-accent" />
                    </div>
                    <div>
                      <span className="block text-white/60 text-sm mb-1">Adresse</span>
                      <address className="not-italic text-lg font-medium text-white/90">
                        <EditableText contentKey="contact.address1" /><br/>
                        <EditableText contentKey="contact.address2" />
                      </address>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full lg:w-2/3">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                 {/* Standard Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">Name *</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all outline-none" placeholder="Max Muster" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="firma" className="text-sm font-semibold text-gray-700">Firma</label>
                    <input type="text" id="firma" name="firma" value={formData.firma} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all outline-none" placeholder="Musterfirma GmbH" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">E-Mail-Adresse *</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all outline-none" placeholder="max@beispiel.ch" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="telefon" className="text-sm font-semibold text-gray-700">Telefonnummer</label>
                    <input type="tel" id="telefon" name="telefon" value={formData.telefon} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all outline-none" placeholder="079 123 45 67" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="art" className="text-sm font-semibold text-gray-700">Art der Reinigung *</label>
                  <select id="art" name="art" required value={formData.art} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all outline-none appearance-none cursor-pointer">
                    <option value="" disabled>Bitte wählen Sie aus...</option>
                    <option value="buero">Büro- & Gewerbereinigung</option>
                    <option value="liegenschaft">Liegenschafts- & Treppenhausreinigung</option>
                    <option value="glas">Glas- & Fensterreinigung</option>
                    <option value="sonder">Sonder- & Grundreinigung</option>
                    <option value="andere">Andere Dienstleistung</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="nachricht" className="text-sm font-semibold text-gray-700">Nachricht *</label>
                  <textarea id="nachricht" name="nachricht" rows={4} required value={formData.nachricht} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all outline-none resize-none" placeholder="Wie können wir Ihnen helfen?"></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" id="datenschutz" name="datenschutz" required checked={formData.datenschutz} onChange={handleChange} className="mt-1 w-5 h-5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent cursor-pointer" />
                  <label htmlFor="datenschutz" className="text-sm text-gray-600">
                    Ich stimme zu, dass meine Angaben aus dem Kontaktformular zur Beantwortung 
                    meiner Anfrage erhoben und verarbeitet werden. *
                  </label>
                </div>

                <button type="submit" className="w-full py-4 bg-brand-primary hover:bg-brand-primary/95 text-white font-bold rounded-xl shadow-lg shrink-0 transition-transform transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group">
                  <Send size={20} className="group-hover:animate-pulse" />
                  Nachricht senden
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
