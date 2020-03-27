const getSQLTags = (str) => {
  const strArr = str.split(", ")
  let results = ""
  strArr.map((tag) => {
    results += "('" + "'"+ tag + "'" + "')"
  })
}