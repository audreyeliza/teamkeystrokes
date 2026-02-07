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

  // static lists for now; can later fetch from backend Config.SUBJECTS / AGE_GROUPS
  const [subjects] = useState([
    "Math",
    "English",
    "Science",
    "History",
    "Computer Science",
    "Foreign Language",
    "Test Prep",
  ]);

  const [ageGroups] = useState([
    "elementary",
    "middle",
    "high",
    "college",
  ]);

  const handleSearch = async () => {
    const res = await searchTutors(filters);
    setTutors(res.tutors || []);
  };

  useEffect(() => {
    // optional: initial fetch
    // handleSearch();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Find a tutor</h2>
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        onSearch={handleSearch}
        subjects={subjects}
        ageGroups={ageGroups}
      />
      <div style={{ marginTop: "1rem" }}>
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
}
