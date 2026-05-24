import '../styles/globals.css'

export const metadata = {
  title: 'RHAJI FPH — CREATIVOX ENDURANCE TEST',
  description: '100% Full Stack | Heavyweight Next.js | Raw Denim Digital Streetwear',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=Barlow+Condensed:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grain-overlay denim-bg denim-warp">
        {children}
      </body>
    </html>
  )
}
