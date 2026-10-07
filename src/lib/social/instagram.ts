import type { SocialPost } from "./types";

type InstagramPost = {
  id: string;
  caption?: string;
  permalink: string;
  media_url?: string;
  timestamp: string;
};

export async function fetchInstagramPosts(limit = 3): Promise<SocialPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!token || !userId) return [];

  try {
    const url = new URL(`https://graph.instagram.com/${userId}/media`);
    url.searchParams.set("fields", "id,caption,permalink,media_url,timestamp");
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("access_token", token);

    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { data?: InstagramPost[] };
    return (data.data ?? []).map((p) => ({
      id: p.id,
      source: "instagram" as const,
      text: p.caption ?? "",
      imageUrl: p.media_url,
      postUrl: p.permalink,
      createdAt: p.timestamp,
    }));
  } catch {
    return [];
  }
}
