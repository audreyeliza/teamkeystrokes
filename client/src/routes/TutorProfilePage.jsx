import React, { useEffect, useState } from "react";
import {
  getMyTutorProfile,
  saveTutorProfile,
  toggleTutorActive,
} from "../services/tutorApi";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...profile,
      hourly_rate: Number(profile.hourly_rate || 0),
    };

    await saveTutorProfile(payload);
    if (profile.is_active !== undefined) {
      await toggleTutorActive(profile.is_active);
    }
    alert("Profile saved");
  };

  return (
    <div className="ui-card" style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h2 style={{ color: "var(--brand-gold)", marginBottom: "1.5rem" }}>
        Tutor Profile Settings
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {/* Location Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
              City
            </label>
            <input
              name="city"
              placeholder="e.g. New York"
              value={profile.city || ""}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
              ZIP Code
            </label>
            <input
              name="zip"
              placeholder="10001"
              value={profile.zip || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Subjects Section */}
        <div>
          <label
            style={{
              fontWeight: "600",
              fontSize: "0.9rem",
              display: "block",
              marginBottom: "10px",
            }}
          >
            Subjects You Teach:
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {meta.subjects.map((s) => (
              <label
                key={s}
                className="chat-bubble"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: 0,
                  cursor: "pointer",
                  borderLeft: profile.subjects.includes(s)
                    ? "3px solid var(--brand-gold)"
                    : "3px solid transparent",
                }}
              >
                <input
                  type="checkbox"
                  value={s}
                  checked={profile.subjects.includes(s)}
                  onChange={handleSubjectsChange}
                />
                <span style={{ fontSize: "0.85rem" }}>{s}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Age Groups Section */}
        <div>
          <label
            style={{
              fontWeight: "600",
              fontSize: "0.9rem",
              display: "block",
              marginBottom: "10px",
            }}
          >
            Target Age Groups:
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {meta.age_groups.map((a) => (
              <label
                key={a}
                className="chat-bubble"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: 0,
                  cursor: "pointer",
                  borderLeft: profile.age_groups.includes(a)
                    ? "3px solid var(--brand-gold)"
                    : "3px solid transparent",
                }}
              >
                <input
                  type="checkbox"
                  value={a}
                  checked={profile.age_groups.includes(a)}
                  onChange={handleAgeGroupsChange}
                />
                <span style={{ fontSize: "0.85rem" }}>{a}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rate and Status Section */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              flex: 1,
            }}
          >
            <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
              Hourly Rate ($)
            </label>
            <input
              name="hourly_rate"
              type="number"
              placeholder="45"
              value={profile.hourly_rate || ""}
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 15px",
              background: "#f9f9f7",
              borderRadius: "8px",
              border: "1px solid #eee",
            }}
          >
            <input
              type="checkbox"
              id="active-toggle"
              name="is_active"
              checked={profile.is_active ?? true}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="active-toggle"
              style={{
                fontWeight: "600",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              Profile Visible
            </label>
          </div>
        </div>

        {/* Bio Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "600", fontSize: "0.9rem" }}>
            Professional Bio
          </label>
          <textarea
            name="bio"
            rows="5"
            placeholder="Describe your tutoring style and experience..."
            value={profile.bio || ""}
            onChange={handleChange}
            style={{ resize: "vertical" }}
          />
        </div>

        <button
          className="nav-btn"
          style={{ marginTop: "10px", padding: "12px" }}
          type="submit"
        >
          Save Profile Changes
        </button>
      </form>
    </div>
  );
}
