"use client";
import Image from "next/image";
import { flexbox } from "framer-motion";
import { Pencil, Trash2, PlusCircle } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useRef, useState } from "react";

export default function EditableImage({ contentKey, alt, fill, width, height, className = "" }: any) {
   const { isAdmin, content, updateContent, isLoading } = useAdmin();
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [isUploading, setIsUploading] = useState(false);
   
   const resolveValue = () => {
      try { return contentKey.split('.').reduce((o: any, i: string) => o[i], content) || ""; } catch(e) { return ""; }
   }
   
   if (isLoading) return null;
   const src = resolveValue();

   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
         const res = await fetch("/api/upload", { method: "POST", body: formData });
         const data = await res.json();
         if (data.path) {
             updateContent(contentKey, data.path);
         }
      } catch (err) {
         console.error(err);
         alert("Upload failed.");
      } finally {
         setIsUploading(false);
      }
   }

   const handleDelete = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (confirm("Dieses Bild wirklich entfernen? (Kann danach neu hochgeladen werden)")) {
         updateContent(contentKey, "");
      }
   }

   if (!isAdmin) {
      if (!src) return null;
      return <Image src={src} alt={alt} fill={fill} width={width} height={height} className={className} unoptimized />;
   }

   return (
      <div className={`relative group ${className} ${fill ? 'w-full h-full' : ''}`}>
         {src ? (
            <Image src={src} alt={alt} fill={fill} width={width} height={height} className={fill ? className : ""} unoptimized />
         ) : (
            <div className={`w-full h-full flex flex-col items-center justify-center bg-gray-100/50 border-2 border-dashed border-gray-300 rounded-xl ${fill ? 'absolute inset-0' : 'min-h-[200px]'}`}>
               <span className="text-gray-400 font-medium opacity-50 mb-2">Kein Bild</span>
            </div>
         )}
         
         <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
         
         {/* Edit Controls */}
         <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
            <button 
               onClick={(e) => { e.preventDefault(); e.stopPropagation(); fileInputRef.current?.click(); }}
               disabled={isUploading}
               className="p-3 bg-brand-accent hover:bg-brand-accent/90 text-white rounded-full shadow-2xl transform hover:scale-110 active:scale-95 transition-all"
               title="Bild ändern/hochladen"
            >
               {isUploading ? <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block" /> : (src ? <Pencil size={20} /> : <PlusCircle size={20} />)}
            </button>
            
            {src && ( // Only show delete if there's an image
               <button 
                  onClick={handleDelete}
                  className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-2xl transform hover:scale-110 active:scale-95 transition-all"
                  title="Bild löschen"
               >
                  <Trash2 size={20} />
               </button>
            )}
         </div>
      </div>
   );
}
