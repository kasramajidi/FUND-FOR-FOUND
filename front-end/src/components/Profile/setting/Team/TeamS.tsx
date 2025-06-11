import Team from "@/components/Profile/MenuProfile/Team/Team";

export default function TeamS() {
  return (
    <div className="flex flex-col items-start gap-8 max-lg:gap-6 max-lg:mt-16 w-full px-4 md:px-6 lg:px-0">
      <div className="flex items-center gap-3 max-lg:gap-2">
        <div className="w-3 h-3 bg-[rgba(100,79,193,1)] max-lg:w-2 max-lg:h-2"></div>
        <span className="font-bold text-2xl max-lg:text-lg">TEAM</span>
      </div>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed w-full max-w-4xl">
        <span className="font-bold">Admins</span> can edit settings, approve
        expenses, and receive activity notifications (such as when a new expense
        is submitted). They are the active managers of a Collective.
      </p>
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed w-full max-w-4xl">
        <span className="font-bold">Teammate</span> are shown as part of the
        team on your page but do not have admin access or get notifications.
        They have profile page on the platform.
      </p>
      <Team />
    </div>
  );
}
