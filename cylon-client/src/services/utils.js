export function get(url, data, config) {
    return fetch(url);
}
export function post(url, data = {}, config = {}) {
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    });
}