/**
 *
 * @param {HTMLElement} element
 */
function scrollIfNeeded(element) {

    let isStrictlyBetween;
    let pageYOffset;
    let innerHeight;
    let scrollXTo;
    let scrollYTo;

    pageYOffset = window.pageYOffset;
    innerHeight  = window.innerHeight;


    isStrictlyBetween = (value, min, max) => value < max && value > min;

    // Vertical scrolling
    if (!isStrictlyBetween( element.offsetTop
                          , pageYOffset
                          , pageYOffset + innerHeight)) {

        // If the element is fully invisible on top or visible partially at the top of the window :
        // We scroll to the top border of the element
        if (pageYOffset > element.offsetTop)
            scrollYTo = element.offsetTop;
        else {
            // Otherwise, the element is hidden/partially visible at the bottom
            let delta;
            let elementOffsetBottom;
            let windowOffsetBottom;

            elementOffsetBottom = element.offsetTop + element.offsetHeight;
            windowOffsetBottom  = window.pageYOffset + window.innerHeight;

            delta = elementOffsetBottom - windowOffsetBottom;

            scrollYTo = window.pageYOffset - delta;
        }
    }
    else {
        // No scrolling
        scrollYTo = window.pageYOffset;
    }

    // Horizontal scrolling
    if (!isStrictlyBetween( element.offsetLeft
                          , window.pageXOffset
                          , window.pageXOffset + window.innerWidth)) {

        // If the element is fully invisible on top or visible partially at the top of the window :
        // We scroll to the top border of the element
        if (pageYOffset > element.offsetLeft)
            scrollXTo = element.offsetLeft;
        else {
            // Otherwise, the element is hidden/partially visible at the bottom
            let delta;
            let elementOffsetRight;
            let windowOffsetRight;

            elementOffsetRight = element.offsetLeft + element.offsetWidth;
            windowOffsetRight  = window.pageXOffset + window.innerWidth;

            delta = elementOffsetRight - windowOffsetRight;

            scrollXTo = window.pageXOffset - delta;
        }
    }
    else {
        // No horizontal scrolling
        scrollXTo = window.pageXOffset;
    }

    window.scrollTo(scrollXTo, scrollYTo);
}

export {scrollIfNeeded};
