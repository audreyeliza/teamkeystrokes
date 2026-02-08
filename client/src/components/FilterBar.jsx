import React, { useEffect, useState } from "react";
import { getMetadata } from "../services/userApi";

export default function FilterBar({ filters, setFilters, onSearch }) {
  const [meta, setMeta] = useState({ subjects: [], age_groups: [] });

  useEffect(() => {
    async function load() {
      try {
        const m = await getMetadata();
        setMeta(m);
      } catch (e) {
        /* ignore */
      }
    }
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };

  return (
    <div
      className="ui-card"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        alignItems: "center",
      }}
    >
      <input
        name="city"
        placeholder="City"
        value={filters.city}
        onChange={handleChange}
      />
      <input
        name="zip"
        placeholder="ZIP"
        value={filters.zip}
        onChange={handleChange}
      />

      <select name="subject" value={filters.subject} onChange={handleChange}>
        <option value="">All subjects</option>
        {meta.subjects.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select name="ageGroup" value={filters.ageGroup} onChange={handleChange}>
        <option value="">All ages</option>
        {meta.age_groups.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="minRate"
        placeholder="Min $/hr"
        style={{ width: "120px" }}
        value={filters.minRate}
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxRate"
        placeholder="Max $/hr"
        style={{ width: "120px" }}
        value={filters.maxRate}
        onChange={handleChange}
      />

      <button
        type="button"
        className="nav-btn"
        style={{ padding: "8px 20px" }}
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}
