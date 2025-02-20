import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hack the Code - Interactive Security Demos",
  description:
    "Learn about common web security vulnerabilities through interactive demonstrations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="cyber-grid">
        <div className="min-h-screen">
          <header className="border-b border-border bg-muted/50 backdrop-blur-sm shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            <div className="container mx-auto px-4 py-4">
              <nav>
                <Link
                  href="/"
                  className="text-xl font-bold text-accent hover:text-accent/80 glow-text"
                >
                  🔒 Hack the Code
                </Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-border bg-muted/50 backdrop-blur-sm py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              ⚠️ Educational Purpose Only: These demonstrations are for learning
              about web security.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
