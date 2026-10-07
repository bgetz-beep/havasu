export type GalleryOrientation = "portrait" | "landscape";
export type GalleryImage = {
  src: string;
  alt: string;
  orientation: GalleryOrientation;
};

export const mockGallery: GalleryImage[] = [
  {
    src: "/images/hero.avif",
    alt: "Rider at the Lake Havasu Stampede, 2022",
    orientation: "landscape",
  },
  {
    src: "/images/gallery/action-1.avif",
    alt: "Rodeo action, Lake Havasu Stampede",
    orientation: "landscape",
  },
  {
    src: "/images/gallery/action-2.avif",
    alt: "Rodeo action, Lake Havasu Stampede",
    orientation: "portrait",
  },
  {
    src: "/images/gallery/honeycutt-horses.avif",
    alt: "Honeycutt Horses at the Lake Havasu Stampede",
    orientation: "landscape",
  },
];
