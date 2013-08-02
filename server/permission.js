Gifs.deny({
  insert: function(userId, doc){
      var regex = /^http.+\.gif$/;
      if(!regex.test(doc.src)){
        return true;
      }
      var existing_gif;
      doc.createdAt = new Date().valueOf();
      _.each(doc.tags, function(tag) {
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
      existing_gifs = Gifs.find({src: doc.src}).fetch();
      if(existing_gifs){
        var existing_gifs_tags = _.map(existing_gifs,function(gif){
            console.log(gif);
            return gif.tags;
        });
        doc.tags = _.union(_.flatten(existing_gifs_tags), doc.tags);
        Gifs.remove({src: doc.src});
      }
      return false;
  }
});

Gifs.allow({
  insert: function(userId, doc){
    return true;
  }
});
