import React from "react";

const About = () => {
  return (
    <div className="about-page">
      <h1>About Us</h1>
      <p>
        Welcome to our React application! We are a passionate team of developers
        dedicated to creating innovative solutions using the latest web
        technologies.
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to build user-friendly and efficient web applications
        that meet the needs of our clients and users. We are committed to
        delivering high-quality software that makes a positive impact.
      </p>
      <h2>Meet the Team</h2>
      <div className="team-members">
        <div className="team-member">
          <img src="john-doe.jpg" alt="John Doe" />
          <h3>John Doe</h3>
          <p>Front-end Developer</p>
        </div>
        <div className="team-member">
          <img src="jane-smith.jpg" alt="Jane Smith" />
          <h3>Jane Smith</h3>
          <p>Back-end Developer</p>
        </div>
        {/* Add more team members as needed */}
      </div>
      <h2>Contact Us</h2>
      <p>
        If you have any questions, feedback, or collaboration opportunities,
        please feel free to contact us at{" "}
        <a href="mailto:info@example.com">info@example.com</a>.
      </p>
    </div>
  );
};

export default About;
