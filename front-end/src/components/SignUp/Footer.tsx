import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full text-center text-sm text-gray-500 mt-6">
      {/* Mobile Version */}
      <div className="flex items-center justify-center gap-2 sm:hidden">
        <Link
          href="/privacy-policy"
          className="hover:text-indigo-600 transition-colors"
        >
          Privacy Policy
        </Link>
        <span>&</span>
        <Link
          href="/terms-of-service"
          className="hover:text-indigo-600 transition-colors"
        >
          Terms of Service
        </Link>
      </div>

      {/* Desktop Version */}
      <div className="hidden sm:block">
        <p>
          This site is protected by reCAPTCHA and the Google{" "}
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          apply.
        </p>
      </div>
    </div>
  );
}
