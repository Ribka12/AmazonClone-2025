import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  const container = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    color: "#333",
  };

  const codeStyle = {
    fontSize: "120px",
    fontWeight: "bold",
    margin: "0",
    color: "#ff6b6b",
  };

  const messageStyle = {
    fontSize: "20px",
    marginTop: "10px",
    marginBottom: "30px",
    color: "#555",
  };

  const btnStyle = {
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: "#f0c14b",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    transition: "0.3s",
  };

  const btnHover = {
    backgroundColor: "#f0c14b",
  };

  return (
    <div style={container}>
      <h1 style={codeStyle}>404</h1>
      <p style={messageStyle}>
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Button with hover effect using React state */}
      <HoverButton />
    </div>
  );
}

function HoverButton() {
  const [hover, setHover] = React.useState(false);

  const btnStyle = {
    padding: "12px 28px",
    fontSize: "16px",
    fontWeight: "600",
    backgroundColor: hover ? "#a37a37" : "#d18d1f",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    transition: "0.3s",
  };

  return (
    <Link
      to="/"
      style={btnStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Go Back Home
    </Link>
  );
}
