var mongoose = require('mongoose');

var UserWaitingSchema = new mongoose.Schema({
  name: String,
  chatRoomId: String,
});

module.exports = mongoose.model('userWaiting', UserWaitingSchema);
