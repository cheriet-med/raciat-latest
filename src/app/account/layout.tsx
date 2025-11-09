import type { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {

  
  return {
    title: "My Goamico Dashboard",
    description: "Manage your Goamico account, view your bookings, and access personalized travel recommendations.",
    robots: {
      index: false, // Most dashboards should NOT be indexed
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true, // Hide images from search
      },
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_HOME}/account`,
      languages: {
        'en': `${process.env.NEXT_PUBLIC_HOME}/en/account`,
        'fr': `${process.env.NEXT_PUBLIC_HOME}/fr/compte`,
        'ar': `${process.env.NEXT_PUBLIC_HOME}/ar/الحساب`,
        'nl': `${process.env.NEXT_PUBLIC_HOME}/nl/account`,
        'de': `${process.env.NEXT_PUBLIC_HOME}/de/konto`,
        'pt': `${process.env.NEXT_PUBLIC_HOME}/pt/conta`,
        'sv': `${process.env.NEXT_PUBLIC_HOME}/sv/konto`,
        'ru': `${process.env.NEXT_PUBLIC_HOME}/ru/аккаунт`,
        'it': `${process.env.NEXT_PUBLIC_HOME}/it/account`,
        'es': `${process.env.NEXT_PUBLIC_HOME}/es/cuenta`,
        'x-default': `${process.env.NEXT_PUBLIC_HOME}/en/account`, // Fallback to English
      },
    },
    openGraph: {
      title: "My Goamico Dashboard",
      description: "Access your personal travel dashboard on Goamico",
      images: [{
        url: `${process.env.NEXT_PUBLIC_HOME}/og/og.png`,
        width: 1200,
        height: 630,
        alt: "My Goamico Dashboard"
      }]
    },
    twitter: {
      card: "summary_large_image", // Best for engagement
      title: "My Goamico Dashboard",
      description: "Access your personal travel dashboard on Goamico",
      // creator: "@TwitterHandle",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_HOME}/og/og.png`,
          width: 1200,
          height: 630,
          alt: "My Goamico Dashboard",
        },
      ],
    },
  };
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div>
      {children}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Goamico Dashboard",
          "url": `${process.env.NEXT_PUBLIC_HOME}/account`,
          "description": "Your personal Goamico dashboard for managing travel bookings and preferences",
          "isAccessibleForFree": false, // Indicates paywalled/private content
          "significantLink": [
            `${process.env.NEXT_PUBLIC_HOME}/`,
          ]
        })}
      </script>
    </div>
  );
}