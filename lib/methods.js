Meteor.methods({
    getTags: function () {
        return Tags.find().map(function(e){
          return e.name;
        });
    }
});
