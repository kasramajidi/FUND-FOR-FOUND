import Tire from "@/components/Profile/MenuProfile/ContributionTier/Tire";
import { useParams } from "next/navigation";
export default function ContributionTiers() {
  const params = useParams();
  const brandId = Number(params?.brandId);
  return (
    <div className="flex flex-col items-start gap-8 max-lg:gap-6 max-lg:mt-16 w-full px-4 md:px-6 lg:px-0">
      <div className="flex items-center gap-3 max-lg:gap-2">
        <div className="w-3 h-3 bg-[rgba(100,79,193,1)] max-lg:w-2 max-lg:h-2"></div>
        <span className="font-bold text-2xl max-lg:text-lg">
          Contribution Tier
        </span>
      </div>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed w-full max-w-6xl">
        Most creator offer 3-6 reward tier which can be physical item or special
        experiences. make sure to set reasonable contributor expectation.
      </p>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed w-full max-w-2xl">
        Remember each contributor can choose a recurring or One time payment.
      </p>
      <Tire brandId={brandId} />
    </div>
  );
}
