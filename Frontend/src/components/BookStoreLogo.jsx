function BookStoreLogo() {
  return (
    <div className="brand-logo" aria-label="BookStore logo">
      <svg
        className="brand-logo-mark"
        viewBox="0 0 64 64"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bookstoreLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f6ead4" />
            <stop offset="100%" stopColor="#c89a56" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="27" fill="#10233d" />
        <circle cx="32" cy="32" r="23" fill="none" stroke="#d7b98b" strokeWidth="1.8" />
        <path d="M21 20h17a5 5 0 0 1 5 5v18a4 4 0 0 1-4 4H25a7 7 0 0 0-7 7V25a5 5 0 0 1 5-5Z" fill="url(#bookstoreLogoGradient)" />
        <path d="M31 20v27" stroke="#10233d" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M23.5 27h13M23.5 33h13M23.5 39h9" stroke="#10233d" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 16c5.5 3.6 9.4 3.6 15 0" stroke="#d7b98b" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M33 16c5.5 3.6 9.4 3.6 15 0" stroke="#d7b98b" strokeWidth="1.8" strokeLinecap="round" />
      </svg>

      <div className="brand-logo-text">
        <span className="brand-logo-title">BookStore</span>
        <span className="brand-logo-tagline">Curated Reading House</span>
      </div>
    </div>
  );
}

export default BookStoreLogo;
