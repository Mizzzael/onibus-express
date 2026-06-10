import type { Metadata } from "next";
import { Roboto, Outfit, Noto_Sans_Runic } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "next-themes";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const outfitSans = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const runicFont = Noto_Sans_Runic({
  variable: "--font-runic",
  subsets: ["runic"],
  weight: "400"
})

export const metadata: Metadata = {
  title: "DESAFIO TÉCNICO | OniBus Express",
  description: "Sistema de Venda de Passagens Rodoviárias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${robotoSans.variable} ${outfitSans.variable} ${ runicFont.variable } h-full antialiased light`}
      data-theme="light"
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
