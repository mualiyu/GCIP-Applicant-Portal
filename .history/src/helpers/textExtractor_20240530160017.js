import React from "react";

const TextExtractor (){
    if (!text) return "";
    return text.replace(/<\/?[^>]+(>|$)/g, "");
};

export default TextExtractor;
