import React from 'react';

const TextExtractor = ({ html = '' }) => {
  const getTextContentOnly = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const walker = document.createTreeWalker(
      doc.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    const texts = [];
    let node;
    while ((node = walker.nextNode())) {
      texts.push(node.nodeValue.trim());
    }
    return texts.join(' ').trim();
  };

export default TextExtractor;
