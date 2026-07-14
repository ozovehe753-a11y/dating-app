"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";

export default function UserProfilePage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Unable to load profile");
        }

        return data;
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const likeUser = async () => {
    const res = await fetch("/api/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        receiverId: id,
      }),
    });

    const data = await res.json();

    alert(data.message || data.error);
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10 text-center">
        Profile not found.
      </div>
    );
  }

  const photos =
    user.photos?.length > 0
      ? user.photos
      : user.imageUrl
      ? [user.imageUrl]
      : [];

  const nextPhoto = () => {
    setPhotoIndex((current) =>
      current === photos.length - 1 ? 0 : current + 1
    );
  };

  const previousPhoto = () => {
    setPhotoIndex((current) =>
      current === 0 ? photos.length - 1 : current - 1
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => router.back()}
          className="mb-5 font-bold text-pink-600"
        >
          ← Back to Discover
        </button>

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="relative h-[550px] bg-gray-300">
            {photos.length > 0 ? (
              <img
                src={photos[photoIndex]}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-8xl">
                ❤️
              </div>
            )}

            {photos.length > 1 && (
              <>
                <button
                  onClick={previousPhoto}
                  className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-5 py-3 text-3xl text-white"
                >
                  ‹
                </button>

                <button
                  onClick={nextPhoto}
                  className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-5 py-3 text-3xl text-white"
                >
                  ›
                </button>

                <div className="absolute left-5 top-5 rounded-full bg-black/60 px-4 py-2 text-white">
                  {photoIndex + 1} / {photos.length}
                </div>
              </>
            )}
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold">
              {user.name}, {user.age}
            </h1>

            <p className="mt-2 text-lg text-gray-600">
              📍 {user.location}
            </p>

            <p className="mt-6 text-xl">
              {user.bio || "No bio yet."}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <ProfileDetail
                label="Looking For"
                value={user.lookingFor}
              />

              <ProfileDetail
                label="Interested In"
                value={user.interestedIn}
              />

              <ProfileDetail
                label="Occupation"
                value={user.occupation}
              />

              <ProfileDetail
                label="Education"
                value={user.education}
              />

              <ProfileDetail
                label="Height"
                value={user.height}
              />

              <ProfileDetail
                label="Smoking"
                value={user.smoking}
              />

              <ProfileDetail
                label="Drinking"
                value={user.drinking}
              />

              <ProfileDetail
                label="Interests"
                value={user.interests}
              />
            </div>

            <button
              onClick={likeUser}
              className="mt-8 w-full rounded-xl bg-pink-600 py-4 text-xl font-bold text-white hover:bg-pink-700"
            >
              ❤️ Like {user.name}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProfileDetail({ label, value }) {
  return (
    <div className="rounded-2xl bg-gray-100 p-5">
      <p className="text-sm font-bold text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-lg">
        {value || "Not specified"}
      </p>
    </div>
  );
}