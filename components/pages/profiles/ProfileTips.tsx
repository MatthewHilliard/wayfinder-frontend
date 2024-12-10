"use client";

/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: The `ProfileTips` component displays a list of travel tips shared by the user. Each tip includes the content 
 * and its associated location, if available. If no tips are present, a prompt to create a new tip is displayed via the 
 * `CreateTipDialog` component. This component ensures a clear and organized view for users to share and explore travel insights.
 */

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
                <p className="text-xs text-muted-foreground">
                  📍 {tip.city_info?.name ? `${tip.city_info.name}, ` : ""}
                  {tip.country_info.name}
                </p>
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
