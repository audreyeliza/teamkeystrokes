import React from "react";

export default function FilterBar({ filters, setFilters, onSearch }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
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
        style={{ marginLeft: "0.5rem" }}
      />
      <input
        name="subject"
        placeholder="Subject"
        value={filters.subject}
        onChange={handleChange}
        style={{ marginLeft: "0.5rem" }}
      />
      <button type="submit" style={{ marginLeft: "0.5rem" }}>
        Search
      </button>
    </form>
  );
}
