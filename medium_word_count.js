(function () {

    function countWords(str) {
        return (str.trim()
                .replace(/['";:,.?¿\-!¡]+/g, '')
                .match(/\S+/g) || [])
            .length;
    }

    const articleElement = document.querySelector('article');
    // Count words in text headers, paragraphs and list elements.
    const nodeList = articleElement?.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li') || [];

    let wordCount = Array.from(nodeList)
        .reduce((a, b) => a + countWords(b.innerText), 0);

    // Locate the element with the read time
    let xpath = "//*[text()[contains(., 'min read')]]";
    let matchingElement = document.evaluate(
            xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
        .singleNodeValue;

    // Add word count next to read time
    Array.from(matchingElement?.childNodes || []).forEach(function (el) {
        if (el.nodeType === Node.TEXT_NODE && el.textContent.includes('min read')) {
            el.textContent += ` · ${wordCount.toLocaleString()} words`;
            return;
        }
    });

})();