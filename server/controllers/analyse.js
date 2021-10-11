const List = require("./../modal/item");
var days = [0, 0, 0, 0, 0, 0, 0];
var index, max_index;
var max = 0;
const ProductiveDay = async (req, res) => {
  await List.find({})
    .then((data) => {
      // console.log(data[0].created_at.getDay());
      for (var i = 0; i < data.length; i++) {
        if (data[i].completed_at != null) {
          index = data[i].completed_at.getDay();
          days[index - 1] = days[index - 1] + 1;
          if (days[index - 1] > max) {
            max = days[index - 1];
            max_index = index + 1;
          }
        }
      }

      res.status(200).send({ max_index });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = ProductiveDay;
