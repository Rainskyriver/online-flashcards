const getSQLTestQuestions = (answers, testId) => {
  let results = "";

  for (const cardId in answers) {
    let item = [];
    results += "("+ cardId + ", '" + testId + "', " + answers[cardId] + item.join("'") + "), "
  }

  console.log(results.slice(0, -2) + ';')
  return results.slice(0, -2) + ';';
};

module.exports = (getSQLTestQuestions);