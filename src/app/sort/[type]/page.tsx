import { Inki, type FeedType } from "@/components/inki";
import { api } from "@/trpc/server";

export default async function Page({ params }: { params: { type: string } }) {
  if (params.type === "popular") {
    const feeds = (await api.post.getFeedsPopular.query()) as FeedType[];

    return <Inki feeds={feeds} />;
  }

  let type = "asc";
  if (params.type === "newest") type = "desc";

  const feeds = (await api.post.getFeeds.query({
    type: type,
  })) as FeedType[];

  return <Inki feeds={feeds} />;
}
