import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h1>TutorMatch</h1>
      <p>
        Welcome to TutorMatch! 
        Find freelance tutors in your area based on subject, age group, and hourly rate.
      </p>
      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
        <Link to="/login">
          <button>Log In</button>
        </Link>
      </div>
      <h1>About Us</h1>
      <p>
        After experiencing inefficient and disconnected communication in the freelance tutoring space, 
        Audrey Bolyard, Rashi Sharma, and Anishka Chokshi founded TutorMatch: a one-stop shop for tutors and students alike.
        
        Our site offers a forum for students seeking help and tutors offering service, bolstering local community in the process. 
        Students can quickly find tutors that fit their needs, budget, and schedule, while tutors can connect with students who are interested.

        Our goal is simple: make tutoring more transparent, efficient, and connective— 
        because finding the right tutor shouldn’t feel harder than the subject itself.
      </p>

    </div>
  );
}
