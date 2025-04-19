import React, { useState, KeyboardEvent, ChangeEvent } from "react";

interface SearchProps {
  className?: string;
}

export default function Search({ className }: SearchProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      console.log("Searching for:", searchValue);
      setSearchValue("");
      setIsOpen(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={`relative ${className || ""}`}>
      {/* Desktop Search */}
      <div className="hidden md:flex bg-white shadow-lg items-center border border-[#E7E7E7] py-2.5 px-2.5 rounded-lg gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
            stroke="#959595"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 17.5L13.875 13.875"
            stroke="#959595"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          placeholder="Search brand, category, tag or..."
          className="text-[#959595] text-sm focus:outline-none focus:border-none"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleSearch}
        />
      </div>

      {/* Mobile Search */}
      <div className="md:hidden flex items-center">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center"
            type="button"
            aria-label="Open search"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                stroke="#644FC1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.5 17.5L13.875 13.875"
                stroke="#644FC1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          <div className="flex items-center bg-white rounded-lg border border-[#E7E7E7] py-1.5 px-2 w-32">
            <input
              type="text"
              placeholder="Search..."
              className="w-full text-[#959595] text-lg focus:outline-none focus:border-none"
              value={searchValue}
              onChange={handleChange}
              onKeyDown={handleSearch}
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}
