import Link from "next/link";
import { useAuth } from "./../../context/AuthContext";
export default function ProfileAvatar() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="hidden lg:block">
      {isAuthenticated ? (
        <div>ProfileAvatar</div>
      ) : (
        <Link href={"/Login"}>
          <button className="bg-[#644FC1] border border-[#644FC1] px-7 py-2 cursor-pointer hover:bg-[#644FF1] rounded-lg text-white">
            sign up
          </button>
        </Link>
      )}
    </div>
  );
}
