/** Shared media descriptor used by every image/video slot (see components/ui/Media). */
export type MediaAsset =
  | {
      type: 'image'
      src: string
      alt: string
      width: number
      height: number
      /** Crop focal point (CSS object-position), e.g. '43% 65%' */
      position?: string
    }
  | { type: 'video'; src: string; poster: string; mobileSrc?: string }
