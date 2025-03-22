import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const ShareButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const urlToShare = "https://your-website-link.com";

  const shareOptions = [
    {
      name: "Facebook",
      icon: <Facebook />,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        urlToShare
      )}`,
    },
    {
      name: "Twitter / X",
      icon: <Twitter />,
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        urlToShare
      )}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        urlToShare
      )}`,
    },
    {
      name: "WhatsApp",
      icon: <img src="/whatsapp-icon.png" className="w-5 h-5 inline" />,
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        urlToShare
      )}`,
    },
    {
      name: "Copy Link",
      icon: <Copy />,
      action: () => navigator.clipboard.writeText(urlToShare),
    },
  ];

  return (
    <div className="relative">
      <Button onClick={() => setShowOptions(!showOptions)}>Share</Button>

      {showOptions && (
        <div className="absolute bg-white shadow-lg rounded-lg p-4 mt-2 w-64 z-50">
          {shareOptions.map((option, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-3">
              {option.link ? (
                <a
                  href={option.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {option.icon}
                  {option.name}
                </a>
              ) : (
                <button
                  onClick={option.action}
                  className="flex items-center gap-2 w-full"
                >
                  {option.icon}
                  {option.name}
                </button>
              )}
            </div>
          ))}
          {/* Instagram Story Note */}
          <div className="text-sm text-gray-500 mt-2">
            Instagram Stories require manual upload. <br />
            <a
              href={urlToShare}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Open site to screenshot/share.
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
