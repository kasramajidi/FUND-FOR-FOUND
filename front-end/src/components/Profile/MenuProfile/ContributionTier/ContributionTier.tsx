import Tire from "./Tire";
import { useParams } from "next/navigation";

export default function ContributionTier() {
  const params = useParams();
  const brandId = params?.brandId;
  return (
    <div className="flex flex-col items-start gap-12">
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-[rgba(100,79,193,1)]"></div>
        <span className="font-bold text-2xl">Contribution Tier</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-[rgba(100,79,193,1)] h-[20px] w-[3px]"></div>
        <span className="">Recurring or One time</span>
      </div>
      <Tire brandId={brandId} />
    </div>
  );
}
