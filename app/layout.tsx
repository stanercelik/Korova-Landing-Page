import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header, Footer } from "@/components/layout";
import { HiddenNetlifyForms } from "@/components/hidden-forms";
import "./globals.css";
import "../styles/globals.css";
import "../styles/animations.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Korova | Find Your People Through The Films You Love",
  description: "Tired of superficial connections? Korova connects you with friends and partners based on your unique movie taste. Join the waitlist for exclusive early access.",
  keywords: [
    "movie matching",
    "film lovers", 
    "cinematic connections",
    "movie app",
    "film community",
    "dating app",
    "friendship app"
  ],
  authors: [{ name: "Korova Team" }],
  creator: "Korova",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://korova.app",
    title: "Korova | Find Your People Through The Films You Love",
    description: "Tired of superficial connections? Korova connects you with friends and partners based on your unique movie taste.",
    siteName: "Korova",
  },
  twitter: {
    card: "summary_large_image",
    title: "Korova | Find Your People Through The Films You Love",
    description: "Tired of superficial connections? Korova connects you with friends and partners based on your unique movie taste.",
    creator: "@korova_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/fav-icon-yellow.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <Header />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
        <HiddenNetlifyForms />
      </body>
    </html>
  );
}
