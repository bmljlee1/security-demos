import type React from "react";
interface DemoLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function DemoLayout({
  title,
  description,
  children,
}: DemoLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold">{title}</h1>
        <p className="text-white">{description}</p>
      </div>
      {children}
    </div>
  );
}
