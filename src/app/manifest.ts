import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "My PWA App",
    short_name: "PWAApp",
    description: "Next.js PWA Test",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180"
      },
      {
        src: "/web-app-manifest-192x192.png",
        type: "image/png",
        sizes: "192x192"
      },
      {
        src: "/web-app-manifest-512x512.png",
        type: "image/png",
        sizes: "512x512"
      }
    ]
  }
};