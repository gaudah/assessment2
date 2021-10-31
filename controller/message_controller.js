const schedule = require("node-schedule");
const service = require("../service/message_service");

const insuranceCtrl = {
  async createMessage(req, res) {
    try {
      /*let { message, timestamp } = req.body;
      if (!timestamp) {
        timestamp = new Date();
      }*/

      const getData = await service.createMessageData(req.body);

      const result = {
        status: true,
        statusCode: 201,
        data: getData,
        message: "Record created successfully",
      };
      return res.send(result);
    } catch (ex) {
      console.log(ex);
      res.status(400);
      return res.send(ex);
    }
  },
  async createMessageWorkerThread(req, res) {
    try {
      //const url = req.body.url;

      const getData = await service.createMessageThreadData();
      const result = {
        status: true,
        statusCode: 200,
        data: getData,
        message: "Record uploaded successfully",
      };
      return res.send(result);
    } catch (ex) {
      console.log(ex);
      res.status(400);
      return res.send(ex);
    }
  },
  async getPolicyInfo(req, res) {
    try {
      const userId = req.params.userId;
      const result = await service.getPolicyInfo(userId);
      return res.send(result);
    } catch (ex) {
      console.log(ex);
      res.status(400);
      return res.send(ex);
    }
  },
  async getAggregatedPolicyInfo(req, res) {
    try {
      const userId = req.params.userId;
      const result = await service.getAggregatedPolicyInfo(userId);
      return res.send(result);
    } catch (ex) {
      console.log(ex);
      res.status(400);
      return res.send(ex);
    }
  },
};

module.exports = {
  createMessage: insuranceCtrl.createMessage,
};
