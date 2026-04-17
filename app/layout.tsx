import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sironic.eu"),
  icons: {
    icon: [
      { url: "/sironic_logo.png", type: "image/png", sizes: "512x512" },
      { url: "/sironic_logo.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/sironic_logo.png",
    apple: "/sironic_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head />
      <body>{children}</body>
    </html>
  );
}
