import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/app/providers";
import { Metadata } from "next";
import { constants } from "@/lib/constants";
import CookieManager from "@/components/core/default/CookieManager";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | " + constants.name,
    default: constants.name,
  },
  description: constants.description,
  applicationName: constants.name,
  authors: constants.authors,
  generator: "Next.js",
  keywords: ["Next.js", "React", "TypeScript", "TanStack", "Tailwind CSS"],
  referrer: "strict-origin-when-cross-origin",
  creator: constants.name,
  publisher: constants.name,
  metadataBase: new URL(constants.links.default),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: constants.name,
    description: constants.description,
    url: constants.links.default,
    siteName: constants.name,
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: constants.banner,
        width: 1200,
        height: 630,
        alt: constants.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: constants.socials.twitter,
    title: constants.name,
    description: constants.description,
    creator: constants.socials.twitter,
    images: [
      {
        url: constants.banner,
        width: 1200,
        height: 630,
        alt: constants.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    nositelinkssearchbox: true,
    noimageindex: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <CookieManager />
          {children}
        </Providers>
      </body>
    </html>
  );
}
