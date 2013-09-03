Meteor.startup(function () {
  Meteor.subscribe("gifs");
  Meteor.subscribe('tags');
  Session.setDefault('allGifs', true);
});

function setupTagManager(target){
  Meteor.call('getTags',function(error, result){
    if(result){
        $(target).tagsManager({
            typeahead: true,
            typeaheadSource: result,
            hiddenTagListId: 'hidden-tags'
        });
    }
    else{
        $(target).tagsManager({
            hiddenTagListId: 'hidden-tags'
        });
    }
  });
}

Template.add_gif_form.rendered = function(){
    setupTagManager('#tags');
};

Template.add_gif_form.events({
  'input, paste #src': function(e,template){
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
      tags = $.map( $('span.tm-tag span') , function(e,i){ return $(e).text();});
       Gifs.insert({
         src: src,
         tags: tags,
         created_at: Date.now()
       });
      template.find('#src').value = '';
      $("#tags").tagsManager('empty');
      template.find('#tags').value = '';
      $('#add_gif').prop("disabled", true);
  }
});

Template.search_form.rendered = function(){
    setupTagManager('#search_tags');
    // $(document).on(events, selector, data, handler);
    $(document).on('click', 'a.tm-tag-remove',function(e){
      var search_tags = $.map( $('div#search_pane span.tm-tag span') , function(e,i){ return $(e).text();});
      Session.set('tags',search_tags);
    });
};

Template.search_form.events({
  'keyup #search_tags': function(e, template){
    var search_tags = $.map( $('div#search_pane span.tm-tag span') , function(e,i){ return $(e).text();});
    Session.set('tags',search_tags);
  },
}); 

Template.actions.events({
  'click a#search_pane_link': function(e, template){
      Session.set('allGifs', false);
  },
  'click a#add_gif_pane_link': function(e, template){
      Session.set('allGifs', true);
  }
});

Template.gifcount.count = function(){
    return Gifs.find().count(); 
};

Template.gifs_list.gifs = function(){
  if(Session.get('allGifs')){
    return Gifs.find({},{sort: {created_at: -1}});
  }
  else{
    var search_tags = Session.get('tags');
    if(_.isEmpty(search_tags)){
        return Gifs.find({},{sort: {created_at: -1}});
    }else{
        return Gifs.find({ tags: { $in: search_tags } });
    }
  }
};
