import React, { useReducer, useState } from "react";
import Image from "next/image";
import useUpdateTire from "./useUpdateTire";

const CLOUDINARY_CLOUD_NAME = "dkvbdk078";
const CLOUDINARY_UPLOAD_PRESET = "ml_default";

const initialState = {
  name: "",
  description: "",
  amount: "",
  tirCover: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_IMAGE":
      return { ...state, image: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const uploadToCloudinary = async (file) => {
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

interface OpenTireEditProps {
  brandId: number;
  tireId: number;
  onClose: () => void;
}

export default function OpenTireEdit({
  brandId,
  tireId,
  onClose,
}: OpenTireEditProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const updateTire = useUpdateTire(brandId, tireId);
  const [isUploading, setIsUploading] = useState(false);

  const handleSave = async () => {
    setIsUploading(true);
    let imageUrl = "";
    try {
      if (state.image) {
        imageUrl = await uploadToCloudinary(state.image);
      }
      const dataToSend = {
        name: state.name,
        discription: state.description,
        amount: state.amount,
        tirCover: imageUrl,
        brand: Number(brandId),
      };
      console.log("DEBUG: Data being sent to postTire.mutate", dataToSend);

      await updateTire.mutateAsync(dataToSend);
      setIsUploading(false);
      onClose();
      dispatch({ type: "RESET" });
    } catch {
      setIsUploading(false);
      alert("خطا در آپلود عکس یا ثبت اطلاعات");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-lg flex w-[900px] max-w-full min-h-[500px] relative">
        {/* فرم سمت چپ */}
        <div className="flex-1 p-8 flex flex-col shadow-2xl">
          <h2 className="text-xl font-bold text-[rgba(100,79,193,1)] mb-6 text-center">
            Tier type
          </h2>
          <label className="text-sm mb-1 text-gray-700">Name</label>
          <input
            className="border border-[rgba(141,117,247,1)] rounded-md px-3 py-2 mb-4"
            value={state.name}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "name",
                value: e.target.value,
              })
            }
            placeholder="Silver Sponsor"
          />
          <label className="text-sm mb-1 text-gray-700">
            Reward description
          </label>
          <textarea
            className="border border-[rgba(141,117,247,1)] text-xs rounded-md px-3 py-2 mb-4"
            value={state.description}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "description",
                value: e.target.value,
              })
            }
            placeholder="Join the guest list and be the first to know major updates about our project events. Plus, enjoy some digital gift card to be invited to the events."
            rows={3}
          />
          <label className="text-sm mb-1 text-gray-700">Amount</label>
          <input
            className="border border-[rgba(141,117,247,1)] rounded-md px-3 py-2 mb-4"
            value={state.amount}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "amount",
                value: e.target.value,
              })
            }
            placeholder="20 USD"
          />
          <label className="text-sm mb-1 text-gray-700">Add cover photo</label>
          <div className="mb-6">
            <label className="  w-[192px] h-[120px] bg-[rgba(237,233,254,1)] rounded-lg flex items-center justify-center cursor-pointer">
              {state.image ? (
                <Image
                  src={URL.createObjectURL(state.image)}
                  alt="cover"
                  className="w-full h-full object-cover rounded-lg"
                  width={192}
                  height={120}
                />
              ) : (
                <span className="text-4xl text-white">+</span>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    dispatch({ type: "SET_IMAGE", value: e.target.files[0] });
                  }
                }}
              />
            </label>
          </div>
          <div className="flex gap-4 mt-auto">
            <button
              className="px-6 py-2 rounded-md border cursor-pointer border-[rgba(100,79,193,1)] text-[rgba(100,79,193,1)] bg-[rgba(237,233,254,1)]"
              onClick={() => dispatch({ type: "RESET" })}
            >
              Delete
            </button>
            <button
              className="px-6 py-2 rounded-md cursor-pointer bg-purple-600 text-white"
              onClick={handleSave}
              disabled={updateTire.isPending || isUploading}
            >
              {updateTire.isPending || isUploading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
        {/* پیش‌نمایش سمت راست */}
        <div className="flex-1  rounded-r-2xl  p-8 flex flex-col items-center">
          <h2 className="text-xl font-bold text-[rgba(100,79,193,1)] mb-4 text-center">
            Preview
          </h2>
          <div className="w-[260px] bg-white rounded-lg shadow p-4">
            <div className="bg-[rgba(100,79,193,1)] text-white rounded-t-lg text-center py-2 font-bold">
              {state.name || "Silver Sponsor"}
            </div>
            <div className="text-center mt-4 text-gray-700 font-semibold">
              You are on the list
            </div>
            <div className="flex justify-center my-4">
              {state.image ? (
                <Image
                  src={URL.createObjectURL(state.image)}
                  alt="cover"
                  className="w-[192px] h-[120px] object-cover rounded-lg"
                  width={192}
                  height={120}
                />
              ) : (
                <div className="bg-[rgba(237,233,254,1)] text-[rgba(215,207,249,1)] font-bold text-xl rounded-lg flex items-center justify-center w-[192px] h-[120px]">
                  {state.name || "Bronze Sponsor"}
                </div>
              )}
            </div>
            <div className="text-sm mt-2">
              Start at{" "}
              <span className="text-[rgba(100,79,193,1)] font-bold">
                {state.amount || "20"}$
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {state.description ||
                "Join the guest list and be the first to know major updates about our project events. Plus, enjoy some digital gift card to be invited to the events."}
            </div>
            <button className="w-full bg-[rgba(100,79,193,1)] text-white rounded-md py-2 mt-4">
              Contribute
            </button>
          </div>
        </div>
        {/* دکمه بستن */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-700 cursor-pointer text-2xl"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}
