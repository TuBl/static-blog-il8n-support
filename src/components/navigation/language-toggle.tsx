"use client";

import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Languages } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

interface LanguageToggleProps {
  currentLang: string;
}

export function LanguageToggle({ currentLang }: LanguageToggleProps) {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    // Safely retrieve the pathname on the client side
    setPathname(window.location.pathname);
  }, []);

  const redirectPath = pathname.replace(`/${currentLang}`, "");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/en${redirectPath}`}>English</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/ar${redirectPath}`}>العربية</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
