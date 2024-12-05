"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateTipDialog from "@/components/pages/tips/CreateTipDialog";
import { Tip } from "@/types/Tips";

type ProfileTipsProps = {
  tips: Tip[] | null;
};

export default function ProfileTips({ tips }: ProfileTipsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Travel Tips</CardTitle>
      </CardHeader>
      <CardContent>
        {tips && tips.length > 0 ? (
          <ul className="space-y-4">
            {tips.map((tip, index) => (
              <li key={index} className="border-b pb-4 last:border-b-0">
                <p className="mb-2">{tip.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center">
            <p>No tips yet.</p>
            <CreateTipDialog />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
