Template.add_gif.events({
    'click #submit_gif': function(e, template){
        var src,tags;
        src = template.find("#src").value;
        tags = template.find("#tags").value;
        Gifs.insert({
          user_id: Meteor.userId(),
          src: src,
          tags: prepTags(tags),
          created_at: Date.now()
        });
        template.find("#src").value = '';
        $("#tags").tagit("removeAll");
     },
     'keyup, change #src': function(e, template){
         var src, regex;
         src = template.find("#src").value;
         regex = /.+\.gif$/;
         if(regex.test(src)){
            template.find('#submit_gif').disabled = false;
         }else{
            template.find('#submit_gif').disabled = true;
         }
     }
   }
);

Template.gifcount.count = function(){
    return Gifs.find().count(); 
}

Template.gifs_list.gifs = function(){
    return Gifs.find({},{sort: {created_at: -1}});
};

Template.gifs_list.rendered = function(){
}

Template.add_gif.rendered = function(){
    $('#tags').tagit();
}

function prepTags(tags){
   return _.uniq(_.reject((_.map(tags.split(','),function(str){ return str.trim();})), function(str){
      return str.trim() === ""; 
   }));
}
