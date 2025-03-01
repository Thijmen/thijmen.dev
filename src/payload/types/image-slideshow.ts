// This is a temporary type definition until Payload regenerates the types
// It will be replaced when you run `payload generate:types`

export interface MyImageSlideshowBlock {
  description: string;
  slides?: {
    image: {
      id: number;
      url?: string | null;
      filename?: string | null;
      mimeType?: string | null;
      filesize?: number | null;
      width?: number | null;
      height?: number | null;
    };
    caption: string;
    description?: string | null;
    id?: string | null;
  }[] | null;
  settings?: {
    autoplay?: boolean | null;
    autoplaySpeed?: number | null;
    showDots?: boolean | null;
    showArrows?: boolean | null;
  } | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'imageSlideshow';
}
