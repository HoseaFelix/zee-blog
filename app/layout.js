// app/layout.jsx
import ProPushLoader from '@/components/proPushLoader';
import './globals.css';
import { siteMetadata } from '@/lib/seo';

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  themeColor: '#2563eb',
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: siteMetadata.social.twitter,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* ProPush meta */}
        <meta name="pushsdk" content="01c010d176ef9773235b92eb4440c111" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Google AdSense script */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          ></script>
        )}

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LPF26F4CK5"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LPF26F4CK5');
            `,
          }}
        ></script>
      </head>

      <body className="min-h-screen flex flex-col">
        {/* Load ProPush script safely on client */}
        <ProPushLoader/>
        {children}
      </body>
    </html>
  );
}
