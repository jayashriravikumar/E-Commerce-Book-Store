function getInitials(title = "") {
  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "")
    .join("");
}

function escapeXml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getBookHash(book = {}) {
  const source = `${book?.title || ""}|${book?.author || ""}|${book?.category || ""}`;
  let hash = 0;

  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) % 2147483647;
  }

  return Math.abs(hash);
}

function getCoverPalette(category = "") {
  const normalizedCategory = category.toLowerCase();

  if (normalizedCategory === "self growth") {
    return {
      backgroundStart: "#f59e0b",
      backgroundEnd: "#7c2d12",
      accent: "#fde68a",
      line: "#fef3c7"
    };
  }

  if (normalizedCategory === "technology") {
    return {
      backgroundStart: "#0f766e",
      backgroundEnd: "#082f49",
      accent: "#99f6e4",
      line: "#ccfbf1"
    };
  }

  if (normalizedCategory === "fiction") {
    return {
      backgroundStart: "#7c3aed",
      backgroundEnd: "#312e81",
      accent: "#ddd6fe",
      line: "#ede9fe"
    };
  }

  if (normalizedCategory === "business") {
    return {
      backgroundStart: "#1d4ed8",
      backgroundEnd: "#172554",
      accent: "#bfdbfe",
      line: "#dbeafe"
    };
  }

  return {
    backgroundStart: "#334155",
    backgroundEnd: "#111827",
    accent: "#cbd5e1",
    line: "#e2e8f0"
  };
}

function shiftHexColor(hex, amount) {
  const value = hex.replace("#", "");
  const safeAmount = Math.max(-70, Math.min(70, amount));
  const channels = [0, 2, 4].map((start) => {
    const channel = parseInt(value.slice(start, start + 2), 16);
    const next = Math.max(0, Math.min(255, channel + safeAmount));
    return next.toString(16).padStart(2, "0");
  });

  return `#${channels.join("")}`;
}

function splitTitle(title = "", maxLength = 16) {
  const words = title.split(" ").filter(Boolean);
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const candidate = currentLine ? `${currentLine} ${word}` : word;

    if (candidate.length <= maxLength) {
      currentLine = candidate;
      return;
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    currentLine = word;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.slice(0, 3);
}

function getPatternMarkup(hash, palette) {
  const variant = hash % 4;

  if (variant === 0) {
    return `
      <circle cx="238" cy="78" r="42" fill="${palette.accent}" opacity="0.14" />
      <circle cx="258" cy="108" r="68" fill="${palette.line}" opacity="0.08" />
      <path d="M170 320C210 270 256 262 300 286V420H150C150 383 156 349 170 320Z" fill="${palette.accent}" opacity="0.12" />
    `;
  }

  if (variant === 1) {
    return `
      <path d="M210 18L300 18V154C262 138 224 104 210 18Z" fill="${palette.accent}" opacity="0.14" />
      <path d="M22 320C62 278 114 270 178 292V398H22V320Z" fill="${palette.line}" opacity="0.09" />
      <rect x="192" y="182" width="88" height="88" rx="20" fill="${palette.accent}" opacity="0.08" transform="rotate(12 236 226)" />
    `;
  }

  if (variant === 2) {
    return `
      <path d="M20 64C72 24 146 18 224 48C254 60 278 80 300 108V18H20V64Z" fill="${palette.accent}" opacity="0.12" />
      <path d="M0 356C70 314 138 302 214 320C246 328 274 344 300 364V420H0V356Z" fill="${palette.line}" opacity="0.08" />
      <circle cx="244" cy="244" r="34" fill="${palette.accent}" opacity="0.09" />
    `;
  }

  return `
    <rect x="204" y="26" width="76" height="128" rx="18" fill="${palette.accent}" opacity="0.1" />
    <rect x="186" y="44" width="112" height="88" rx="24" fill="${palette.line}" opacity="0.08" />
    <path d="M26 298C92 258 154 256 214 286L214 398L26 398Z" fill="${palette.accent}" opacity="0.12" />
  `;
}

function getAccentMarkup(hash, palette) {
  const variant = hash % 3;

  if (variant === 0) {
    return `
      <line x1="34" y1="182" x2="266" y2="182" stroke="${palette.line}" stroke-width="2" opacity="0.75" />
      <line x1="34" y1="190" x2="214" y2="190" stroke="${palette.line}" stroke-width="2" opacity="0.35" />
    `;
  }

  if (variant === 1) {
    return `
      <rect x="34" y="176" width="146" height="6" rx="3" fill="${palette.line}" opacity="0.75" />
      <rect x="34" y="188" width="96" height="6" rx="3" fill="${palette.line}" opacity="0.38" />
    `;
  }

  return `
    <circle cx="42" cy="185" r="8" fill="${palette.line}" opacity="0.72" />
    <line x1="58" y1="185" x2="266" y2="185" stroke="${palette.line}" stroke-width="2" opacity="0.68" />
  `;
}

function getFallbackBookImage(book = {}) {
  const title = book?.title || "Book";
  const author = book?.author || "BookStore";
  const category = book?.category || "Featured";
  const hash = getBookHash(book);
  const initials = getInitials(title) || "BK";
  const titleLines = splitTitle(title).map((line) => escapeXml(line));
  const basePalette = getCoverPalette(category);
  const colorShift = (hash % 5) * 10 - 20;
  const palette = {
    backgroundStart: shiftHexColor(basePalette.backgroundStart, colorShift),
    backgroundEnd: shiftHexColor(basePalette.backgroundEnd, -colorShift / 2),
    accent: shiftHexColor(basePalette.accent, colorShift / 2),
    line: basePalette.line
  };
  const safeAuthor = escapeXml(author.slice(0, 28));
  const safeCategory = escapeXml(category.toUpperCase());
  const gradientId = `g-${hash}`;
  const patternMarkup = getPatternMarkup(hash, palette);
  const accentMarkup = getAccentMarkup(hash, palette);
  const titleSvg = titleLines
    .map(
      (line, index) => `
      <text x="34" y="${220 + index * 32}" fill="#ffffff" font-family="Georgia, serif" font-size="26" font-weight="700">${line}</text>`
    )
    .join("");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420">
      <defs>
        <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${palette.backgroundStart}" />
          <stop offset="100%" stop-color="${palette.backgroundEnd}" />
        </linearGradient>
      </defs>
      <rect width="300" height="420" rx="24" fill="url(#${gradientId})" />
      ${patternMarkup}
      <rect x="22" y="22" width="256" height="376" rx="18" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
      <rect x="34" y="42" width="78" height="78" rx="18" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.22)" />
      <text x="52" y="94" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="700">${escapeXml(initials)}</text>
      <text x="34" y="148" fill="${palette.accent}" font-family="Arial, sans-serif" font-size="15" letter-spacing="2">${safeCategory}</text>
      ${accentMarkup}
      ${titleSvg}
      <text x="34" y="340" fill="${palette.line}" font-family="Arial, sans-serif" font-size="16">${safeAuthor}</text>
      <text x="34" y="372" fill="${palette.accent}" font-family="Arial, sans-serif" font-size="13" letter-spacing="1.5">CURATED EDITION</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getImageOverride(book = {}) {
  const title = (book?.title || "").trim().toLowerCase();
  const author = (book?.author || "").trim().toLowerCase();

  if (title === "rich dad poor dad" && author === "robert t. kiyosaki") {
    return "https://covers.openlibrary.org/b/isbn/9781612681139-L.jpg";
  }

  return null;
}

export function getBookImage(book) {
  const imageOverride = getImageOverride(book);

  if (imageOverride) {
    return imageOverride;
  }

  if (book?.image?.startsWith("data:image/") || book?.image?.startsWith("http")) {
    return book.image;
  }

  if (book?.coverImage?.startsWith("data:image/") || book?.coverImage?.startsWith("http")) {
    return book.coverImage;
  }

  return getFallbackBookImage(book);
}

export function formatPrice(price) {
  const amount = Number(price || 0);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function getUniqueBooks(books = []) {
  const seen = new Set();

  return books.filter((book) => {
    const key = `${(book?.title || "").trim().toLowerCase()}::${(book?.author || "").trim().toLowerCase()}`;

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}
