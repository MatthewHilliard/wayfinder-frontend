"use client";

import CreateExperienceDialog from "../experiences/CreateExperienceDialog";
import CreateTipDialog from "../experiences/CreateTipDialog";

export default function ShareContentArea() {
  return (
    <section className="py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Share Your Journey</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Help fellow travelers discover hidden gems and local insights. Your
          experiences can make someone&apos;s journey unforgettable!
        </p>
        <div className="flex justify-center space-x-4">
          <CreateExperienceDialog />
          <CreateTipDialog />
        </div>
      </div>
    </section>
  );
}
