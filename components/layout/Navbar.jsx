import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/desire-logo.svg"
            alt="DESIRE"
            width={180}
            height={42}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-white hover:text-pink-300 transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-pink-500 px-5 py-2 text-white hover:bg-pink-600 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
