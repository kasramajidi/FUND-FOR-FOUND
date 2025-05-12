"use client";
import { useState } from "react";
import {
  FaGlobe,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaDiscord,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaLinkedin,
  FaPen,
} from "react-icons/fa";
import useGetCover from "../backGround/useGetCover";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import ModalCommunication from "./ModalCommunication";
const ICON_MAP = {
  FaGlobe,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaDiscord,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaLinkedin,
};

interface CommunicationItem {
  label: string;
  value: string;
  icon: string;
  placeholder: string;
  input: string;
}

export default function Communication() {
  const { brandId } = useParams<{ brandId: string }>();
  const { data, mutate: getCover } = useGetCover();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (brandId) {
      getCover(brandId);
    }
  }, [brandId, getCover]);

  const communications: CommunicationItem[] = Array.isArray(data?.Communication)
    ? (data.Communication as unknown[]).filter(
        (item): item is CommunicationItem =>
          !!item && typeof item === "object" && "icon" in item
      )
    : [];

  return (
    <div className="flex items-center lg:gap-5 gap-2 lg:ml-36 ml-[85px]">
      <div className="grid grid-cols-4 gap-2 lg:flex lg:gap-4">
        {communications.map((item, idx) => {
          const IconComponent = ICON_MAP[item.icon];
          return (
            <span key={idx}>
              {IconComponent ? (
                <Link href={item.input}>
                  <IconComponent size={16} color="#A3A3A3" />
                </Link>
              ) : (
                <span></span>
              )}
            </span>
          );
        })}
      </div>
      <button
        className="hidden lg:flex items-center gap-2 px-4 py-2 cursor-pointer border border-purple-200 rounded-lg text-[rgba(100,79,193,1)] bg-[rgba(247,245,255,1)] hover:bg-purple-100 transition"
        onClick={() => setOpenModal(true)}
      >
        <FaPen size={11} />
        Edit
      </button>
      <FaPen
        size={20}
        onClick={() => setOpenModal(true)}
        className="lg:hidden block text-[rgba(100,79,193,1)]"
      />

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center py-10 justify-center min-h-screen bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-[95%] max-w-xs sm:w-full sm:max-w-md lg:max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">
              Help your contributors find you faster
            </h2>
            <ModalCommunication
              brandId={Number(brandId)}
              data={{
                Communication: Array.isArray(data?.Communication)
                  ? data.Communication.map((item) =>
                      typeof item === "string"
                        ? {
                            label: item,
                            value: item,
                            icon: "",
                            placeholder: "",
                            input: "",
                          }
                        : item
                    )
                  : [],
              }}
              onClose={() => setOpenModal(false)}
              onRefresh={() => getCover(brandId)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
