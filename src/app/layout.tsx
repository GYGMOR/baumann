import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AdminProvider } from "@/context/AdminContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baumann Reinigungssysteme GmbH | Professionelle Gebäudereinigung",
  description: "Ihre Experten für makellose Sauberkeit im Innern. Professionelle Gebäudereinigung für Unternehmen, Verwaltungen und Privatkunden.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AdminProvider>
          {children}
        </AdminProvider>
      </body>
    </html>
  );
}
