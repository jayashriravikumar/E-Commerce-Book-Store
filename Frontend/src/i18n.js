import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Home: "Home",
      Products: "Products",
      AboutUs: "About Us",
      ContactUs: "Contact Us",
      Policies: "Policies",
      Wishlist: "Wishlist",
      Cart: "Cart",
      shopNow: "Shop Now",
viewDetails: "View Details",
latestCollections: "Latest Collections",
searchProduct: "Search Product",
    },
  },

  te: {
    translation: {
      Home: "హోమ్",
      Products: "ఉత్పత్తులు",
      AboutUs: "మా గురించి",
      ContactUs: "సంప్రదించండి",
      Policies: "విధానాలు",
      Wishlist: "విష్‌లిస్ట్",
      Cart: "కార్ట్",
      shopNow: "ఇప్పుడు కొనండి",
viewDetails: "వివరాలు చూడండి",
latestCollections: "తాజా సేకరణలు",
searchProduct: "పుస్తకాలను వెతకండి",
    },
  },

  hi: {
    translation: {
      Home: "होम",
      Products: "उत्पाद",
      AboutUs: "हमारे बारे में",
      ContactUs: "संपर्क करें",
      Policies: "नीतियां",
      Wishlist: "विशलिस्ट",
      Cart: "कार्ट",
      shopNow: "अभी खरीदें",
viewDetails: "विवरण देखें",
latestCollections: "नवीनतम संग्रह",
searchProduct: "पुस्तक खोजें",
    },
  },

  ta: {
    translation: {
      Home: "முகப்பு",
      Products: "பொருட்கள்",
      AboutUs: "எங்களை பற்றி",
      ContactUs: "தொடர்பு",
      Policies: "கொள்கைகள்",
      Wishlist: "விருப்ப பட்டியல்",
      Cart: "வண்டி",
      shopNow: "இப்போது வாங்கவும்",
viewDetails: "விவரங்களை காண்க",
latestCollections: "சமீபத்திய தொகுப்புகள்",
searchProduct: "புத்தகத்தை தேடவும்",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;