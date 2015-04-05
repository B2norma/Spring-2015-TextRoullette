var mongoose = require('mongoose');

var UserWaitingSchema = new mongoose.Schema({
  chatRoomId: String
});

module.exports = mongoose.model('userWaiting', UserWaitingSchema);
