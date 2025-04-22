"use client";

import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  ClipboardEvent,
} from "react";

import BackButtonVC from "@/components/SignUp/Verify-code/BackButtonVC";
import Logo from "@/components/SignUp/Logo";
import { useRouter } from "next/navigation";
import useSendCode from "@/components/SignUp/Verify-code/useSendCode";


export default function VerifyCodePageLogin() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [userEmail, setUserEmail] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const { mutate: sendCode, isPending: isLoading } = useSendCode();

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const userDataString = localStorage.getItem("userData");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData && userData.email) {
            setUserEmail(userData.email);
          }
        }
      } catch (error) {
        console.error("Error reading email from localStorage:", error);
      }
    }
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const element = event.target;
    const value = element.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const paste = event.clipboardData?.getData("text").replace(/[^0-9]/g, "");
    if (paste && paste.length === otp.length) {
      const newOtp = paste.split("");
      setOtp(newOtp);
      inputRefs.current[otp.length - 1]?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const finalOtp = otp.join("");
    if (finalOtp.length !== 4) {
      console.error("OTP must be 4 digits");
      return;
    }

    if (!userEmail) {
      console.error("User email not found in state.");
      // TODO: Optionally show an error message to the user
      return;
    }

    const codeToSend = Number(finalOtp);
    console.log("Submitting OTP:", codeToSend, "for email:", userEmail);

    sendCode(
      { code: codeToSend, email: userEmail },
      {
        onSuccess: (response) => {
          console.log("OTP verification successful:", response);
          router.push("/Login/Verification-email/Verify-code/forgot-password");
        },
        onError: (error) => {
          console.error("OTP verification failed:", error);
          // TODO: Show error message to the user
        },
      }
    );
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  return (
    <div className=" bg-white flex flex-col items-center">
      <BackButtonVC />
      <div className="w-full max-w-[440px] px-4 py-8">
        <main className="flex flex-col items-center gap-8 mt-8">
          <h1 className="text-2xl sm:text-3xl text-gray-800 text-center font-medium">
            Confirm your email
          </h1>

          <Logo />

          <div className="w-full text-center mt-4">
            <h2 className="text-xl text-gray-700 mb-2">
              Enter confirmation code
            </h2>
            {userEmail && (
              <p className="text-sm text-gray-500">
                Enter the 4-digit login code we sent to <br />{" "}
                <strong>{userEmail}</strong>
              </p>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center gap-6 mt-4 px-4 sm:px-0"
          >
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
              {otp.map((data, index) => (
                <input
                  key={index}
                  ref={(el: HTMLInputElement | null) => {
                    if (inputRefs.current) {
                      inputRefs.current[index] = el;
                    }
                  }}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={data}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  required
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl sm:text-3xl border-b border-gray-300 focus:outline-none  focus:ring-indigo-500 focus:border-b"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading || !isOtpComplete}
              className={`w-full py-4 cursor-pointer bg-indigo-500 text-white rounded-lg text-base font-medium transition-colors mt-4
                ${
                  isLoading || !isOtpComplete
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-indigo-600"
                }`}
            >
              {isLoading ? "Verifying..." : "Continue"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
