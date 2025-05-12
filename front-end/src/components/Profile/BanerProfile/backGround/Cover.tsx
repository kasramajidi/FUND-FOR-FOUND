"use client";
import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";
import useGetCover from "./useGetCover";
import { useParams } from "next/navigation";
import { AiFillPicture } from "react-icons/ai";
import axios from "axios";

const CLOUDINARY_CLOUD_NAME = "dkvbdk078";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

export default function Cover() {
  const { brandId } = useParams<{ brandId: string }>();
  const { data, mutate: getCover } = useGetCover();
  const [openModal, setOpenModal] = useState(false);
  const [zoom, setZoom] = useState(1);
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
        setZoom(1);
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
        await axios.put(`http://localhost:1337/api/brands/${brandId}`, {
          data: { cover: imageUrl },
        });
        setOpenModal(false);
        getCover(brandId);
      } catch {
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setZoom(1);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex relative justify-between items-center">
        <div className="flex items-center w-full">
          {data?.cover ? (
            <Image
              src={data.cover}
              alt="cover"
              width={1440}
              height={400}
              className="w-full h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px]"
            />
          ) : (
            <Image
              src="https://res.cloudinary.com/dkvbdk078/image/upload/v1745930972/Group_n9wcgf.png"
              alt="logo"
              width={1440}
              height={400}
              className="w-full h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px]"
            />
          )}
        </div>
        <button
          className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 flex items-center text-[10px] sm:text-xs py-[8px] sm:py-[10px] px-[10px] sm:px-[12px] rounded-lg cursor-pointer gap-1 border text-[rgba(100,79,193,1)] bg-[rgba(237,233,254,1)] hover:bg-[rgba(237,233,254,0.75)] border-[rgba(170,153,236,1)]"
          onClick={() => setOpenModal(true)}
        >
          <MdModeEdit /> Edit cover
        </button>
      </div>
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 w-[95%] sm:w-[90%] md:w-[80%] lg:max-w-2xl relative">
            <button
              className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-red-500 text-xl sm:text-2xl"
              onClick={() => setOpenModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
              Add cover image
            </h2>
            <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] bg-gray-100 flex items-center justify-center rounded mb-4 sm:mb-6 overflow-hidden">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="preview"
                  width={1440}
                  height={400}
                  style={{
                    transform: `scale(${zoom})`,
                    transition: "transform 0.2s",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              ) : (
                <span className="text-lg sm:text-xl lg:text-2xl text-gray-400">
                  Brand or Organisation
                </span>
              )}
            </div>
            <div className="flex items-center w-full px-2 sm:px-3 mb-4">
              <span className="text-gray-400 mr-2">
                <AiFillPicture />
              </span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 accent-[rgba(141,117,247,1)] bg-transparent range-track:bg-[rgba(237,233,254,1)]"
                disabled={!selectedImage}
              />
              <span className="text-gray-400 ml-2 text-lg sm:text-xl">
                <AiFillPicture />
              </span>
            </div>
            <p className="hidden lg:block text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-4">
              Maximum File Size: 5 MB
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
              <label className="w-full mt-4 lg:mt-0 sm:w-auto px-4 sm:px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md cursor-pointer text-center">
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
  );
}
