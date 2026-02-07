import React, { useEffect, useState } from "react";
import { getMyTutorProfile, saveTutorProfile, toggleTutorActive } from "../services/tutorApi";
import { getMetadata } from "../services/userApi";

export default function TutorProfilePage() {
  const [profile, setProfile] = useState({
    subjects: [],
    hourly_rate: "",
    age_groups: [],
    city: "",
    zip: "",
    bio: "",
    is_active: true,
  });
  const [meta, setMeta] = useState({ subjects: [], age_groups: [] });

  useEffect(() => {
    async function load() {
      try {
        const [prof, m] = await Promise.all([
          getMyTutorProfile(),
          getMetadata(),
        ]);
        setProfile((p) => ({
          ...p,
          ...prof,
        }));
        setMeta(m);
      } catch (e) {
        // ignore for now
      }
    }
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProfile((p) => ({ ...p, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveTutorProfile(profile);
    if (profile.is_active !== undefined) {
      await toggleTutorActive(profile.is_active);
    }
    alert("Profile saved");
  };

  const handleSubjectsChange = (e) => {
    const value = e.target.value;
    setProfile((p) => {
        const has = p.subjects.includes(value);
        return {
            ...p,
            subjects: has
                ? p.subjects.filter((s) => s !== value)
                : [...p.subjects, value],
        };
    });
  };

  const handleAgeGroupsChange = (e) => {
    const value = e.target.value;
    setProfile((p) => {
        const has = p.age_groups.includes(value);
        return {
            ...p,
            age_groups: has
                ? p.age_groups.filter((a) => a !== value)
                : [...p.age_groups, value],
        };
    });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h2>Tutor profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>City</label>
          <input
            name="city"
            value={profile.city || ""}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>ZIP</label>
          <input
            name="zip"
            value={profile.zip || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Subjects
            </label>
            <div className="flex flex-wrap gap-2">
                {meta.subjects.map((s) => (
                <label key={s} className="inline-flex items-center space-x-2">
                    <input
                    type="checkbox"
                    value={s}
                    checked={profile.subjects.includes(s)}
                    onChange={handleSubjectsChange}
                    />
                    <span>{s}</span>
                </label>
                ))}
            </div>
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Age ranges
            </label>
                <div className="flex flex-wrap gap-2">
                    {meta.age_groups.map((a) => (
                    <label key={a} className="inline-flex items-center space-x-2">
                        <input
                        type="checkbox"
                        value={a}
                        checked={profile.age_groups.includes(a)}
                        onChange={handleAgeGroupsChange}
                        />
                        <span>{a}</span>
                    </label>
                ))}
            </div>
        </div>


        <div style={{ marginTop: "0.5rem" }}>
          <label>Hourly rate</label>
          <input
            name="hourly_rate"
            type="number"
            value={profile.hourly_rate || ""}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>Bio</label>
          <textarea
            name="bio"
            value={profile.bio || ""}
            onChange={handleChange}
          />
        </div>
        {/* You and your teammates can style subjects/age_groups more nicely later */}
        <div style={{ marginTop: "0.5rem" }}>
          <label>Active</label>
          <input
            type="checkbox"
            name="is_active"
            checked={profile.is_active ?? true}
            onChange={handleCheckboxChange}
          />
        </div>
        <button style={{ marginTop: "1rem" }} type="submit">
          Save profile
        </button>
      </form>
    </div>
  );
}
