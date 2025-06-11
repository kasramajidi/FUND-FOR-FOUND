import React, { useEffect } from "react";
import useGetUser from "./useGetContribution";

export default function Contribution() {
  const { data: brands, isLoading, isError, error, mutate } = useGetUser();

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isLoading) {
    return <div className="text-center py-8">Loading contributions...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error?.message || "Failed to load contributions"}
      </div>
    );
  }

  if (!brands || brands.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No contributions found.
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-4 md:px-6 lg:px-0 mt-28 max-lg:mt-16">
      <div className="flex items-center gap-3 max-lg:gap-2 mb-12 max-lg:mb-6">
        <div className="w-3 h-3 bg-[rgba(100,79,193,1)] max-lg:w-2 max-lg:h-2"></div>
        <span className="font-bold text-2xl max-lg:text-lg">Contributions</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="bg-black h-48 flex items-center justify-center">
              {/* Placeholder for brand logo/image */}
              {brand.logo ? (
                <img
                  src={brand.logo.url}
                  alt={brand.brand}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="text-white text-3xl font-bold">
                  {brand.brand || "No Logo"}
                </span>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 capitalize">
                {brand.brand}{" "}
                <span className="text-gray-500 text-sm font-normal">
                  based in {brand.country || "N/A"}
                </span>
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {brand.description ||
                  "A Foundation for Easy to Develop & Deploy Web Apps."}
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-gray-700 text-sm font-semibold">
                  {brand.financialContributors || 0} Financial Contributors
                </p>
                <p className="text-gray-700 text-lg font-bold mt-1">
                  $
                  {brand.moneyRaised ? brand.moneyRaised.toLocaleString() : "0"}{" "}
                  Money raised
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
