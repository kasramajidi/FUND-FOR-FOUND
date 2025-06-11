import Update from "./Update";
export default function UpdateAll() {
  return (
    <div className="flex flex-col items-start gap-12 mt-28 max-lg:gap-6 max-lg:mt-16 w-full px-4 md:px-6 lg:px-0 max-sm:gap-6 max-sm:mt-10">
      <div className="flex items-center gap-3 max-lg:gap-2">
        <div className="w-3 h-3 bg-[rgba(100,79,193,1)] max-lg:w-2 max-lg:h-2"></div>
        <span className="font-bold text-2xl max-lg:text-lg uppercase max-sm:text-base">
          update
        </span>
      </div>
      <Update/>
    </div>
  );
}
