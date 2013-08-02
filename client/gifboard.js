Meteor.startup(function () {
  Meteor.subscribe("gifs");
  Meteor.subscribe('tags');
  Session.setDefault('your_gifs_only', false);
});

Template.add_gif_form.rendered = function(){
  Meteor.call('getTags',function(error, result){
    if(result){
        $("#tags").tagsManager({
            typeahead: true,
            typeaheadSource: result
        });
    }
    else{
        $("#tags").tagsManager({
            typeahead: true,
            typeaheadSource: result
        });
    }
  });
};

Template.add_gif_form.events({
  'keyup #src': function(e,template){
      var src, regex;
      src = template.find("#src").value;
      regex = /^http.+\.gif$/;
      if(regex.test(src)){
         $('#add_gif').prop("disabled", false);
      }else{
         $('#add_gif').prop("disabled", true);
      }
    },
  'click button#add_gif': function(e, template){
      var src,tags,existing_gif;
      src = template.find("#src").value;
      tags = template.find("#tags").value;
       Gifs.insert({
         src: src,
         tags: prepTags(tags),
         created_at: Date.now()
       });
      template.find('#src').value = '';
      template.find('#tags').value = '';
      $('#add_gif').prop("disabled", true);
  }
});

Template.user_gif_toggle.events({
    'change input': function(e, template){
      if(template.find('input#your_gifs').checked){
        Session.set('your_gifs_only', true);
      }else{
        Session.set('your_gifs_only', false);
      }
    }
});

Template.gifcount.count = function(){
    return Gifs.find().count(); 
};

Template.gifs_list.gifs = function(){
      if(Session.get('your_gifs_only')){
          return Gifs.find({user_id: Meteor.userId()}, {sort: {created_at: -1}});
      }else{
          return Gifs.find({},{sort: {created_at: -1}});
      }
};

function prepTags(tags){
   return _.uniq(_.reject((_.map(tags.split(','),function(str){ return str.trim();})), function(str){
      return str.trim() === ""; 
   }));
}
