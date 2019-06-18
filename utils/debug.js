const debug = (tag) => {
    if(!tag) {
        throw Error('tag가 필요합니다');
    }
}

module.exports = debug;