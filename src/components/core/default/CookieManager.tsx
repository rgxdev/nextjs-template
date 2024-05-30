"use client";

import Link from "next/link";
import React, {useEffect, useState} from "react";
import {GoogleAnalytics} from "@next/third-parties/google";
import {Button} from "@/components/ui/button";

export default function CookieManager() {
    const [hidden, setHidden] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const shouldShowPopup = () => !localStorage.getItem("cookie_consent");
        setShowPopup(shouldShowPopup());
    }, []);

    if (typeof window === "undefined") return null;

    const saveToStorage = (value: string) => {
        localStorage.setItem("cookie_consent", value);
        setHidden("hidden");
        setShowPopup(false);
    };

    if (showPopup) {
        return (
            <div data-aos="fade-up" className={"pointer-events-none fixed inset-x-0 bottom-0 px-6 pb-6 z-30 " + hidden}>
                <div
                    className="pointer-events-auto ml-auto max-w-xl rounded-xl bg-neutral-950 p-6 shadow-lg ring-1 ring-neutral-700 ">
                    <p className="text-sm leading-6 text-white">
                        This website uses cookies to collect important analytical data and enhance user experience. To
                        learn more about our cookies, please read our{' '}
                        <Link href="/legal/cookie-policy"
                              className="font-semibold text-green-400 hover:text-green-200 transition-all">
                            cookie policy
                        </Link>
                        .
                    </p>
                    <div className="mt-4 flex items-center gap-x-5">
                        <Button variant={"outline"} onClick={() => saveToStorage("true")}>Accept all</Button>
                        <Button onClick={() => saveToStorage("false")}>Reject all</Button>
                    </div>
                </div>
            </div>
        )
    } else {
        const haveConsent = localStorage.getItem("cookie_consent") === "true";
        if (haveConsent) {
            return <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || ""}/>;
        }
    }
}