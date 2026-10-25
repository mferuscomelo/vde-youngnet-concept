// Public-folder URL that respects Vite's base path (the site runs under /<repo>/ on GitHub Pages).
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')
