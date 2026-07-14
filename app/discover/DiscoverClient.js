"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function ProfileCard({ user, onMatch }) {
  const router = useRouter();

  const photos =
    user.photos?.length > 0
      ? user.photos
      : user.imageUrl
      ? [user.imageUrl]
      : [];

  const [photoIndex, setPhotoIndex] = useState(0);
  const [liking, setLiking] = useState(false);

  const previousPhoto = () => {
    setPhotoIndex((current) =>
      current === 0 ? photos.length - 1 : current - 1
    );
  };

  const nextPhoto = () => {
    setPhotoIndex((current) =>
      current === photos.length - 1 ? 0 : current + 1
    );
  };

  const likeUser = async () => {
    try {
      setLiking(true);

      const res = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverId: user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Unable to like profile");
        return;
      }

      if (data.matched && data.matchedUserId) {
        onMatch({
          userId: data.matchedUserId,
          name: user.name,
          imageUrl: photos[0] || null,
        });

        return;
      }

      alert(data.message || "Profile liked ❤️");
    } catch (error) {
      console.error(error);
      alert("Unable to like profile");
    } finally {
      setLiking(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
      <div
        onClick={() => router.push(`/users/${user.id}`)}
        className="relative h-96 cursor-pointer bg-gray-300"
      >
        {photos.length > 0 ? (
          <img
            src={photos[photoIndex]}
            alt={user.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl">
            ❤️
          </div>
        )}

        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                previousPhoto();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-2xl text-white"
            >
              ‹
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-2xl text-white"
            >
              ›
            </button>

            <div className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
              {photoIndex + 1} / {photos.length}
            </div>
          </>
        )}
      </div>

      <div className="p-6">
        <h2
          onClick={() => router.push(`/users/${user.id}`)}
          className="cursor-pointer text-2xl font-bold hover:text-pink-600"
        >
          {user.name}, {user.age}
        </h2>

        <p className="mt-1 text-gray-600">
          {user.gender} • 📍 {user.location}
        </p>

        <p className="mt-3">
          Looking for: <b>{user.lookingFor}</b>
        </p>

        <p className="mt-3 text-gray-600">
          {user.bio || "No bio yet."}
        </p>

        <button
          type="button"
          onClick={likeUser}
          disabled={liking}
          className="mt-5 w-full rounded-xl bg-pink-600 py-3 font-bold text-white hover:bg-pink-700 disabled:opacity-50"
        >
          {liking ? "Liking..." : "❤️ Like"}
        </button>
      </div>
    </div>
  );
}

export default function DiscoverClient() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchedUser, setMatchedUser] = useState(null);

  useEffect(() => {
    fetch("/api/discover")
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-8 text-center text-5xl font-bold">
        Discover ❤️
      </h1>

      {loading ? (
        <p className="text-center">Loading profiles...</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <ProfileCard
              key={user.id}
              user={user}
              onMatch={setMatchedUser}
            />
          ))}
        </div>
      )}

      {matchedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-pink-600">
              It's a Match! ❤️🔥
            </h2>

            <div className="mx-auto mt-6 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-gray-200">
              {matchedUser.imageUrl ? (
                <img
                  src={matchedUser.imageUrl}
                  alt={matchedUser.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-6xl">❤️</span>
              )}
            </div>

            <p className="mt-6 text-xl">
              You and <b>{matchedUser.name}</b> like each other.
            </p>

            <button
              type="button"
              onClick={() =>
                router.push(`/chat/${matchedUser.userId}`)
              }
              className="mt-7 w-full rounded-xl bg-pink-600 py-4 text-lg font-bold text-white hover:bg-pink-700"
            >
              💬 Open Chat
            </button>

            <button
              type="button"
              onClick={() => setMatchedUser(null)}
              className="mt-3 w-full rounded-xl bg-gray-200 py-4 font-bold text-gray-800 hover:bg-gray-300"
            >
              Keep Discovering
            </button>
          </div>
        </div>
      )}
    </main>
  );
}