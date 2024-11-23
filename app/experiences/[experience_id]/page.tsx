'use client'

import { useParams } from "next/navigation";

export default function ExperiencePage() {
  const { experience_id } = useParams(); // Get the dynamic ID from the URL

  // Fetch experience details based on the ID here (e.g., from an API)

  return (
    <div className="container mx-auto p-4">
      <p>Experience ID: {experience_id}</p>
    </div>
  );
}
