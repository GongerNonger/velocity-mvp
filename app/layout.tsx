import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velocity  AI Academic Advisor for higher ed",
  description:
    "Velocity is the AI advising platform for universities. Personalized degree plans, conversational AI advising, risk detection, and career pathway matching. Founded by students at Utah Valley University.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
