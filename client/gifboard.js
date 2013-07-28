Meteor.startup(function () {
  Meteor.subscribe("gifs");
  Session.setDefault('your_gifs_only', false);
});

Meteor.logout(function(err) {
   Session.set("your_gifs_only",false);
});

$( document ).ready(function() {
  $(document).on("keyup", "#src",function(e){
      var src, regex;
      src = $("#src").val();
      regex = /.+\.gif$/;
      if(regex.test(src)){
         $('#submit_gif').prop("disabled", false);
      }else{
         $('#submit_gif').prop("disabled", true);
      }
   });
  $(document).on('click', '#submit_gif', function(e){
      var src,tags;
      src = $("#src").val();
      tags = $("#tags").val();
      Gifs.insert({
        user_id: Meteor.userId(),
        src: src,
        tags: prepTags(tags),
        created_at: Date.now()
      });
      $("#src").val('');
      $("#tags").tagit("removeAll");
      $('button#add_gif').popover('hide');
  });
  $(document).on('click', '#reset_fields', function(e){
      $("#src").val('');
      $("#tags").tagit("removeAll");
  });
});

Template.navbar.events({
    'click button#add_gif': function(e, template){
      $('#tags').tagit();
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

Template.navbar.rendered = function(){
    $('button#add_gif').popover({
      html: true,
      placement: 'bottom',
      title: 'Add Gif',
      content: "<div id='add_gif'><label for='src'>Gif Source Link:</label><input type='text' name='src' id='src' placeholder='Gif Source'><br><label for='tags'>Tags:</label><input type='text' name='tags' id='tags' placeholder='Tags' class='input-xlarge'><input type='submit' id='submit_gif' value='Create' class='btn' disabled><input type='button' id='reset_fields' value='Reset Fields' class='btn btn-danger'></div>"});
};

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
