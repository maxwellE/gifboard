Gifs = new Meteor.Collection("gifs");
Tags = new Meteor.Collection('tags');

Gifs.deny({'insert': function (userId,doc) {
	doc.createdAt = new Date().valueOf();
	_.map(doc.tags, function(tag) {
	  var a = Tags.findOne({name: tag});
	  if (a) {
	  	Tags.update(a, {$inc: {count: 1}});
	  }
	  else {
	    Tags.insert({
	    name: tag,
	    count: 1
	    });
	  }
	  
	});
	return false;
}})