const partialSearch = (searchtext) => {
  var arr = searchtext.split(" ");
  var qarr = [];
  var qstr = "select keyword from keywords where keyword like $1";
  for (var i = 0; i < arr.length; i++) {
    qarr.push("%" + arr[i] + "%");
  }
  for (var i = 2; i <= arr.length; i++) {
    qstr += " or keyword like $" + i;
  }
  return { qstr, qarr };
};

const checkSearchString = (searchtext) => {
  if (searchtext == "" || searchtext == null || searchtext == undefined) {
    return { status: 0, message: "Search string is empty" };
  } else {
    return { status: 1, message: "Search string is valid" };
  }
};

module.exports = { partialSearch, checkSearchString };
