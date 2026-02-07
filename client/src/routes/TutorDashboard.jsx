import React, { useEffect, useState } from "react";
import { getMyMatches } from "../services/matchApi";
import MatchList from "../components/MatchList";

export default function TutorDashboard() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await getMyMatches();
      setMatches(res.matches || []);
    }
    load();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Tutor dashboard</h2>
      <MatchList matches={matches} />
    </div>
  );
}
