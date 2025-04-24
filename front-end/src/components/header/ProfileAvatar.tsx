import Link from "next/link";
import { useAuth, AUTH_CHANGE_EVENT } from "../../context/AuthContext";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Define user data interface
interface UserData {
  id: string | number;
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  avatar?: string;
}

const ProfileAvatar: React.FC = () => {
  const { isAuthenticated, checkAuth, clearToken } = useAuth();
  const [userInitials, setUserInitials] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to load user data from localStorage
  const loadUserData = () => {
    try {
      // Get userData from localStorage
      const userDataString = localStorage.getItem("userData");
      if (userDataString) {
        const parsedUserData = JSON.parse(userDataString) as UserData;
        setUserData(parsedUserData);

        // Set avatar image URL if available
        if (parsedUserData.avatar) {
          setAvatarUrl(parsedUserData.avatar);
        } else {
          // Get username and extract first two letters
          const username =
            parsedUserData.username ||
            `${parsedUserData.firstName || ""} ${
              parsedUserData.lastName || ""
            }`.trim();
          if (username) {
            // Take the first two characters of the username
            const initials = username.substring(0, 2).toUpperCase();
            setUserInitials(initials);
          }
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  useEffect(() => {
    // Check authentication status and load user data when component mounts
    if (isAuthenticated) {
      loadUserData();
    }

    // Create event listener for auth changes
    const handleAuthChange = () => {
      checkAuth();
      if (isAuthenticated) {
        loadUserData();
      }
    };

    // Create listener for userData changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "userData" || event.key === "jwt") {
        if (isAuthenticated) {
          loadUserData();
        }
      }
    };

    // Add event listeners
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
    window.addEventListener("storage", handleStorageChange);

    // Clean up event listeners
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, handleAuthChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isAuthenticated, checkAuth]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = (): void => {
    localStorage.removeItem("userData");
    clearToken();
  };

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hidden lg:block relative" ref={dropdownRef}>
      {isAuthenticated ? (
        <>
          <div
            className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Profile avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#EDE9FE] text-[#644FC1] border-2 rounded-4xl border-[#D7CFF9] flex items-center justify-center font-semibold">
                {userInitials}
              </div>
            )}
          </div>

          {isOpen && (
            <div className="absolute top-12 right-0 w-72 bg-white rounded-lg shadow-lg p-4 z-50">
              <div className="flex items-center mb-4">
                <div className="rounded-full overflow-hidden flex items-center justify-center mr-3">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="Profile avatar"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full p-1 bg-[#EDE9FE] text-[#644FC1] border-2 rounded-4xl border-[#D7CFF9] flex items-center justify-center text-xl font-semibold">
                      {userInitials}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {userData?.username || ""}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {userData?.email || ""}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-4 py-2 hover:text-indigo-600"
                >
                  <Image
                    src={"/image/VectorUser.svg"}
                    height={20}
                    width={20}
                    alt="logo-user"
                  />
                  My profile
                </Link>

                <Link
                  href="/brand"
                  className="flex items-center gap-3 py-2 text-[#505050] text-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="hover:text-indigo-600">
                    My brands and organizations
                  </span>
                  <Image
                    src={"/image/Vector+.svg"}
                    height={20}
                    width={20}
                    alt="logo-brand"
                  />
                </Link>

                <Link
                  href="/"
                  className="flex items-center gap-3 py-2 hover:text-indigo-600"
                >
                  <Image
                    src={"/image/VectorS.svg"}
                    height={20}
                    width={20}
                    alt="logo-setting"
                  />
                  Setting
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 cursor-pointer py-2 text-left hover:text-indigo-600"
                >
                  <Image
                    src={"/image/VectorL.svg"}
                    height={20}
                    width={20}
                    alt="logo-logout"
                  />
                  Log out
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Link href={"/Login"}>
          <button className="bg-[#644FC1] border border-[#644FC1] px-7 py-2 cursor-pointer hover:bg-[#644FF1] rounded-lg text-white">
            sign up
          </button>
        </Link>
      )}
    </div>
  );
};

export default ProfileAvatar;
