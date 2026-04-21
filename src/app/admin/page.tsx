"use client";

import { useState } from "react";
import Image from "next/image";
import { useAdmin } from "@/context/AdminContext";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAdmin, logout } = useAdmin();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(password);
    if (success) {
      router.push("/"); 
    } else {
      setError("Falsches Passwort.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 relative overflow-hidden py-24">
      {/* Background with Gross ICT subtle branding */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
         <Image src="/images/logo-gross-ict-icon.png" alt="" width={800} height={800} className="object-contain" />
      </div>

      <div className="bg-white p-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] w-full max-w-md relative z-10 border border-gray-100 text-center">
         <div className="mb-8 flex justify-center">
            <Image src="/images/logo-gross-ict.png" alt="Gross ICT Admin" width={220} height={80} className="object-contain" />
         </div>
         
         {!isAdmin ? (
           <>
             <h1 className="text-2xl font-semibold text-gray-800 mb-2">Admin Login</h1>
             <p className="text-gray-500 mb-8 text-sm">Geben Sie Ihr Master-Passwort ein, um den visuellen Editor auf der Webseite zu aktivieren.</p>
             
             <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                   <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Passwort eingeben..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#f5b041] focus:border-transparent transition-all outline-none"
                   />
                   {error && <p className="text-red-500 text-sm mt-2 text-left">{error}</p>}
                </div>
                <button 
                   type="submit"
                   className="w-full py-3.5 bg-[#f5b041] hover:bg-[#e5a031] text-white font-medium rounded-xl shadow-md transition-transform transform active:scale-95"
                >
                   Einloggen & Bearbeiten
                </button>
             </form>
             <p className="mt-8 text-xs text-gray-400">Powered by Gross ICT</p>
           </>
         ) : (
           <>
             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
             </div>
             <h1 className="text-2xl font-semibold text-gray-800 mb-2">Erfolgreich eingeloggt</h1>
             <p className="text-gray-500 mb-8 text-sm">Der Visual-Editor ist nun auf der gesamten Webseite aktiv. Jedes Textfeld und Bild hat nun ein Stift-Symbol.</p>
             
             <div className="space-y-3">
                 <button 
                    onClick={() => router.push("/")}
                    className="w-full py-3.5 bg-brand-primary hover:bg-brand-primary/90 text-white font-medium rounded-xl shadow-md transition-transform transform active:scale-95"
                 >
                    Zur Website wechseln
                 </button>
                 <button 
                    onClick={() => logout()}
                    className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-transform transform active:scale-95"
                 >
                    Ausloggen
                 </button>
             </div>
           </>
         )}
      </div>
    </div>
  );
}
