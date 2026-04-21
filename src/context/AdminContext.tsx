"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ContentData = any; // Will match structure of content.json

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  content: ContentData;
  updateContent: (keyPath: string, newValue: any) => Promise<void>;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<ContentData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if logged in (usually via local storage or a secure cookie)
    const token = localStorage.getItem("admin_token");
    if (token) setIsAdmin(true);

    // Fetch initial content
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const timestamp = new Date().getTime();
      const res = await fetch(`/baumann/data/content.json?t=${timestamp}`);
      const data = await res.json();
      setContent(data);
    } catch (e) {
      console.error("Failed to load content", e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (password: string) => {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    
    if (res.ok) {
      localStorage.setItem("admin_token", "true");
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setIsAdmin(false);
  };

  const updateContent = async (keyPath: string, newValue: any) => {
    // Deep clone content
    const newContent = JSON.parse(JSON.stringify(content));
    
    // Set value at path safely
    const keys = keyPath.split('.');
    let current = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = newValue;

    // Save locally immediately for fast feedback
    setContent(newContent);

    // Save to server
    try {
      await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin_token_placeholder' // Very basic protection
        },
        body: JSON.stringify(newContent)
      });
    } catch(e) {
      console.error("Failed to save content", e);
      // Revert if failed
      await fetchContent();
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, content, updateContent, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
