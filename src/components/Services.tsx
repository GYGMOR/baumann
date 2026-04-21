"use client";

import { motion, Variants } from "framer-motion";
import { Building2, Home, AppWindow, Sparkles } from "lucide-react";
import EditableText from "./EditableText";
import { useAdmin } from "@/context/AdminContext";

const ICONS = [Building2, Home, AppWindow, Sparkles]; // Hardcoded mapping for icons

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

export default function Services() {
  const { content, isLoading } = useAdmin();

  return (
    <section id="leistungen" className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-primary mb-4">
              <EditableText contentKey="services.headline" />
            </h2>
            <div className="text-lg text-gray-600">
              <EditableText contentKey="services.subheadline" multiline />
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {!isLoading && content?.services?.items?.map((service: any, index: number) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="group relative bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent to-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                
                <div className="w-14 h-14 rounded-2xl bg-brand-secondary flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-accent transition-colors duration-300 mb-6">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-brand-primary mb-3 block">
                  <EditableText contentKey={`services.items.${index}.title`} />
                </h3>
                
                <div className="text-gray-600 leading-relaxed">
                  <EditableText contentKey={`services.items.${index}.description`} multiline />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
}
