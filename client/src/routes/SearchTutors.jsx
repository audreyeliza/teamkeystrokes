// SearchTutors.jsx
import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import TutorCard from "../components/TutorCard";
import { searchTutors } from "../services/tutorApi";

export default function SearchTutors() {
  const [filters, setFilters] = useState({
    city: "",
    zip: "",
    subject: "",
    ageGroup: "",
    minRate: "",
    maxRate: "",
  });
  const [tutors, setTutors] = useState([]);

  const handleSearch = async () => {
    const res = await searchTutors(filters);
    setTutors(res.tutors || []);
  };

  useEffect(() => {
    // optional initial load
    // handleSearch();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Find a tutor</h2>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
      />
      <div style={{ marginTop: "1rem" }}>
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
}
