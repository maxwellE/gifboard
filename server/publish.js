Meteor.publish("gifs", function () {
      return Gifs.find();
});

Meteor.publish("tags", function () {
      return Tags.find();
});
