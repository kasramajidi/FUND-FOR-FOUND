"use client";
import { useState } from "react";
import {
  FaInstagram,
  FaDiscord,
  FaGlobe,
  FaYoutube,
  FaTwitter,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import Contry from "./Contry";

const socialOptions = [
  { label: "Website", value: "website", icon: <FaGlobe /> },
  { label: "YouTube", value: "youtube", icon: <FaYoutube /> },
  { label: "Instagram", value: "instagram", icon: <FaInstagram /> },
  { label: "twitter", value: "twitter", icon: <FaTwitter /> },
  { label: "Discord", value: "discord", icon: <FaDiscord /> },
  { label: "WhatsApp", value: "whatsapp", icon: <FaWhatsapp /> },
  { label: "Telegram", value: "telegram", icon: <FaTelegram /> },
  { label: "Facebook", value: "facebook", icon: <FaFacebook /> },
  { label: "Linkedin", value: "linkedin", icon: <FaLinkedin /> },
];

export default function Info() {
  const [socials, setSocials] = useState([
    { type: "instagram", url: "http://instagram.com/wishwo" },
    { type: "discord", url: "http://Discord.com/wishwo" },
    { type: "website", url: "https://3f.com/" },
  ]);
  const [tags, setTags] = useState(["Product design", "design"]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag) => setTags(tags.filter((t) => t !== tag));

  const handleRemoveSocial = (idx) =>
    setSocials(socials.filter((_, i) => i !== idx));

  const handleAddSocial = () => {
    setSocials([...socials, { type: "website", url: "" }]);
  };

  return (
    <div className="max-w-5xl mx-auto w-full bg-white rounded-xl px-2 py-4 sm:px-8 sm:py-8">
      <h2 className="font-bold text-base sm:text-2xl text-[rgba(68,68,68,1)] mb-4 sm:mb-8 flex items-center gap-2">
        <span className="w-3 h-3 bg-[rgba(100,79,193,1)] inline-block"></span>
        Info
      </h2>
      <form className="flex flex-col gap-3 sm:gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Use the below code in your analyits for track your page
          </label>
          <input
            disabled
            className="w-full border border-[rgba(141,117,247,1)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(141,117,247,1)] text-sm"
            value="3F-5000021100F54SX57P001"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Link to your brand or organisation
          </label>
          <input
            className="w-full border border-[rgba(141,117,247,1)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(141,117,247,1)] text-sm"
            placeholder="http://fundforfound.com/brand/@chanelb"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Project title
            </label>
            <input
              className="w-full border border-[rgba(141,117,247,1)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(141,117,247,1)] text-sm"
              placeholder="Wish work"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Country</label>
            <Contry />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Project category
            </label>
            <input
              className="w-full border border-[rgba(141,117,247,1)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(141,117,247,1)] text-sm"
              placeholder="Wish work"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Project subcategory
            </label>
            <input
              className="w-full border border-[rgba(141,117,247,1)] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[rgba(141,117,247,1)] text-sm"
              placeholder="Wish work"
            />
          </div>
        </div>
        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-1">Project tags</label>
          <div className="flex flex-wrap gap-2 border border-[rgba(113,113,113,1)] rounded px-2 py-2 min-h-[44px]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-[rgba(231,231,231,1)] text-[rgba(113,113,113,1)] px-3 py-1 rounded flex items-center gap-1 text-xs"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-[rgba(113,113,113,1)] hover:text-red-500 cursor-pointer"
                >
                  &times;
                </button>
              </span>
            ))}
            <input
              className="flex-1 min-w-[100px] border-none outline-none text-xs"
              placeholder="Add tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? (e.preventDefault(), handleAddTag()) : null
              }
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="text-[#a084e8] px-2"
            >
              +
            </button>
          </div>
        </div>
        {/* Social Media */}
        <div>
          <label className="block text-sm font-medium mb-1">Social media</label>
          <div className="flex flex-col gap-2">
            {socials.map((s, idx) => {
              return (
                <div key={idx} className="flex gap-2 items-center">
                  <div className="w-36">
                    <select
                      className="w-full cursor-pointer flex items-center gap-2 border border-[#a084e8] rounded px-2 py-2 text-[rgba(149,149,149,1)] bg-[#f8f7fd]"
                      value={s.type}
                      onChange={(e) => {
                        const newSocials = [...socials];
                        newSocials[idx].type = e.target.value;
                        setSocials(newSocials);
                      }}
                    >
                      {socialOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    className="flex-1 border border-[#a084e8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#a084e8] text-sm"
                    value={s.url}
                    onChange={(e) => {
                      const newSocials = [...socials];
                      newSocials[idx].url = e.target.value;
                      setSocials(newSocials);
                    }}
                    placeholder="https://"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSocial(idx)}
                    className="text-[rgba(149,149,149,1)] hover:text-red-500 cursor-pointer text-xl px-2"
                  >
                    &times;
                  </button>
                </div>
              );
            })}
            {/* Add new social */}
            <div className="flex items-center mt-3 sm:mt-5">
              <button
                type="button"
                onClick={handleAddSocial}
                className=" text-[rgba(149,149,149,1)] cursor-pointer border border-[rgba(199,198,198,1)] rounded px-2 py-2 sm:px-3 sm:py-2 bg-[rgba(245,245,245,1)] hover:bg-[#ede9fe] transition text-xs sm:text-sm mx-auto"
              >
                + Add social link
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
