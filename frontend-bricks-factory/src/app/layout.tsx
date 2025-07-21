import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Brick Factory",
  description: "Manage bricks",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <nav className="bg-gray-800 text-white p-4 sticky top-0 z-10 shadow-md">
          <ul className="flex space-x-6 max-w-7xl mx-auto">
            <li>
              <Link href="/" className="hover:text-gray-300 transition-colors">
                Listagem
              </Link>
            </li>
            <li>
              <Link
                href="/create"
                className="hover:text-gray-300 transition-colors"
              >
                Criar Tijolo
              </Link>
            </li>
            <li>
              <Link
                href="/statistics"
                className="hover:text-gray-300 transition-colors"
              >
                Estatísticas
              </Link>
            </li>
          </ul>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
