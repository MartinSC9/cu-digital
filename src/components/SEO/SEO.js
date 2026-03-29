import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG, buildUrl, buildPageTitle } from '../../config/seo';
import { useLanguage } from '../../contexts/LanguageContext';

const SEO = ({
  title,
  description,
  keywords,
  author = SEO_CONFIG.author.name,
  image = SEO_CONFIG.defaultMeta.image,
  url,
  type = 'website',
  twitterHandle = SEO_CONFIG.twitter.handle,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
}) => {
  const { t } = useLanguage();
  const siteName = SEO_CONFIG.siteName;
  const fullTitle = buildPageTitle(title);
  const fullDescription = description || t.seo.description;
  const fullKeywords = keywords || t.seo.keywords;
  const fullUrl = url || buildUrl();
  const fullImage = buildUrl(image);

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={t.seo.language} />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={t.seo.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />

      {/* Additional Meta Tags */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#1f729e" />
      <meta name="msapplication-TileColor" content="#1f729e" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Structured Data / JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: SEO_CONFIG.author.fullName,
          jobTitle: t.seo.jobTitle,
          description: fullDescription,
          url: fullUrl,
          image: fullImage,
          sameAs: [
            SEO_CONFIG.social.github,
            SEO_CONFIG.social.linkedin,
            SEO_CONFIG.social.twitter,
          ],
          knowsAbout: [
            'React',
            'JavaScript',
            'TypeScript',
            '.NET',
            'Node.js',
            'MySQL',
            'SQL Server',
            'NestJS',
            'GitHub Actions',
          ],
          worksFor: {
            '@type': 'Organization',
            name: 'Freelance',
          },
        })}
      </script>

      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </Helmet>
  );
};

export default SEO;
