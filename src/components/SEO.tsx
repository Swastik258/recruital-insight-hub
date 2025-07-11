
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Week-HR | AI-Powered HR Solutions & Interview Questions Generator",
  description = "Transform your recruitment process with Week-HR's AI-powered HR solutions. Generate interview questions, screen resumes, optimize job descriptions, and boost hiring efficiency by 60%. Trusted by 500+ companies.",
  keywords = "AI HR software, interview questions generator, resume screening, job description optimizer, recruitment automation, HR analytics, candidate matching, performance evaluation, hiring tools",
  image = "https://week-hr.com/og-image.jpg",
  url = "https://week-hr.com",
  type = "website",
  noIndex = false
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "image": image,
    "publisher": {
      "@type": "Organization",
      "name": "Week-HR",
      "url": "https://week-hr.com"
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
