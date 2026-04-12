// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../Homesections/Header.jsx";
import Footer from "../Homesections/Footer.jsx";
import ClientWrapper from "./wraper.jsx";
import EnrollmentPopupGate from "@/components/EnrollmentPopupGate";
import FloatingContactButtons from "@/components/FloatingContactButtons";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "NIGAPE - GK2 Delhi Institute of Generative AI & Prompt Engineering",
  description: "India-first institute dedicated to Generative AI and Prompt Engineering careers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    fontFamily: {
                      sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
                      mono: ['var(--font-geist-mono)', 'monospace']
                    },
                    colors: {
                      pink: { 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777' },
                      purple: { 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea' },
                      cyan: { 300: '#99f6e4', 400: '#22d3ee' }
                    }
                  }
                }
            `,
          }}
        />
      </head>

      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <ClientWrapper>
          <Header />
          {children}
          <EnrollmentPopupGate />
          <Footer />
          <FloatingContactButtons />
        </ClientWrapper>
      </body>
    </html>
  );
}