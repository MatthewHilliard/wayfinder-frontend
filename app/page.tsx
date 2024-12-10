/**
 * Author: Matthew Hilliard
 * Email: mch2003@bu.edu
 * Description: This component defines the home page of the Wayfinder application. It combines various 
 * sections such as the search area, content sharing area, category exploration, and tips from locals, 
 * providing users with a comprehensive and engaging entry point to the platform.
 */

import ExploreByCategoryArea from "@/components/pages/home/ExploreByCategoryArea";
import HomePageSearchArea from "@/components/pages/home/HomePageSearchArea";
import ShareContentArea from "@/components/pages/home/ShareContentArea";
import TipsFromLocalsArea from "@/components/pages/home/TipsFromLocalsArea";

export default function Home() {
  return (
    <>
      {/* Home Page with All the Components */}
      <main className="flex-grow">
        <HomePageSearchArea />
        <ShareContentArea />
        <ExploreByCategoryArea />
        <TipsFromLocalsArea />
      </main>
    </>
  );
}
