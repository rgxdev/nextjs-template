import {Inter as FontSans} from "next/font/google"
import "./globals.css";
import {cn} from "@/lib/utils";
import {Providers} from "@/app/providers";
import {Metadata} from "next";
import {constants} from "@/lib/constants";
import CookieManager from "@/components/core/default/CookieManager";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})


export const metadata: Metadata = {
    title: {
        template: "%s | " + constants.name,
        default: constants.name,
    },
    description: constants.description,
    applicationName: constants.name,
    authors: constants.authors,
    generator: "Next.js",
    keywords: ["KEYWORD_1", "KEYWORD_2", "KEYWORD_3"],
    referrer: "origin-when-cross-origin",
    creator: constants.name,
    publisher: constants.name,
    metadataBase: new URL(constants.links.default),
    openGraph: {
        title: constants.name,
        description: constants.description,
        url: constants.links.default,
        siteName: constants.name,
        locale: "en_US",
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
        googleBot: {
            index: true,
            follow: true,
        }
    }
}


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
        <body
            className={cn(
                "min-h-screen bg-background font-sans antialiased bg-n-8 dark:bg-n-1",
                fontSans.variable
            )}
        >
        <Providers>
            <CookieManager/>
            {children}
        </Providers>
        </body>
        </html>
    );
}
