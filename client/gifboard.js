Meteor.subscribe("gifs");
Template.add_gif.events({
    'click #submit_gif': function(e){
        var src,tags,regex;
        src = document.getElementById("src").value;
        tags = document.getElementById("tags").value;
        regex = /.+\.gif$/;
        if(regex.test(src)){
              Gifs.insert({
                user_id: Meteor.userId,
                src: src,
                tags: prepTags(tags)
              }
           );
           document.getElementById("src").value = "";
           document.getElementById("tags").value = "";
        }else{
            $('#src').addClass("bad_src");
        }
     }
  }
);
Template.gifs_list.gifs = function(){
    return Gifs.find();
};

function prepTags(tags){
   return _.uniq(_.map(tags.split(','),function(str){ return str.trim();}));
}
