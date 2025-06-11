import Update from "@/components/Profile/MenuProfile/Update/Update";

export default function UpdateS() {
  return (
    <div className="flex flex-col items-start gap-8 max-lg:gap-6 max-lg:mt-16 w-full px-4 md:px-6 lg:px-0">
      <div className="flex items-center gap-3 max-lg:gap-2">
        <div className="w-3 h-3 bg-[rgba(100,79,193,1)] max-lg:w-2 max-lg:h-2"></div>
        <span className="font-bold text-2xl max-lg:text-lg">UPDATES</span>
      </div>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed w-full max-w-6xl">
        The updated content will be synced to social platforms such as YouTube,
        Discord, Instagram, and more. Whenever you share updates there, they
        will automatically appear here as well.
      </p>
      <Update />
    </div>
  );
}
