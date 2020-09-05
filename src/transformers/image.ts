import { Mon } from "../data/mons";

export default function applyImage(image: string, mon: Mon): Mon {
  if (!image) {
    return mon;
  }

  return { 
    ...mon,
    image: image.replace(/\$SLUG/g, mon.slug)
                .replace(/\$NUMBER/g, mon.number.toString())
                .replace(/\$NAME/g, mon.name),
  };
}