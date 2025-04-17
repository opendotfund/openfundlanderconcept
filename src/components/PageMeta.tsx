
import React from 'react';
import { Helmet } from 'react-helmet-async';

type PageMetaProps = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
};

const PageMeta: React.FC<PageMetaProps> = ({ 
  title = "OpenFund - The Modern Platform for Global Investments",
  description = "Trade stocks, crypto, commodities and more on a single platform with OpenFund. Create or join community-managed funds with transparent performance.",
  canonicalUrl
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
    </Helmet>
  );
};

export default PageMeta;
