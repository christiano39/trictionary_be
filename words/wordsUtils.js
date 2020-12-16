module.exports = {
  validateWord,
};

function validateWord(wordObj) {
  const { word, definition } = wordObj;

  if (!word || !definition) {
    return false;
  } else if (typeof word !== "string" || typeof definition !== "string") {
    return false;
  }

  return true;
}
