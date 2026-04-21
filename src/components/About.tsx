"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Settings, X, Plus, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";
import EditableText from "./EditableText";
import { useAdmin } from "@/context/AdminContext";

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isAdmin, content, updateContent, isLoading } = useAdmin();
  
  // Gallery Modal State
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const rawImages = content?.about?.images || ["/about_team.png", "/gallery_1.png", "/gallery_2.png", "/gallery_3.png"];
  const images = rawImages.map((src: string) => (src.startsWith('/') && !src.startsWith('/baumann')) ? `/baumann${src}` : src);

  useEffect(() => {
    // Only auto-rotate if modal is closed
    if (isGalleryModalOpen) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, images.length, isGalleryModalOpen]);

  const handleNext = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getPositionVariant = (index: number) => {
    if (images.length === 1) return "center";
    const offset = (index - currentIndex + images.length) % images.length;
    if (offset === 0) return "center";
    if (offset === 1 && images.length > 2) return "right";
    if (offset === images.length - 1 && images.length > 1) return "left";
    return "hidden";
  };

  const carouselVariants = {
    center: { x: "0%", scale: 1, zIndex: 30, opacity: 1, filter: "blur(0px)" },
    left: { x: "-40%", scale: 0.85, zIndex: 20, opacity: 0.5, filter: "blur(4px)" },
    right: { x: "40%", scale: 0.85, zIndex: 20, opacity: 0.5, filter: "blur(4px)" },
    hidden: { x: "0%", scale: 0.6, zIndex: 10, opacity: 0, filter: "blur(8px)" },
  };

  // Gallery Management Logic
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
       const res = await fetch("/api/upload", { method: "POST", body: formData });
       const data = await res.json();
       if (data.path) {
           const newImages = [...images, data.path];
           updateContent("about.images", newImages);
       }
    } catch (err) {
       console.error(err);
       alert("Upload fehlgeschlagen.");
    } finally {
       setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    if(confirm("Bild wirklich aus der Galerie entfernen?")) {
        const newImages = images.filter((_: any, i: number) => i !== indexToRemove);
        updateContent("about.images", newImages);
        if (currentIndex >= newImages.length) {
            setCurrentIndex(Math.max(0, newImages.length - 1));
        }
    }
  };

  return (
    <>
      <section id="ueber-uns" className="py-24 bg-brand-secondary overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            {/* Carousel Side */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative min-h-[450px] md:min-h-[550px] flex items-center justify-center p-4"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-accent/20 rounded-full blur-[80px] -z-10" />
              <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-brand-primary/10 rounded-full blur-[60px] -z-10" />

              {/* Admin Gallery Editor Action */}
              {isAdmin && (
                <div className="absolute top-0 right-0 z-50">
                   <button 
                      onClick={() => setIsGalleryModalOpen(true)}
                      className="flex items-center gap-2 bg-brand-accent text-white px-4 py-2 rounded-full shadow-xl hover:bg-brand-accent/90 transform hover:scale-105 transition-all outline-none border-2 border-white"
                   >
                     <Settings size={18} />
                     <span className="font-semibold text-sm">Galerie bearbeiten</span>
                   </button>
                </div>
              )}

              <div className="relative w-full max-w-[320px] md:max-w-[380px] aspect-[4/5] perspective-1000">
                <AnimatePresence initial={false}>
                  {!isLoading && images.length > 0 ? images.map((src: string, index: number) => (
                    <motion.div
                      key={src + index}
                      variants={carouselVariants}
                      animate={getPositionVariant(index)}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      onClick={() => {
                          const pos = getPositionVariant(index);
                          if (pos === "left") handlePrev();
                          if (pos === "right") handleNext();
                      }}
                      className={`absolute inset-0 rounded-3xl overflow-hidden shadow-2xl origin-center ${getPositionVariant(index) !== "center" ? "cursor-pointer" : ""}`}
                    >
                      <Image src={src} alt={`Gallery ${index}`} fill className="object-cover" unoptimized />
                      {getPositionVariant(index) !== "center" && (
                          <div className="absolute inset-0 bg-white/20 pointer-events-none" />
                      )}
                    </motion.div>
                  )) : (
                    <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-gray-100/50">
                       <span className="text-gray-400 font-medium">Keine Bilder vorhanden</span>
                    </div>
                  )}
                </AnimatePresence>

                {images.length > 0 && (
                  <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-6 z-40">
                    <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-white text-brand-primary shadow-md flex items-center justify-center active:scale-95"><ChevronLeft size={20} /></button>
                    <div className="flex gap-2">
                        {images.map((_: any, i: number) => (
                            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-brand-accent" : "w-2 bg-gray-300"}`} />
                        ))}
                    </div>
                    <button onClick={handleNext} className="w-10 h-10 rounded-full bg-white text-brand-primary shadow-md flex items-center justify-center active:scale-95"><ChevronRight size={20} /></button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-brand-primary mb-6 leading-tight">
                <EditableText contentKey="about.headline" />
              </h2>
              
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-10">
                <div className="block"><EditableText contentKey="about.text1" multiline /></div>
                <div className="block"><EditableText contentKey="about.text2" multiline /></div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {!isLoading && content?.about?.stats?.map((stat: any, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center transform hover:-translate-y-1 transition-transform">
                    <span className="text-3xl font-black text-brand-primary mb-1"><EditableText contentKey={`about.stats.${index}.value`} /></span>
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider"><EditableText contentKey={`about.stats.${index}.label`} /></span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Admin Modal */}
      {isAdmin && isGalleryModalOpen && (
        <div className="fixed inset-0 z-[100] bg-brand-primary/80 backdrop-blur-sm flex items-center justify-center p-4">
           <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
              
              <div className="sticky top-0 bg-white/95 backdrop-blur z-10 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                 <div>
                    <h3 className="text-2xl font-bold text-gray-800">Galerie verwalten</h3>
                    <p className="text-gray-500 text-sm">Lade neue Bilder für das 3D-Karussell hoch oder lösche bestehende.</p>
                 </div>
                 <button 
                    onClick={() => setIsGalleryModalOpen(false)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                 >
                    <X size={24} className="text-gray-600" />
                 </button>
              </div>

              <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                 {/* Existing Images */}
                 {images.map((src: string, index: number) => (
                   <div key={src + index} className="group relative aspect-square rounded-2xl overflow-hidden border border-gray-200">
                      <Image src={src} alt={`Slide ${index}`} fill className="object-cover" unoptimized />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button 
                           onClick={() => removeImage(index)}
                           className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transform hover:scale-110 transition-all shadow-lg"
                           title="Bild löschen"
                         >
                            <Trash2 size={20} />
                         </button>
                      </div>
                   </div>
                 ))}

                 {/* Upload Button */}
                 <div className="relative aspect-square rounded-2xl border-2 border-dashed border-gray-300 hover:border-brand-accent hover:bg-brand-accent/5 transition-colors group flex flex-col items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                    {isUploading ? (
                       <Loader2 size={32} className="text-brand-accent animate-spin" />
                    ) : (
                       <>
                         <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-white text-gray-400 group-hover:text-brand-accent flex items-center justify-center mb-2 shadow-sm transition-colors">
                            <Plus size={24} />
                         </div>
                         <span className="text-sm font-medium text-gray-500 group-hover:text-brand-accent">Neues Bild</span>
                       </>
                    )}
                 </div>
              </div>

           </div>
        </div>
      )}
    </>
  );
}
