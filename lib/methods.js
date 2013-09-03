Meteor.methods({
    getTags: function () {
        return Tags.find().map(function(e){
          return e.name;
        });
    },
    insertGif: function(gifs_data){
       return _.map(gifs_data, function(data){
         var id = Gifs.insert({src: data.src, tags: data.tags, created_at: Date.now()});
         return id;
       });
  }
});
