"use client";

import { useState } from "react";

export default function ProfileForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    lookingFor: "",
    interestedIn: "",
    minAge: "",
    maxAge: "",
    distance: "",
    occupation: "",
    education: "",
    height: "",
    smoking: "",
    drinking: "",
    interests: "",
    location: "",
    bio: "",
  });

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const uploadPhoto = async () => {
    if (!image) {
      alert("Please select a photo");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Photo upload failed");
        return;
      }

      alert("Profile photo uploaded successfully ❤️");
    } catch (error) {
      console.error(error);
      alert("Unable to upload photo");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Profile update failed");
        return;
      }

      alert("Profile saved successfully ❤️");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl">
      <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
        Complete Your Profile
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <input
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="rounded-xl border p-4"
          />

          <input
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="rounded-xl border p-4"
          />
        </div>

        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <input
            name="age"
            placeholder="Age"
            type="number"
            onChange={handleChange}
            className="rounded-xl border p-4"
          />

          <select
            name="gender"
            onChange={handleChange}
            className="rounded-xl border p-4"
          >
            <option value="">Gender</option>
            <option>Man</option>
            <option>Woman</option>
          </select>
        </div>

        <select
          name="lookingFor"
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        >
          <option value="">What are you looking for?</option>
          <option value="FWB">FWB (Friends With Benefits)</option>
          <option value="HOOKUP">Hookup</option>
          <option value="RELATIONSHIP">Relationship</option>
          <option value="MARRIAGE">Marriage</option>
        </select>

        <select
          name="interestedIn"
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        >
          <option value="">Interested In</option>
          <option>Men</option>
          <option>Women</option>
          <option>Everyone</option>
        </select>

        <div className="grid gap-6 md:grid-cols-2">
          <input
            name="minAge"
            placeholder="Minimum age preference"
            type="number"
            onChange={handleChange}
            className="rounded-xl border p-4"
          />

          <input
            name="maxAge"
            placeholder="Maximum age preference"
            type="number"
            onChange={handleChange}
            className="rounded-xl border p-4"
          />
        </div>

        <select
          name="distance"
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        >
          <option value="">Preferred Distance</option>
          <option>Nearby</option>
          <option>10km</option>
          <option>25km</option>
          <option>50km</option>
          <option>Anywhere</option>
        </select>

        <input
          name="occupation"
          placeholder="Occupation"
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <input
          name="education"
          placeholder="Education"
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <input
          name="height"
          placeholder="Height (example: 180cm)"
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <select
            name="smoking"
            onChange={handleChange}
            className="rounded-xl border p-4"
          >
            <option value="">Smoking</option>
            <option>No</option>
            <option>Sometimes</option>
            <option>Yes</option>
          </select>

          <select
            name="drinking"
            onChange={handleChange}
            className="rounded-xl border p-4"
          >
            <option value="">Drinking</option>
            <option>No</option>
            <option>Sometimes</option>
            <option>Yes</option>
          </select>
        </div>

        <input
          name="interests"
          placeholder="Interests (music, sports, travel...)"
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <input
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <textarea
          name="bio"
          placeholder="Tell people about yourself..."
          rows={5}
          onChange={handleChange}
          className="w-full rounded-xl border p-4"
        />

        <div className="rounded-2xl border p-5">
          <h2 className="mb-3 text-xl font-bold text-gray-900">
            Profile Photo 📸
          </h2>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files?.[0] || null)
            }
            className="w-full"
          />

          <button
            type="button"
            onClick={uploadPhoto}
            disabled={uploading}
            className="mt-4 w-full rounded-xl bg-purple-600 py-3 font-bold text-white hover:bg-purple-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Photo 📸"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-pink-600 py-4 text-lg font-bold text-white hover:bg-pink-700"
        >
          Save Profile ❤️
        </button>
      </form>
    </div>
  );
}