import ExploreByCategoryArea from "@/components/pages/home/ExploreByCategoryArea";
import HomePageSearchArea from "@/components/pages/home/HomePageSearchArea";
import TipsFromLocalsArea from "@/components/pages/home/TipsFromLocalsArea";

export default function Home() {
  return (
    <>
      {/* Home Page with All the Components */}
      <main className="flex-grow">
        <HomePageSearchArea />
        <ExploreByCategoryArea />
        <TipsFromLocalsArea />
      </main>
    </>
  );
}
