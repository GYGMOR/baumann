"use client";

import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export default function EditableText({ contentKey, as: Component = "span", className = "", multiline = false }: any) {
  const { isAdmin, content, updateContent, isLoading } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  
  const resolveValue = () => {
    try {
        return contentKey.split('.').reduce((o: any, i: string) => o[i], content) || "";
    } catch(e) { return ""; }
  }
  
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!isLoading && !isEditing) {
      setValue(resolveValue());
    }
  }, [content, contentKey, isLoading, isEditing]);

  if (isLoading) return null;

  if (!isAdmin) {
    if (multiline) {
      return (
        <Component className={className}>
          {value.split('\n').map((line: string, i: number) => (
             <span key={i}>{line}<br/></span>
          ))}
        </Component>
      );
    }
    return <Component className={className}>{value}</Component>;
  }

  const handleSave = (e?: React.MouseEvent) => {
    if(e) { e.preventDefault(); e.stopPropagation(); }
    setIsEditing(false);
    if (value !== resolveValue()) updateContent(contentKey, value);
  };

  const handleCancel = (e?: React.MouseEvent) => {
    if(e) { e.preventDefault(); e.stopPropagation(); }
    setIsEditing(false);
    setValue(resolveValue());
  };

  if (isEditing) {
    return (
      <div className={`relative ${className} border-2 border-brand-accent rounded p-2 bg-white shadow-xl z-50 min-w-[200px]`} onClick={e => e.stopPropagation()}>
        {multiline ? (
          <textarea 
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded p-2 outline-none text-inherit font-inherit leading-inherit resize-y text-gray-800"
            rows={5}
          />
        ) : (
          <input 
            autoFocus
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded p-2 outline-none text-inherit font-inherit leading-inherit text-gray-800"
            onKeyDown={(e) => { if(e.key === 'Enter') handleSave(); if(e.key === 'Escape') handleCancel(); }}
          />
        )}
        
        {/* Action Bar */}
        <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-gray-100">
          <button 
            onClick={handleCancel}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 font-medium transition-colors"
          >
            <X size={14} /> Abbrechen
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-1 px-3 py-1.5 text-xs bg-green-500 text-white rounded hover:bg-green-600 font-bold shadow-md transition-colors"
          >
            <Check size={14} /> Speichern
          </button>
        </div>
      </div>
    );
  }

  // To prevent the element from collapsing to 0x0 size and hiding the edit button
  const displayValue = value || <span className="opacity-40 italic bg-yellow-100/30 px-2 rounded">[Leer – Klicken zum Bearbeiten]</span>;

  return (
    <Component className={`relative group inline-block whitespace-pre-wrap min-w-[2em] min-h-[1.5em] ${className}`}>
      {multiline && value ? (
        value.split('\n').map((line: string, i: number) => <span key={i}>{line}<br/></span>)
      ) : (
        displayValue
      )}
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditing(true); }}
        className="absolute -top-3 -right-3 p-1.5 bg-brand-accent text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-40 transform hover:scale-110"
        title="Text bearbeiten"
      >
        <Pencil size={12} />
      </button>
    </Component>
  )
}
