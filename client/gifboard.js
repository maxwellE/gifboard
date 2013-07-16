Meteor.subscribe("gifs");
Template.add_gif.events({
    'click #submit_gif': function(e, template){
        var src,tags,regex;
        src = template.find("#src").value;
        tags = template.find("#tags").value;
        regex = /.+\.gif$/;
        if(regex.test(src)){
              Gifs.insert({
                user_id: Meteor.userId,
                src: src,
                tags: prepTags(tags)
              }
           );
           template.find("#src").value = "";
           template.find("#tags").value = "";
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
