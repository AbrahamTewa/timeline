import * as v0d0d2 from './v0.0.2';

const versions = [
    v0d0d2,
];

const converters = versions.reduce((acc, { FROM_VERSION, ...manager }, index) => {
    acc[FROM_VERSION] = {
        index,
        FROM_VERSION,
        ...manager,
    };

    return acc;
}, {});

/**
 * Convert the given timeline saved data to the last version.
 */
function toLastVersion(data) {
    const initialVersionConverter = converters[data.version];

    if (!initialVersionConverter) {
        return data;
    }

    return versions
        .slice(initialVersionConverter.index)
        .reduce(
            (convertedData, { toVersion }) => toVersion(convertedData),
            data,
        );
}

// ============================================================
// Exports
export {
    toLastVersion,
};
