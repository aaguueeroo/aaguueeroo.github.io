import { FaAndroid, FaApple, FaWhatsapp } from "react-icons/fa";
import {
  MdArrowForward,
  MdCampaign,
  MdCheck,
  MdCleaningServices,
  MdForum,
  MdHome,
  MdShoppingBasket,
} from "react-icons/md";

// The same Material icons as the app, as inline SVG. Only their markup reaches the page.
const icons = {
  android: FaAndroid,
  arrow: MdArrowForward,
  chat: MdForum,
  check: MdCheck,
  chores: MdCleaningServices,
  flat: MdHome,
  headsUp: MdCampaign,
  iphone: FaApple,
  shopping: MdShoppingBasket,
  whatsapp: FaWhatsapp,
};

export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  size?: number;
}

export const Icon = ({ name, size = 20 }: IconProps) => {
  const Glyph = icons[name];
  return <Glyph size={size} aria-hidden="true" focusable="false" />;
};
