const dbInterface = require("../interface/db-interface");
const { message1Model } = require("../models/message1");
const { message2Model } = require("../models/message2");
const { transferMessageData } = require("../cron-job/cron-job");
// Requiring module

const messageService = {
  async createMessageData(messageBody) {
    try {
      const data = await dbInterface.createOrUpdateRecord(
        message1Model,
        messageBody,
        messageBody
      );

      const datePart = messageBody.date;
      const timePart = messageBody.time;
      const month = parseInt(datePart.split("-")[1]) - 1;
      const year = parseInt(datePart.split("-")[0]);
      const actualDate = parseInt(datePart.split("-")[2]);
      const hour = parseInt(timePart.split(":")[0]);
      const minute = parseInt(timePart.split(":")[1]);
      const second = parseInt(timePart.split(":")[2]);

      console.log(
        " CRON JOB PARAM :",
        month,
        year,
        actualDate,
        hour,
        minute,
        second
      );
      const scheduleCronJob = await transferMessageData(
        messageBody,
        year,
        month,
        actualDate,
        hour,
        minute,
        second
      );
      console.log(` Message data: `, data["data"]);

      return data["data"];
    } catch (ex) {
      console.log(ex);
      throw { error: ex };
    }
  },
};

module.exports = {
  createMessageData: messageService.createMessageData,
};
