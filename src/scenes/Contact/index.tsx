import React from "react";
import { useNavigate } from "react-router";

export function Contact() {
  const navigate = useNavigate();

  return <button onClick={() => navigate(-1)}>Go Back</button>;
}
