// ============================================================
// Functions
/**
 *
 * @param {HTMLElement|React.Component} element
 */
function scrollIfNeeded(element) {
    let scrollXTo;
    let scrollYTo;

    const { pageYOffset, innerHeight } = window;

    const isStrictlyBetween = (value, min, max) => value < max && value > min;

    // Vertical scrolling
    if (!isStrictlyBetween(
        element.offsetTop,
        pageYOffset,
        pageYOffset + innerHeight,
    )) {
        // If the element is fully invisible on top or visible partially at the top of the window :
        // We scroll to the top border of the element
        if (pageYOffset > element.offsetTop) {
            scrollYTo = element.offsetTop;
        } else {
            // Otherwise, the element is hidden/partially visible at the bottom
            const elementOffsetBottom = element.offsetTop + element.offsetHeight;
            const windowOffsetBottom = window.pageYOffset + window.innerHeight;

            const delta = elementOffsetBottom - windowOffsetBottom;

            scrollYTo = window.pageYOffset - delta;
        }
    } else {
        // No scrolling
        scrollYTo = window.pageYOffset;
    }

    // Horizontal scrolling
    if (!isStrictlyBetween(
        element.offsetLeft,
        window.pageXOffset,
        window.pageXOffset + window.innerWidth,
    )) {
        // If the element is fully invisible on top or visible partially at the top of the window :
        // We scroll to the top border of the element
        if (pageYOffset > element.offsetLeft) { scrollXTo = element.offsetLeft; } else {
            // Otherwise, the element is hidden/partially visible at the bottom
            const elementOffsetRight = element.offsetLeft + element.offsetWidth;
            const windowOffsetRight = window.pageXOffset + window.innerWidth;

            const delta = elementOffsetRight - windowOffsetRight;

            scrollXTo = window.pageXOffset - delta;
        }
    } else {
        // No horizontal scrolling
        scrollXTo = window.pageXOffset;
    }

    window.scrollTo(scrollXTo, scrollYTo);
}

// ============================================================
// Exports
export {
    scrollIfNeeded,
};
