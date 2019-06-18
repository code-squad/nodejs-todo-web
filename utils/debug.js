const debug = (tag) => {
  if (!tag) {
    throw Error('tag가 필요합니다');
  }

  return (msg) => {
    const log = `[${tag}] ${msg}`
    console.log(log);
    return log;
  }
}

module.exports = debug;