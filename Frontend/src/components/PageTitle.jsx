import { Helmet } from "react-helmet-async";

const PageTitle = ({
  title,
  description = "Buy books online at the best prices.",
  keywords = "books, online bookstore, novels, self help, finance books",
  image = "/logo.png", // Default image
  url = window.location.href,
}) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default PageTitle;
