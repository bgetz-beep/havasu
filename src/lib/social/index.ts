import { fetchFacebookPosts } from "./facebook";
import { fetchInstagramPosts } from "./instagram";
import type { SocialPost } from "./types";

export type { SocialPost };

export async function fetchSocialPosts(): Promise<SocialPost[]> {
  const [fb, ig] = await Promise.all([
    fetchFacebookPosts(3),
    fetchInstagramPosts(3),
  ]);
  return [...fb, ...ig]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 6);
}
