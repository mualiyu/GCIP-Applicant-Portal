import React from "react";

function TextExtractor() {
  if (!text) return "";
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

export default TextExtractor;
