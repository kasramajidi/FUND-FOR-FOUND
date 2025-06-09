import React, { useState } from "react";
import useGetIndividual from "./useGetIndividual";

export default function Individual() {
  const defaultIndividuals = [
    { name: "Nasim shahbazi" },
    { name: "Nasim shahbazi" },
    { name: "Nasim shahbazi" },
    { name: "Nasim shahbazi" },
    { name: "Ali Ahmadi" },
  ];

  const { data, error } = useGetIndividual();

  let apiIndividuals = [];
  if (!error && data && Array.isArray(data.data) && data.data.length > 0) {
    apiIndividuals = data.data.map((item) => ({
      name: item.attributes?.name || "No Name",
    }));
  }

  const individuals =
    apiIndividuals.length > 0 ? apiIndividuals : defaultIndividuals;

  const [showAll, setShowAll] = useState(false);
  const visibleIndividuals = showAll ? individuals : individuals.slice(0, 4);

  return (
    <div className="w-full flex flex-col items-center px-3 sm:px-4 md:px-6 lg:px-0 gap-12 mt-28 max-lg:gap-6 max-lg:mt-16">
      <div className="flex self-start items-center gap-3 max-lg:gap-2">
        <div className="w-3 h-3 bg-[rgba(100,79,193,1)] max-lg:w-2 max-lg:h-2"></div>
        <span className="font-bold text-2xl max-lg:text-lg uppercase">
          top backers & contributors
        </span>
      </div>
      <span className="text-xl font-bold self-start">Individual</span>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {visibleIndividuals.map((person, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-3xl border-6 border-[rgba(100,79,193,1)] bg-[rgba(231,231,231,1)] mb-2"></div>
            <div className="text-sm text-[rgba(68,68,68,1)]">{person.name}</div>
          </div>
        ))}
      </div>
      {individuals.length > 4 && (
        <button
          className="mt-8 px-6 py-2 cursor-pointer rounded border border-[#d6c7f7] bg-white text-[#8d75f7] font-medium hover:bg-[#f3f0ff] transition"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show less" : "View all"}
        </button>
      )}
      <span className="text-xl font-bold self-start">
        Brand or organization
      </span>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {visibleIndividuals.map((person, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-3xl border-6 border-[rgba(100,79,193,1)] bg-[rgba(231,231,231,1)] mb-2"></div>
            <div className="text-sm text-[rgba(68,68,68,1)]">{person.name}</div>
          </div>
        ))}
      </div>
      {individuals.length > 4 && (
        <button
          className="mt-8 px-6 py-2 cursor-pointer rounded border border-[#d6c7f7] bg-white text-[#8d75f7] font-medium hover:bg-[#f3f0ff] transition"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Show less" : "View all"}
        </button>
      )}
    </div>
  );
}
