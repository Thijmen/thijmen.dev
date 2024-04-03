const canonicalUrl = 'https://www.thijmen.dev'
const metaImage =
  'https://aulianza.s3.ap-southeast-1.amazonaws.com/images/public/aulianza-id.png'
const metaDescription =
  'Lead Software Engineer with an interest in web development, cloud computing, and software architecture. I write about software development, cloud computing, apps and personal growth.'

const defaultSEOConfig = {
  defaultTitle: 'Thijmen.de  - Personal Website',
  description: metaDescription,
  canonical: canonicalUrl,
  openGraph: {
    canonical: canonicalUrl,
    title: 'Thijmen.dev - Personal Website',
    description: metaDescription,
    type: 'website',
    images: [
      {
        url: metaImage,
        alt: 'thijmen.dev og-image',
        width: 800,
        height: 600,
      },
      {
        url: metaImage,
        alt: 'thijmen.dev og-image',
        width: 1200,
        height: 630,
      },
      {
        url: metaImage,
        alt: 'thijmen.dev og-image',
        width: 1600,
        height: 900,
      },
    ],
    site_name: 'thijmen.dev',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
}

export default defaultSEOConfig
