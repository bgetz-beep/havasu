import Image from "next/image";
import type { SocialPost } from "@/lib/social/types";
import type { NormalizedContact } from "@/lib/data";
import { ExternalLink } from "@/components/primitives/ExternalLink";

export function SocialWall({
  posts,
  contact,
}: {
  posts: SocialPost[];
  contact: NormalizedContact;
}) {
  if (posts.length === 0) {
    return (
      <section className="bg-cream border-b-2 border-charcoal py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-body text-sm uppercase tracking-widest">
            Follow Along
          </p>
          <h2 className="font-display text-5xl md:text-7xl mt-4 mb-10">
            STAY IN THE LOOP
          </h2>
          <div className="flex justify-center gap-8">
            <ExternalLink
              href={contact.facebookUrl}
              className="font-display text-3xl"
            >
              Facebook
            </ExternalLink>
            <ExternalLink
              href={contact.instagramUrl}
              className="font-display text-3xl"
            >
              Instagram
            </ExternalLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream border-b-2 border-charcoal py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="font-body text-sm uppercase tracking-widest">
          Follow Along
        </p>
        <h2 className="font-display text-5xl md:text-7xl mt-4 mb-12">
          THE SOCIAL FEED
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-2 border-charcoal hover:bg-charcoal hover:text-cream transition-colors"
            >
              {post.imageUrl && (
                <div className="relative aspect-[4/3]">
                  <Image
                    src={post.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <p className="font-body text-xs uppercase tracking-widest">
                  {post.source}
                </p>
                <p className="font-body text-sm mt-2 line-clamp-4">
                  {post.text}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
