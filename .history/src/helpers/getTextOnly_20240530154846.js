const getTextContentOnly = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const walker = document.createTreeWalker(
          doc.body, 
          NodeFilter.SHOW_TEXT, 
          null, 
          false
      );
      const texts = [];
      let node;
      while(node = walker.nextNode()) {
          texts.push(node.nodeValue);
      }
      return texts;
  }

  export deafult getTextContentOnly