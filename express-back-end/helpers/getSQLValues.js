const getSQLValues = (arr) => {
  let results = ''
  const values = Object.values(arr);
  for (const value of values) {
    const item = (Object.values(value));
    results += '(' + item.join(', ') + '), '
  }
  return results.slice(0, -2);
}
module.exports = (getSQLValues);