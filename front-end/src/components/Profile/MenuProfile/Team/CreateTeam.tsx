import React, { useReducer, useState } from "react";
import usePostTeam from "./usePostTeam";

const initialState = {
  name: "",
  role: "Teammate",
  description: "",
  email: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function CreateTeam({ onClose }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const postTeam = usePostTeam();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: state.name,
      description: state.description,
      role: state.role,
      email: state.email,
    };
    console.log("Sending data:", data);
    try {
      await postTeam.mutateAsync(data);
      setShowSuccess(true);
    } catch (error) {
      console.error("Submit error:", error);
      alert(error.message || "خطا در ثبت اطلاعات");
    }
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#575757]/70 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-[350px] flex flex-col items-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-16 h-16 text-[rgba(215,207,249,1)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="rgba(215,207,249,1)"
                strokeWidth="2"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12l2.5 2.5L16 9"
                stroke="rgba(215,207,249,1)"
              />
            </svg>
          </div>
          <div className="text-center text-gray-700 mb-2">
            We have sent an invitation email to
          </div>
          <div className="text-center text-[rgba(100,79,193,1)] font-semibold text-lg mb-6">
            {state.name || state.email}
          </div>
          <hr className="w-full mb-4 border-[rgba(231,231,231,1)]" />
          <button
            className="text-[rgba(100,79,193,1)] cursor-pointer hover:underline text-base font-medium focus:outline-none"
            onClick={onClose}
          >
            ok, continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#575757]/70 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 w-[98%] sm:w-[95%] md:w-[85%] lg:w-[75%] xl:w-[65%] max-h-[90vh] overflow-y-auto relative max-lg:p-2 max-lg:w-[95%] flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg p-3 sm:p-4 md:p-6 shadow-md border border-[rgba(231,231,231,1)]">
          <h2 className="text-center text-xl font-semibold mb-6 border-b-2 border-[rgba(231,231,231,1)] pb-2">
            Invite team member
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                className="w-full border border-[#8d75f7] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8d75f7]"
                value={state.name}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "name",
                    value: e.target.value,
                  })
                }
                type="text"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Role</label>
              <select
                className="w-full border text-[rgba(149,149,149,1)] cursor-pointer border-[#8d75f7] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8d75f7]"
                value={state.role}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "role",
                    value: e.target.value,
                  })
                }
              >
                <option value="Teammate">Teammate</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">description</label>
              <textarea
                className="w-full border border-[#8d75f7] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8d75f7] break-words whitespace-pre-line break-all"
                value={state.description}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "description",
                    value: e.target.value,
                  })
                }
                rows={3}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email address</label>
              <input
                className="w-full border border-[#8d75f7] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8d75f7]"
                value={state.email}
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "email",
                    value: e.target.value,
                  })
                }
                type="email"
                placeholder="e.g.yourname@yahoo.com"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                type="button"
                className="px-6 py-2 rounded border border-[rgba(170,153,236,1)] cursor-pointer text-[rgba(100,79,193,1)] bg-[rgba(237,233,254,1)] hover:bg-[#f3f0ff]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded bg-[rgba(100,79,193,1)] cursor-pointer text-white font-semibold hover:bg-[rgba(100,79,193,0.8)]"
              >
                invite user
              </button>
            </div>
          </form>
        </div>
        <div className="w-full sm:w-[350px] min-w-0 sm:min-w-[300px] mt-6 lg:mt-0 bg-white border border-[rgba(231,231,231,1)] rounded-lg p-3 sm:p-6 shadow-md flex flex-col items-center">
          <h2 className="text-center w-full text-xl font-semibold mb-6 border-b-2 border-[rgba(231,231,231,1)] pb-2">
            Preview
          </h2>
          <div className="w-full flex flex-col items-center border rounded-lg border-[rgba(199,198,198,1)]">
            <div className="w-20 h-20 sm:w-[120px] sm:h-[120px] rounded-full bg-[#ede9fe] flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 sm:w-16 sm:h-16 text-[#c4b5fd]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                />
              </svg>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {state.name || "Name"}
              </div>
              <div className="inline-block mt-1 px-3 py-1 rounded-full   bg-[rgba(231,231,231,1)] text-[rgba(113,113,113,1)] text-xs font-medium">
                {state.role}
              </div>
              <div className="mt-3 text-gray-500 text-sm w-full max-w-full max-h-24 overflow-y-auto break-words whitespace-pre-line break-all">
                {state.description ||
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. orem Ipsum has been the industry's standard dummy text ever since the 1500s."}
                <span className="text-[#8d75f7] cursor-pointer ml-1">
                  Read more
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col justify-between gap-5 mt-6 bg-[rgba(231,231,231,1)] rounded-lg px-4 py-2 text-sm">
              <div className="flex items-center justify-between border-b pb-3.5 border-[rgba(199,198,198,1)]">
                <div className="text-gray-500">Created</div>
                <div className="font-semibold">1 brands</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-500">Contributed</div>
                <div className="font-semibold">0 brands</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
