"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import useGetCover from "../backGround/useGetCover";
import Image from "next/image";
import axios from "axios";

const CLOUDINARY_CLOUD_NAME = "dkvbdk078";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

export default function LogoProfile() {
  const { brandId } = useParams<{ brandId: string }>();
  const { data, mutate: getCover } = useGetCover();
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (brandId) {
      getCover(brandId);
    }
  }, [brandId, getCover]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setSelectedImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    if (!res.ok) {
      const errorText = await res.text();
      alert("Cloudinary upload failed: " + errorText);
      throw new Error("Cloudinary upload failed: " + errorText);
    }
    const data = await res.json();
    return data.secure_url;
  };

  const handleSave = async () => {
    if (brandId && selectedFile) {
      setIsLoading(true);
      try {
        const imageUrl = await uploadToCloudinary(selectedFile);
        await axios.put(
          `https://fund-for-found-u0xg.onrender.com/api/brands/${brandId}`,
          {
            data: { pictureProfile: imageUrl },
          }
        );
        setOpenModal(false);
        setSelectedFile(null);
        setSelectedImage(null);
        getCover(brandId);
      } catch {
        // error handled by alert
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedFile(null);
  };

  const profileImage = data?.pictureProfile;

  return (
    <div className="absolute lg:mb-10 -mb-2 ml-3.5 lg:ml-0 flex flex-col">
      <div className="flex items-center justify-center lg:w-32 lg:h-32 w-16 h-16 bg-[rgba(100,79,193,1)] rounded-lg">
        <div className="relative flex items-center justify-center">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="profile"
              width={128}
              height={128}
              className="rounded-lg object-cover lg:w-32 lg:h-32 w-16 h-16"
            />
          ) : data?.brand ? (
            <span className="text-[rgba(141,117,247,0.2)] lg:text-7xl text-4xl font-black">
              {data.brand.charAt(0).toUpperCase()}
            </span>
          ) : null}
          <button
            className="absolute z-50 lg:text-xs text-[6px] lg:w-[90px] lg:h-[35px] w-[54px] h-[21px] cursor-pointer hover:bg-[rgba(215,207,249,0.7)] text-[rgba(255,255,255,0.8)] rounded-lg px-2.5 py-3 bg-[rgba(215,207,249,0.3)] flex items-center justify-center"
            onClick={() => setOpenModal(true)}
          >
            Edit Profile
          </button>
        </div>
        {openModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-[95%] max-w-xs sm:w-full sm:max-w-md lg:max-w-2xl relative">
              <button
                className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-red-500 text-xl sm:text-2xl"
                onClick={() => setOpenModal(false)}
              >
                ×
              </button>
              <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center">
                Edit Profile
              </h2>
              <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto bg-[rgba(100,79,193,1)] flex items-center justify-center rounded mb-4 sm:mb-6 overflow-hidden">
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="preview"
                    width={128}
                    height={128}
                    className="rounded-lg object-cover w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
                  />
                ) : profileImage ? (
                  <Image
                    src={profileImage}
                    alt="profile"
                    width={128}
                    height={128}
                    className="rounded-lg object-cover w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
                  />
                ) : data?.brand ? (
                  <span className="text-[rgba(141,117,247,0.2)] text-4xl sm:text-6xl lg:text-7xl font-black">
                    {data.brand.charAt(0).toUpperCase()}
                  </span>
                ) : null}
              </div>
              <p className="hidden lg:block text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-4">
                Maximum File Size: 5 MB
                <br />
                Minimum Dimensions: 150*150 pixels
                <br />
                Recommended Size: 400*400 pixels(800*800 for high resolution)
                <br />
                Accepted Formats: JPG, PNG
              </p>
              <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 mt-4">
                <div className="flex lg:flex-row flex-col lg:gap-2 gap-5">
                  <button
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[rgba(100,79,193,1)] text-white rounded-md cursor-pointer hover:bg-[rgba(100,50,193,1)]"
                    disabled={isLoading || !selectedImage}
                    onClick={handleSave}
                  >
                    {isLoading ? "Saving..." : "save"}
                  </button>
                  <button
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md cursor-pointer"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
                <label className="w-full sm:w-auto mt-4 lg:mt-0 px-4 sm:px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md cursor-pointer text-center">
                  Upload new image
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      <span className="text-[rgba(45,45,45,1)] lg:text-2xl text-xs mt-1 font-bold text-center">
        {data?.brand}
      </span>
    </div>
  );
}
