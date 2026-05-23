import type { Metadata } from "next";
import "./globals.css";

const title = "Velocity — AI Academic Advisor for Higher Ed";
const description =
  "Velocity helps universities reduce advisor caseloads, surface at-risk students early, and improve on-time graduation rates. Built by students, for every campus.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
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
