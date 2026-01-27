import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lucía Quijada | Frontend Developer",
  description:
    "Frontend Developer apasionada por crear experiencias digitales modernas, accesibles y con una atención al detalle excepcional.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Lucía Quijada" }],
  openGraph: {
    title: "Lucía Quijada | Frontend Developer",
    description:
      "Frontend Developer apasionada por crear experiencias digitales modernas y accesibles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-stone-50 text-stone-900 antialiased transition-colors duration-300 dark:bg-black dark:text-stone-100">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <CustomCursor />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
