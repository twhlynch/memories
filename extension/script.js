// look at you, hacker, a pathetic creature of meat and bone. How can you challenge a perfect, immortal machine?

function getHidden() {
    return JSON.parse(localStorage.getItem("memories-extension-memory-hidden-comments") || "[]");
}
function addHidden(text) {
    let hiddenComments = getHidden();
    hiddenComments.push(text);
    localStorage.setItem("memories-extension-memory-hidden-comments", JSON.stringify(hiddenComments));
}

let iterator = document.createNodeIterator(
    document, 
    NodeFilter.SHOW_COMMENT, 
    () => { return NodeFilter.FILTER_ACCEPT }
);

let child;
while (child = iterator.nextNode()) {
    let text = child.textContent.trim();

    let hiddenComments = getHidden();
    if (text.length > 0 && !hiddenComments.includes(text)) {
        let commentElement = document.createElement("div");
        let textElement = document.createElement("span");
        let buttonElement = document.createElement("span");
        commentElement.className = "memories-extension-memory";
        textElement.className = "memories-extension-memory-text";
        buttonElement.className = "memories-extension-memory-button";

        buttonElement.addEventListener("click", (e) => {
            if (e.shiftKey) addHidden(text);
            commentElement.remove();
        });
        commentElement.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            if (e.shiftKey) addHidden(text);
            commentElement.remove();
        });

        textElement.textContent = text;
        commentElement.appendChild(textElement);
        commentElement.appendChild(buttonElement);

        if (document.head.contains(child)) {
            let parent = document.body;
            parent.insertBefore(commentElement, document.body.firstChild);
        } else if (document.body.contains(child)) {
            let parent = child.parentNode;
            parent.appendChild(commentElement);
        } else {
            let parent = document.body;
            parent.insertBefore(commentElement, document.body.firstChild);
        }
    }
}