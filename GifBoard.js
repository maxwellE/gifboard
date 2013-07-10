if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to GifBoard.";
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
