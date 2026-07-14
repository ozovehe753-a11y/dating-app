"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-between gap-16 px-6 pt-32 pb-20 lg:flex-row">
        
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
            ❤️ Trusted by thousands of singles
          </span>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl">
            Meet Someone
            <br />
            <span className="text-pink-200">Worth Falling For.</span>
          </h1>

          <p className="mt-8 text-lg text-pink-100 md:text-xl">
            DESIRE helps you discover genuine people, build meaningful
            relationships, and chat instantly after matching.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="rounded-xl bg-white px-8 py-4 font-bold text-pink-600 transition hover:scale-105"
            >
              Create Free Account
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-white px-8 py-4 font-bold transition hover:bg-white hover:text-pink-600"
            >
              Login
            </Link>
          </div>

          <div className="mt-12 flex gap-10">
            <div>
              <h2 className="text-3xl font-bold">10K+</h2>
              <p className="text-pink-200">Members</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">2K+</h2>
              <p className="text-pink-200">Matches</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold">500+</h2>
              <p className="text-pink-200">Success Stories</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="h-80 rounded-3xl bg-gradient-to-br from-pink-300 to-purple-400"></div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900">
              Sarah, 24
            </h3>

            <p className="mt-2 text-gray-500">
              Loves travelling ✈️ • Coffee ☕ • Music 🎵
            </p>

            <button className="mt-6 w-full rounded-xl bg-pink-600 py-4 font-bold text-white transition hover:bg-pink-700">
              ❤️ Like Profile
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}