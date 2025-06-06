import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/FloatingNav'
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "Content Pal AI",
  description: "A luxury-grade SaaS platform for AI-powered social media content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Added Stripe.js script
}>) { // Added Stripe.js script
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
            <script src="https://js.stripe.com/v3/"></script>
          <Navbar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
