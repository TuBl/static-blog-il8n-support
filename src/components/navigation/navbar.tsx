"use client";

import Link from "next/link";
import { Heart, Sun, Moon, Monitor } from "lucide-react"; // Import a monitor icon for "system"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LanguageToggle } from "@/src/components/navigation/language-toggle";

interface NavbarProps {
  lang: string;
  dictionary: {
    home: string;
    contacts: string;
    summary: string;
    title: string;
  };
}

export function Navbar({ lang, dictionary }: NavbarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const isRTL = lang === "ar";
  useEffect(() => {
    setIsMounted(true); // Ensures component only renders after hydration
  }, []);

  // Function to cycle through themes: light -> dark -> system
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <nav className="flex justify-center items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div
        className={`container flex h-16 items-center justify-between px-4 ${
          isRTL ? "text-right rtl" : "text-left"
        }`}
      >
        {/* Logo and Links */}
        <div className="flex items-center gap-6 md:gap-10">
          <Link href={`/${lang}`} className="flex items-center space-x-2">
            <Heart className="h-6 w-6" />
            <span className="font-bold">{dictionary.title}</span>
          </Link>
          <div className="flex gap-6">
            <Link
              href={`/${lang}`}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {dictionary.home}
            </Link>
            <Link
              href={`/${lang}/contacts`}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {dictionary.contacts}
            </Link>
            <Link
              href={`/${lang}/summary`}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {dictionary.summary}
            </Link>
          </div>
        </div>

        {/* Language Toggle and Theme Toggle */}
        <div className="flex items-center gap-4">
          <LanguageToggle currentLang={lang} />
          {isMounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-colors hover:bg-muted"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
