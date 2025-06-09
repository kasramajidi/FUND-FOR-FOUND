import { useState } from "react";
import CreateTeam from "./CreateTeam";
import EditTeam from "./EditTeam";
import useGetTeam from "./useGetTeam";
import { MdEdit } from "react-icons/md";
export default function Team() {
  const [isCreateTeam, setIsCreateTeam] = useState(false);
  const [isEditTeam, setIsEditTeam] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { data } = useGetTeam();

  let teams = [];
  if (data && Array.isArray(data.data)) {
    teams = data.data.map((item) => ({
      ...item,
    }));
  }

  return (
    <div className="flex flex-col items-start gap-12 mt-28 max-lg:gap-6 max-lg:mt-16 w-full px-4 md:px-6 lg:px-0">
      <div className="flex items-center gap-3 max-lg:gap-2">
        <div className="w-3 h-3 bg-[rgba(100,79,193,1)] max-lg:w-2 max-lg:h-2"></div>
        <span className="font-bold text-2xl max-lg:text-lg">Team</span>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(!teams || teams.length === 0) && (
          <div className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-64 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[439px] border border-gray-300 rounded-lg mx-auto">
            <span className="text-[rgba(68,68,68,1)] text-lg mb-4">
              Invite team member
            </span>
            <button
              onClick={() => setIsCreateTeam(true)}
              className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 bg-[rgba(100,79,193,1)] hover:bg-[rgba(100,79,193,0.8)] cursor-pointer rounded-xl"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </button>
          </div>
        )}
        {teams && teams.length > 0 && (
          <>
            {teams.map((team) => (
              <div
                key={team.id}
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-full flex flex-col items-center justify-between pt-5 border rounded-lg border-[rgba(199,198,198,1)] relative"
              >
                <button
                  className="absolute top-3 right-3 p-1 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                  title="Edit"
                  onClick={() => {
                    setSelectedTeam(team);
                    setIsEditTeam(true);
                  }}
                >
                  <MdEdit className="text-[rgba(113,113,113,1)] text-2xl" />
                </button>
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[120px] lg:h-[120px] rounded-lg bg-[#ede9fe] flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 sm:w-14 sm:h-14 text-[#c4b5fd]"
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
                  <div className="text-base sm:text-lg md:text-xl lg:text-lg font-semibold">
                    {team.name}
                  </div>
                  <div className="inline-block mt-1 px-3 py-1 rounded-full bg-[rgba(231,231,231,1)] text-[rgba(113,113,113,1)] text-xs font-medium">
                    {team.role}
                  </div>
                  <div className="mt-3 text-gray-500 text-xs sm:text-sm md:text-base lg:text-sm w-full max-w-full max-h-24 overflow-y-auto break-words whitespace-pre-line break-all">
                    {team.discription}
                    <span className="text-[#8d75f7] cursor-pointer ml-1">
                      Read more
                    </span>
                  </div>
                </div>
                <div className="w-full flex flex-col justify-between gap-5 mt-6 bg-[rgba(231,231,231,1)] rounded-lg px-2 sm:px-4 py-2 text-xs sm:text-sm">
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
            ))}
            <div className="flex flex-col items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-64 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[439px] border border-gray-300 rounded-lg">
              <span className="text-[rgba(68,68,68,1)] text-lg mb-4">
                Invite team member
              </span>
              <button
                onClick={() => setIsCreateTeam(true)}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 bg-[rgba(100,79,193,1)] hover:bg-[rgba(100,79,193,0.8)] cursor-pointer rounded-xl"
              >
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
      {isCreateTeam && <CreateTeam onClose={() => setIsCreateTeam(false)} />}
      {isEditTeam && selectedTeam && (
        <EditTeam team={selectedTeam} onClose={() => setIsEditTeam(false)} />
      )}
    </div>
  );
}
