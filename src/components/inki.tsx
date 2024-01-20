import { Feed } from "./feed";
import { Header } from "./header";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export type FeedType = {
  id: number;
  title: string;
  content: string;
  image: string;
  score: number;
  commentCount: number;
  createdAt: number;
  link: string;
  province: string;
};

export async function Inki({ feeds }: { feeds: FeedType[] }) {
  return (
    <div className="flex h-screen flex-col bg-background text-white">
      <Header />
      <div className="flex h-[calc(100dvh-4rem)] w-full justify-center">
        <div className="flex w-11/12">
          <Navbar />
          <Feed data={feeds} />
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
