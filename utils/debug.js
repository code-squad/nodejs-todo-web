const colors = {'cyan' : '\x1b[36m', 'reset' : '\x1b[0m'};

const debug = (tag) => {
  if (!tag) {
    throw Error('tag가 필요합니다');
  }

  return (msg) => {
    const log = `${colors.cyan}[${tag}]${colors.reset} ${msg}`
    console.log(log);
    return log;
  }
}

module.exports = debug;