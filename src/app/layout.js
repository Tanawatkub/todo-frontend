import { Inter } from 'next/font/google';
import './globals.css'; // ✅ ใช้เชื่อม Tailwind CSS ให้ทุกหน้า

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Todo List - Beautiful Task Manager',
  description: 'A modern and beautiful todo application built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col items-center justify-start
                    bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100
                    text-gray-900 transition-all duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
