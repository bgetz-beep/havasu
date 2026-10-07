import type { SocialPost } from "./types";

type FacebookPost = {
  id: string;
  message?: string;
  permalink_url: string;
  full_picture?: string;
  created_time: string;
};

export async function fetchFacebookPosts(limit = 3): Promise<SocialPost[]> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  if (!token || !pageId) return [];

  try {
    const url = new URL(`https://graph.facebook.com/v18.0/${pageId}/posts`);
    url.searchParams.set(
      "fields",
      "id,message,permalink_url,full_picture,created_time"
    );
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("access_token", token);

    const res = await fetch(url, { next: { revalidate: 900 } });
    if (!res.ok) return [];
    const data = (await res.json()) as { data?: FacebookPost[] };
    return (data.data ?? []).map((p) => ({
      id: p.id,
      source: "facebook" as const,
      text: p.message ?? "",
      imageUrl: p.full_picture,
      postUrl: p.permalink_url,
      createdAt: p.created_time,
    }));
  } catch {
    return [];
  }
}
