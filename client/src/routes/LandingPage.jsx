import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-center">
      <img
        src="/logo.png"
        width="300"
        alt="TutorMatch Logo"
        style={{ marginBottom: "20px" }}
      />
      <h1> Welcome to TutorMatch! </h1>
      <p>
        Find freelance tutors in your area based on subject, age group, and
        hourly rate.
      </p>

      <div style={{ margin: "30px 0" }}>
        {/* These are now Links that go to your routes */}
        <Link to="/register" className="nav-btn">
          Sign Up
        </Link>
        <Link to="/login" className="nav-btn" style={{ marginLeft: "15px" }}>
          Log In
        </Link>
      </div>

      <section
        className="ui-card"
        style={{ marginTop: "40px", textAlign: "left" }}
      >
        <h2>About Us</h2>
        <p>
          After experiencing inefficient and disconnected communication in the
          freelance tutoring space, Audrey Bolyard, Rashi Sharma, and Anishka
          Chokshi founded TutorMatch: a one-stop shop for tutors and students
          alike. Our site offers a forum for students seeking help and tutors
          offering service, bolstering local community in the process. Students
          can quickly find tutors that fit their needs, budget, and schedule,
          while tutors can connect with students who are interested. Our goal is
          simple: make tutoring more transparent, efficient, and
          connective—because finding the right tutor shouldn’t feel harder than
          the subject itself.
        </p>
      </section>
    </div>
  );
}
