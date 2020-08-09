const Utils = {
    debounce(fn, wait) {
        var timeout = null;
        return function () {

            if (timeout !== null) clearTimeout(timeout);
            timeout = setTimeout(fn, wait);
        }
    }
}
export default Utils