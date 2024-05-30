export const constants = {
    name: "YOUR_NAME",
    description: "YOUR_DESCRIPTION",
    logo: "/images/PATH_TO_YOUR_LOGO",
    banner: "/images/PATH_TO_YOUR_BANNER",
    domain: process.env.NODE_ENV === 'development' ? "localhost:1010" : ".YOUR_DEFAULT_URL(NO_HTTPS)",
    links: {
        "login": "https://YOUR_URL/login",
        "register": "https://YOUR_URL/register",
        "default": "https://YOUR_URL",
        "app": "https://YOUR_URL",
    },
    socials: {
        "twitter": "https://twitter.com/NAME",
        "instagram": "https://instagram.com/NAME",
        "youtube": "https://youtube.com/@NAME",
        "tiktok": "https://tiktok.com/@NAME",
        "github": "https://github.com/NAME"
    },
    authors: [{name: "YOUR_NAME", url: "YOUR_URL"}]
}