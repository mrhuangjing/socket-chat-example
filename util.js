function extractNickFromCookie (cookie = '') {
    const arr = cookie.split(';');
    const map = {};
    for (const value of arr) {
        let item = value.split('=');
        map[item[0].trim()] = item[1].trim();
    }
    return map['nickname'] || '';
}

module.exports = {
    extractNickFromCookie: extractNickFromCookie
};