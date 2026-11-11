import { FaWhatsapp, FaFacebook, FaTwitter, FaLink } from "react-icons/fa";
import toast from "react-hot-toast";

const SocialShare = ({ product }) => {
  const currentUrl = window.location.href;

  const shareText = `Check out this book: ${product?.name}`;

  const whatsappShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(
        `${shareText} ${currentUrl}`
      )}`,
      "_blank"
    );
  };

  const facebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      "_blank"
    );
  };

  const twitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast.success("Product link copied!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">
        Share this Book
      </h3>

      <div className="flex gap-4">
        <button
          onClick={whatsappShare}
          className="bg-green-500 text-white p-3 rounded-full hover:scale-110 transition"
          title="Share on WhatsApp"
        >
          <FaWhatsapp size={22} />
        </button>

        <button
          onClick={facebookShare}
          className="bg-blue-600 text-white p-3 rounded-full hover:scale-110 transition"
          title="Share on Facebook"
        >
          <FaFacebook size={22} />
        </button>

        <button
          onClick={twitterShare}
          className="bg-black text-white p-3 rounded-full hover:scale-110 transition"
          title="Share on Twitter"
        >
          <FaTwitter size={22} />
        </button>

        <button
          onClick={copyLink}
          className="bg-gray-700 text-white p-3 rounded-full hover:scale-110 transition"
          title="Copy Product Link"
        >
          <FaLink size={20} />
        </button>
      </div>
    </div>
  );
};

export default SocialShare;