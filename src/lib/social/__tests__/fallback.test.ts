import { describe, it, expect, vi, afterEach } from "vitest";
import { fetchFacebookPosts } from "../facebook";
import { fetchInstagramPosts } from "../instagram";

afterEach(() => {
  delete process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  delete process.env.FACEBOOK_PAGE_ID;
  delete process.env.INSTAGRAM_ACCESS_TOKEN;
  delete process.env.INSTAGRAM_USER_ID;
  vi.restoreAllMocks();
});

describe("social fallback", () => {
  it("Facebook: returns empty when tokens missing", async () => {
    const result = await fetchFacebookPosts();
    expect(result).toEqual([]);
  });

  it("Facebook: returns empty when Graph API fails", async () => {
    process.env.FACEBOOK_PAGE_ACCESS_TOKEN = "fake";
    process.env.FACEBOOK_PAGE_ID = "123";
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "nope" }), { status: 400 })
    );
    const result = await fetchFacebookPosts();
    expect(result).toEqual([]);
  });

  it("Instagram: returns empty when tokens missing", async () => {
    const result = await fetchInstagramPosts();
    expect(result).toEqual([]);
  });

  it("Instagram: returns empty when Graph API fails", async () => {
    process.env.INSTAGRAM_ACCESS_TOKEN = "fake";
    process.env.INSTAGRAM_USER_ID = "123";
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ error: "nope" }), { status: 400 })
    );
    const result = await fetchInstagramPosts();
    expect(result).toEqual([]);
  });
});
