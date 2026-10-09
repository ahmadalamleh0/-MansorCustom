/** Shared media descriptor used by every image/video slot (see components/ui/Media). */
export type MediaAsset =
  | { type: 'image'; src: string; alt: string; width: number; height: number }
  | { type: 'video'; src: string; poster: string; mobileSrc?: string }
