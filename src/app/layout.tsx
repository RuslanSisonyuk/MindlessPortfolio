import type { Metadata } from 'next'
// import './index.css'

export const metadata: Metadata = {
    title: 'Arthur Lanca Sound Design',
    description: 'This is a website dedicated to showcasing the portfolio of Arthur Lanca - a proffessional sound designer. Here you can find out who Arthur Lanca is, view video Reels of his sound design work, listen to his music, as well as contact the proffessional sound designer.',
  }

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/assets/BIG-LOGO-SD.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" /> {/* crossorigin */}
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <div id="root">{children}</div>
        {/* <script type="module" src="/src/main.tsx"></script> */}
      </body>
    </html>
    )
}