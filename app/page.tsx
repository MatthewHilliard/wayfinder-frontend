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
