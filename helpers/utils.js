function getIntervalRandom (max) {
  return Math.floor(Math.random() * max)
}

function createMsgArray (...msgs) {
  return msgs
}

export { getIntervalRandom, createMsgArray }
