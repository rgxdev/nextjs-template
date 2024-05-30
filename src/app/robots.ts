import {MetadataRoute} from "next";
import {constants} from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/"],
            disallow: ["/search?q=", "/admin/"]
        },
        sitemap: [constants.links.default + "/sitemap.xml"]
    };
}