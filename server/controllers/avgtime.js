const List = require("../modal/item");

const Avgtime = async (req, res) => {
  var diff = 0,
    cnt = 0;
  await List.find({}).then((data) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].completed_at != null) {
        cnt = cnt + 1;
        diff =
          diff +
          (data[i].completed_at.getTime() - data[i].created_at.getTime()) /
            (1000 * 3600 * 24);
      }
    }
    diff = diff / cnt;
    diff = diff.toFixed(2);
  });
  res.status(200).send({ diff });
};
module.exports = Avgtime;
