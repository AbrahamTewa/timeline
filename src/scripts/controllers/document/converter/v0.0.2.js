// ============================================================
// Module's constants and variables
const FROM_VERSION = '0.0.1';
const TO_VERSION = '0.0.2';

// ============================================================
// Functions
function convertEvent(event) {
    const convertedEvent = {
        ...event,
        illustrationURL : event.bubbuleURL,
    };

    delete convertedEvent.bubbuleURL;

    return convertedEvent;
}

function convertEventList(events) {
    return Object.fromEntries(
        Object.entries(events).map(([key, event]) => [
            key,
            convertEvent(event),
        ]),
    );
}

/**
 * Convert a 0.0.1 version save file into a 0.0.2.
 * @param {Object} content
 * @returns {Object}
 */
function toVersion(content) {
    return {
        ...content,
        data : {
            ...content.data,
            events : convertEventList(content.data.events),
        },
    };
}

// ============================================================
// Exports
export {
    FROM_VERSION,
    TO_VERSION,

    toVersion,
};
