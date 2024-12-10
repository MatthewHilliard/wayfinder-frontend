"use client";

/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: The `ShareContentArea` component encourages users to contribute their experiences and tips 
 * to the platform. It includes buttons that open dialogs for creating experiences and tips, helping build 
 * a community-driven repository of local insights and hidden gems. The component is styled for a visually 
 * appealing, centered layout.
 */

import CreateExperienceDialog from "../experiences/CreateExperienceDialog";
import CreateTipDialog from "../tips/CreateTipDialog";

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
