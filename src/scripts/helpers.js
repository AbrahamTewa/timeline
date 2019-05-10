function toPromise(thenable) {
    let promiseHolder;

    const promise = new Promise(((onFulfill, onReject) => {
        promiseHolder = { onFulfill, onReject };
    }));

    thenable.then(promiseHolder.onFulfill, promiseHolder.onReject);

    return promise;
}

/**
 * Move an array element from one position to another
 * @param {Array} array
 * @param {number} oldPosition - Old position of the event
 * @param {number} newPosition - New position of the event
 */
function moveInArray(array, oldPosition, newPosition) {
    const newArray = array.slice(0);

    // Code inspired by :
    // https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    newArray.splice(newPosition, 0, newArray.splice(oldPosition, 1)[0]);

    return newArray;
}

export {
    moveInArray,
    toPromise,
};
