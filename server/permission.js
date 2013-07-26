Tags.allow({
    'insert': function (userId,doc) {
      /* user and doc checks ,
      return true to allow insert */
      return true; 
    }
  });

Gifs.allow({
	'insert': function (userId,doc) {
		return true;
	}
})

