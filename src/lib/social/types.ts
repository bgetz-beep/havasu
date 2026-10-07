export type SocialPost = {
  id: string;
  source: "facebook" | "instagram";
  text: string;
  imageUrl?: string;
  postUrl: string;
  createdAt: string;
};
