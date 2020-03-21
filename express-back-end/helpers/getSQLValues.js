const getSQLValues = (deck_id, arr) => {
  let results = ''
  const values = Object.values(arr);
  console.log(values);
  for (const value of values) {
    let item = []
    if (value.id) {
      item = (Object.values(value).slice(2));
      results += "("+ deck_id +", '" + item.join("', '") + "'), "
    } else {
      item = (Object.values(value));
      results += "("+ deck_id +", '" + item.join("', '") + "'), "
    }
  }
  console.log(results);
  return results.slice(0, -2) + ';';
}
module.exports = (getSQLValues);