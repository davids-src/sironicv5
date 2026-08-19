import type { Metadata } from "next";
import "./globals.css";

import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://sironic.eu"),
  icons: {
    icon: '/favicon.ico',
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
        <Script id="theme-script" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('sironic-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
