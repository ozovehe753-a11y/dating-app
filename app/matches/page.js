"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MatchesPage() {
  const router = useRouter();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMatches = async () => {
    try {
      const res = await fetch("/api/matches", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.error);
        return;
      }

      setMatches(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error("LOAD MATCHES ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();

    const interval = setInterval(
      loadMatches,
      5000
    );

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    if (!date) return "";

    const messageDate = new Date(date);
    const today = new Date();

    const sameDay =
      messageDate.toDateString() ===
      today.toDateString();

    if (sameDay) {
      return messageDate.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    }

    return messageDate.toLocaleDateString(
      [],
      {
        month: "short",
        day: "numeric",
      }
    );
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-xl font-bold text-pink-600">
          Loading messages... ❤️
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="mx-auto max-w-3xl">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              Messages 💬
            </h1>

            <p className="mt-1 text-gray-500">
              Chat with your matches ❤️
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              router.push("/discover")
            }
            className="rounded-full bg-pink-600 px-5 py-3 font-bold text-white hover:bg-pink-700"
          >
            Discover
          </button>

        </div>


        {matches.length === 0 ? (

          <div className="rounded-3xl bg-white p-12 text-center shadow-xl">

            <div className="text-7xl">
              💞
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              No matches yet
            </h2>

            <p className="mt-2 text-gray-500">
              Discover people and start matching.
            </p>

            <button
              type="button"
              onClick={() =>
                router.push("/discover")
              }
              className="mt-6 rounded-xl bg-pink-600 px-8 py-3 font-bold text-white"
            >
              Discover People ❤️
            </button>

          </div>

        ) : (

          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

            {matches.map((user) => (

              <button
                type="button"
                key={user.id}
                onClick={() =>
                  router.push(
                    `/chat/${user.id}`
                  )
                }
                className="flex w-full items-center gap-4 border-b p-5 text-left transition hover:bg-pink-50"
              >

                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">

                  {user.imageUrl ? (

                    <img
                      src={user.imageUrl}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />

                  ) : (

                    <div className="flex h-full items-center justify-center text-3xl">
                      ❤️
                    </div>

                  )}

                </div>


                <div className="min-w-0 flex-1">

                  <div className="flex items-center justify-between gap-3">

                    <h2 className="truncate text-lg font-bold">
                      {user.name}
                    </h2>

                    <span className="text-xs text-gray-400">
                      {formatTime(
                        user.lastMessage?.createdAt ||
                        user.matchedAt
                      )}
                    </span>

                  </div>


                  <p className="mt-1 truncate text-gray-500">

                    {user.lastMessage ? (

                      <>
                        {user.lastMessage.content}
                      </>

                    ) : (

                      <span className="font-medium text-pink-600">
                        You matched! Start chatting ❤️
                      </span>

                    )}

                  </p>

                </div>


                <div className="text-xl text-gray-400">
                  ›
                </div>

              </button>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}