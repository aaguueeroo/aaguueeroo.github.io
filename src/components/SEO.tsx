import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url = "https://juliaaguero.com",
  image = "https://juliaaguero.com/meta-image.png",
  type = "website",
  author,
  publishedDate,
  modifiedDate
}) => {
  const fullUrl = url.startsWith("http") ? url : `https://juliaaguero.com${url}`;
  const fullImageUrl = image.startsWith("http") ? image : `https://juliaaguero.com${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {author && <meta name="author" content={author} />}

      {/* Open Graph (Facebook, LinkedIn, WhatsApp, etc.) */}
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Julia Agüero - Complete Mobile App Solutions" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific Open Graph tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedDate && <meta property="article:published_time" content={publishedDate} />}
          {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
          <meta property="article:section" content="Technology" />
          <meta property="article:tag" content="Mobile Development" />
          <meta property="article:tag" content="Flutter" />
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@aaguueeroo" />
      <meta name="twitter:creator" content="@aaguueeroo" />
      
      {/* Additional meta for better social sharing */}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Helmet>
  );
}; 