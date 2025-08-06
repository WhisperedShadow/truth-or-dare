import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Reveal or Risk",
  description:
    "Reveal or Risk — The Ultimate Truth or Dare Generator! \nGet ready to uncover secrets or take on thrilling challenges with just one click. Whether you're hanging out with friends, spicing up a party, or looking for some fun, Reveal or Risk delivers endless, exciting truths and dares tailored to your vibe. Dare to reveal your truth or risk the challenge — are you brave enough?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <meta
          name="google-site-verification"
          content="4FUi4prDx0L35BM-ppeKMLA5YPmuAmh-tFcZ40VXYlU"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"
          integrity="sha512-DxV+EoADOkOygM4IR9yXP8Sb2qwgidEmeqAEmDKIOfPRQZOWbXCzLC6vjbZyy0vPisbH2SyW27+ddLVCN+OMzQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
