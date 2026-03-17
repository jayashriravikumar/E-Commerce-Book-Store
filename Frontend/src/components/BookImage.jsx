import { useEffect, useState } from "react";

import { getBookImage } from "../utils/books";

function BookImage({ book, alt, className }) {
  const [src, setSrc] = useState(getBookImage(book));

  useEffect(() => {
    setSrc(getBookImage(book));
  }, [book]);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setSrc(getBookImage({ title: book?.title, author: book?.author }))}
    />
  );
}

export default BookImage;
