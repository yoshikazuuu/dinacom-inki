import { type FeedType, Inki } from "@/components/inki";
import { api } from "@/trpc/server";

export default async function Page() {
  const feeds = (await api.post.getFeeds.query({ type: "desc" })) as FeedType[];
  return <Inki feeds={feeds} />;
}
