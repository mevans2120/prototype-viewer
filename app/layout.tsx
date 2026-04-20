import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "Prototype Viewer",
  description: "A private gallery for single-file HTML prototypes.",
  robots: { index: false, follow: false, nocache: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Theme accentColor="teal" grayColor="sand" radius="large" scaling="100%">
          {children}
        </Theme>
      </body>
    </html>
  );
}
