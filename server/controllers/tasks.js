const List = require("../modal/item");
const Tasks = async (req, res) => {
  var cnt = 0;
  console.log(new Date(req.body.date1));
  console.log(new Date(req.body.date2));
  await List.find({
    created_at: { $gte: new Date(req.body.date1) },
    completed_at: { $lte: new Date(req.body.date2) },
  }).then((data) => {
    cnt = data.length;
  });

  res.send({ cnt });
};
module.exports = Tasks;
