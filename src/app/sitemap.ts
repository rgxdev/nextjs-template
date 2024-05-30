import {MetadataRoute} from "next";
import {constants} from "@/lib/constants";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const url = constants.links.default;
    const defaultPages = [
        {
            url: url,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1
        }
    ];

    const sitemap = [
        ...defaultPages
    ];

    // @ts-ignore
    return sitemap;
}