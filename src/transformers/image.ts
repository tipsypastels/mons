import { Mon } from "../data/mons";

export default function applyImage(image: string, mon: Mon): Mon {
  if (!image) {
    return mon;
  }

  const imageUrl = image.replace(/\$SLUG/g, mon.slug)
                        .replace(/\$NUMBER/g, mon.number.toString())
                        .replace(/\$NAME/g, mon.name);

  const monDup: Partial<Mon> = {};
  const has = Object.prototype.hasOwnProperty.bind(mon);
  let didInsert = false;
  let key: keyof Mon;

  for (key in mon) {
    if (has(key)) {
      if (key < 'image' || didInsert) {
        monDup[key] = mon[key];
      } else {
        monDup['image'] = imageUrl;
        monDup[key] = mon[key];
        didInsert = true;
      }
    }
  }
  
  return monDup as Mon;
}