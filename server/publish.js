Meteor.publish("gifs", function () {
      return Gifs.find();
}); 
