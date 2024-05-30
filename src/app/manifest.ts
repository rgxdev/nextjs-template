import {MetadataRoute} from 'next'
import {constants} from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: constants.name,
        short_name: constants.name,
        description: constants.description,
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}