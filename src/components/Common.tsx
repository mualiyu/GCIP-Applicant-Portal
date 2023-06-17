import { TextProps } from "./types";

export const Header = ({ text,style }: TextProps) => (
  <span style={style} className="header">{text}</span>
);

export const RegularText = ({ text, style ,onClick}: TextProps) => (
  <span onClick={onClick} style={style} className="regular_text">
    {text}
  </span>
);
