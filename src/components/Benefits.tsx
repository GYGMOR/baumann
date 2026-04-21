"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, Clock, Users, ThumbsUp } from "lucide-react";
import EditableText from "./EditableText";
import { useAdmin } from "@/context/AdminContext";

const ICONS = [ShieldCheck, Clock, Users, ThumbsUp]; // Fallback icons

export default function Benefits() {
  const { content, isLoading } = useAdmin();

  return (
    <section id="vorteile" className="py-24 bg-brand-primary text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 rounded-l-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="w-full lg:w-5/12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
                <EditableText contentKey="benefits.headline" />
              </h2>
              <div className="flex flex-col gap-6">
                {!isLoading && content?.benefits?.items?.map((benefit: any, idx: number) => {
                  const Icon = ICONS[idx % ICONS.length];
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex items-center gap-5 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                        <Icon size={24} />
                      </div>
                      <span className="text-xl font-medium"><EditableText contentKey={`benefits.items.${idx}.title`} /></span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {!isLoading && content?.benefits?.testimonials?.map((testimonial: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                  className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl relative"
                >
                  <div className="flex items-center gap-1 mb-6 text-brand-accent">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <div className="text-white/90 text-lg leading-relaxed mb-8 italic">
                    "<EditableText contentKey={`benefits.testimonials.${idx}.text`} multiline />"
                  </div>
                  <div>
                    <h4 className="font-bold text-white"><EditableText contentKey={`benefits.testimonials.${idx}.author`} /></h4>
                    <div className="text-white/60 text-sm"><EditableText contentKey={`benefits.testimonials.${idx}.role`} /></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
