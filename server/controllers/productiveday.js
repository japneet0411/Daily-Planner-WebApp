const List = require("../modal/item");

const ProductiveDay = async (req, res) => {
  var days = [0, 0, 0, 0, 0, 0, 0];
  var index, max_index;
  var max = 0;
  await List.find({})
    .then((data) => {
      // console.log(data[0].created_at.getDay());
      for (var i = 0; i < data.length; i++) {
        if (data[i].completed_at != null) {
          index = data[i].completed_at.getDay();
          days[index] = days[index] + 1;
        }
      }
      for (var i = 0; i < days.length; i++) {
        if (days[i] > max) {
          max = days[i];
          max_index = i;
        }
      }
      switch (max_index) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
      }
      // console.log(days);
      res.status(200).send({ Pday: day, days });
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = ProductiveDay;
