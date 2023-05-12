const BaseDataModel = require("../base.datamodel");

class userDataModel extends BaseDataModel {
  email = null;
  phoneNumber = null;
  paymentDone = null;
  accessCode = null;
  customeURL = null;
}

module.exports = userDataModel;
