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
      <head>
        {/* Prevent theme flash: read localStorage and apply data-theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('sironic-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
