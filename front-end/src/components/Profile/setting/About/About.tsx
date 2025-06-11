import Edit from "@/components/Profile/MenuProfile/About/Edit";
export default function About() {
  return (
    <div className="flex flex-col items-start gap-8 max-lg:gap-6 max-lg:mt-16 w-full px-4 md:px-6 lg:px-0">
      <div className="flex items-center gap-3 max-lg:gap-2">
        <div className="w-3 h-3 bg-[rgba(100,79,193,1)] max-lg:w-2 max-lg:h-2"></div>
        <span className="font-bold text-2xl max-lg:text-lg">About</span>
      </div>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed w-full max-w-4xl">
        Tell people why they should be excited for backing your brand. tell
        about your story, your plan and any thing that may encourage them to
        contribute.
      </p>  
      <Edit />
    </div>
  );
}
