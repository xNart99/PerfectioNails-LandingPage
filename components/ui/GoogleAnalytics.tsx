import Script from "next/script";

interface Props {
  measurementId: string;
}

/**
 * Injects the Google Analytics 4 gtag.js snippet.
 * Uses next/script afterInteractive so it never blocks the main thread.
 * Render this once in the root layout, passing NEXT_PUBLIC_GA_ID.
 */
export default function GoogleAnalytics({ measurementId }: Props) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
