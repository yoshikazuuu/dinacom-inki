import { FeedType, Inki } from "@/components/inki";
import { api } from "@/trpc/server";

export default async function Page({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const titleCaseSlug = toTitleCase(decodedSlug);
  const feeds = (await api.post.getFeedsByProvince.query({
    province: titleCaseSlug,
  })) as FeedType[];

  return <Inki feeds={feeds} />;
}

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
