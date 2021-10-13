const List = require("../modal/item");

const Avgtime = async (req, res) => {
  var date1 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  var date2 = new Date();
  var len = 0;
  await List.find({
    created_at: { $gte: date1 },
    completed_at: { $lte: date2 },
  }).then((data) => {
    console.log(data);
    len = data.length;
  });
  res.status(200).send({ len });
};
module.exports = Avgtime;
