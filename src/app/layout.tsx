import "./globals.css";
import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic } from "next/font/google";
import { ThemeProvider } from "@/src/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
const notoSansArabic = Noto_Sans_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Humanitarian Crisis Support",
  description: "Support humanitarian relief efforts in areas of conflict",
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: "ar" | "en" };
}) {
  const isArabic = params.lang === "ar";

  return (
    <html
      lang={params.lang}
      dir={isArabic ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={isArabic ? notoSansArabic.className : inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          // enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
