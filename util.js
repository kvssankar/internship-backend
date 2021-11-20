const fullSearch = (searchtext) => {
  var arr = searchtext.split(" ");
  var qarr = [];
  var qstr = "select keyword from keywords where lower(keyword) like lower($1)";
  for (var i = 0; i < arr.length; i++) {
    qarr.push("%" + arr[i] + "%");
  }
  for (var i = 2; i <= arr.length; i++) {
    qstr += " and lower(keyword) like lower($" + i + ")";
  }
  return { qstr, qarr };
};

const partialSearch = (searchtext) => {
  var arr = searchtext.split(" ");
  var qarr = [];
  var qstr = "select keyword from keywords where lower(keyword) like lower($1)";
  for (var i = 0; i < arr.length; i++) {
    qarr.push("%" + arr[i] + "%");
  }
  for (var i = 2; i <= arr.length; i++) {
    qstr += " or lower(keyword) like lower($" + i + ")";
  }
  qstr += " except " + fullSearch(searchtext).qstr;
  return { qstr, qarr };
};

const checkSearchString = (searchtext) => {
  if (searchtext == "" || searchtext == null || searchtext == undefined) {
    return { status: 0, message: "Search string is empty" };
  } else {
    return { status: 1, message: "Search string is valid" };
  }
};

module.exports = { partialSearch, checkSearchString, fullSearch };
