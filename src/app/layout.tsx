import type { Metadata } from 'next'

import 'tailwindcss/tailwind.css'
import 'aos/dist/aos.css'
import '@/common/styles/globals.css'

import ClientLayout from '@/app/ClientLayout'
import { generateSiteTitle } from '@/core/metadata'

export const metadata: Metadata = {
  title: generateSiteTitle({ title: 'Unknown page' }),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const umamiWebsiteId = process.env.UMAMI_WEBSITE_ID

  return (
    <html suppressHydrationWarning lang='en'>
      <head>
        <script
          async
          defer
          src='https://umami.thijmen.dev/script.js'
          data-website-id={umamiWebsiteId}
        ></script>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link
          rel='mask-icon'
          href='/favicon/safari-pinned-tab.svg'
          color='#121212'
        />
        <meta name='theme-color' content='#121212' />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
