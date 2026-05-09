import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kareem Saeed — Full Stack Developer",
  description: "Full Stack Developer · .NET Core · React · Angular · Clean Architecture",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
