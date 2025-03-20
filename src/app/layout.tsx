import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Practice Pro",
  description: "Your Best Music Practice Diary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='relative bg-home-img bg-cover bg-center bg-fixed min-h-screen'>
            {/* Background Overlay */}
            <div className='absolute inset-0 bg-foreground/50'></div>

            {/* Main Content */}
            <main className='relative flex flex-col min-h-screen'>
              {/* Header */}
              <Header />
              {/* Page Content */}
              <div className='flex-grow'>{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
