Meteor.startup(function () {
    if (!Gifs.findOne()){
       var data = [
           {
               src: "http://25.media.tumblr.com/tumblr_lyx2ifVyDl1r26bweo1_500.gif",
               tags: ['bieber', 'swag']
           },
           {
               src: "http://25.media.tumblr.com/tumblr_m6f5y0xs0u1qdlh1io1_500.gif",
               tags: ['macgyver', 'coffin-jetski']
           },
           {
               src: "http://24.media.tumblr.com/tumblr_m6f5y0xs0u1qdlh1io2_500.gif",
               tags: ['macgyver', 'coffin-jetski']
           },
           {
               src: "http://synt4x.ath.cx/stuff/pictures/gif/2extz75.gif",
               tags: ['neogaf', 'nintendo', 'e3', 'hypetrain']
           }
       ];
       for(var i = 0; i < data.length; i++){
           var gif = data[i];
           Gifs.insert(
               {
                   src: gif.src,
                   tags: gif.tags,
                   created_at: Date.now()
               }
           );
       }
    }
});
