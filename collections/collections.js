Gifs = new Meteor.Collection("gifs");
Tags = new Meteor.Collection('tags');

Gifs.allow({
  insert: function(userId, doc){
      return true;
  }
});
