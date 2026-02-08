import React, { useEffect, useState } from "react";
import { getMyMatches } from "../services/matchApi";
import MatchList from "../components/MatchList";

export default function TutorDashboard() {
  const [matches, setMatches] = useState([]);

  const load = async () => {
    try {
      const res = await getMyMatches();
      setMatches(res.matches || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ color: "#897e04", marginBottom: "2rem" }}>
        Tutor Management Dashboard
      </h2>
      <MatchList matches={matches} onUpdated={load} userRole="tutor" />
    </div>
  );
}
