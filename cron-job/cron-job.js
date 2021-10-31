const dbInterface = require("../interface/db-interface");
const { message1Model } = require("../models/message1");
const { message2Model } = require("../models/message2");
const schedule = require("node-schedule");

const transferMessageData = (
  condition,
  year,
  month,
  actualDate,
  hour,
  minute,
  second
) => {
  try {
    const date = new Date(year, month, actualDate, hour, minute, second);

    const j = schedule.scheduleJob(date, async () => {
      console.log("job is running");
      const getDataFromMessage1 = await dbInterface.getRecordByCondition(
        message1Model,
        condition,
        { _id: 0, __v: 0, created_at: 0, updated_at: 0 }
      );
      console.log("getDataFromMessage1 :", getDataFromMessage1);
      const msg1Data = getDataFromMessage1["data"][0];

      console.log("msg1Data :", msg1Data);
      const postDataInMessage2 = await dbInterface.createOrUpdateRecord(
        message2Model,
        condition,
        msg1Data
      );
      console.log("postDataInMessage2 :", postDataInMessage2);
      return postDataInMessage2;
    });
    return { message: "Message has been transferred successfully" };
  } catch (ex) {
    console.log(ex);
    throw { error: ex };
  }
};
module.exports = { transferMessageData };
