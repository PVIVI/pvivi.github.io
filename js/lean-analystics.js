function showTime(Counter) {
  var query = new AV.Query(Counter);
  var entries = [];
  var $visitors = $(".post-title");

  $visitors.each(function () {
    entries.push( this.id.trim() );
  });

  query.containedIn('url', entries);
  query.find()
    .done(function (results) {
      var COUNT_CONTAINER_REF = '.leancloud-visitors-count';
      $x = $(COUNT_CONTAINER_REF)
      var dic = new Array();
      for (var i = 0; i < $x.length; i++) {
        dic[$x[i].id] = $x[i]
      }
    
      for (var i = 0; i < results.length; i++) {
        var item = results[i];
        var url = item.get('url');
        var time = item.get('time');
        span_item = dic[url];
        $(span_item).text(time);
      }
      for(var i = 0; i < entries.length; i++) {
        var url = entries[i];
        var element = $(dic[url]);
        
        if( element.text() == '') {
          element.text(0);
        }
      }
    })
    .fail(function (object, error) {
      console.log("Error: " + error.code + " " + error.message);
    });
}
    
function addCount (Counter) {
  url=$(".post-content").attr('id').trim();
  title = $('.post-title').text().trim();
  var query=new AV.Query(Counter);

  //use url as unique idnetfication
  query.equalTo("url",url);
  
  query.find({
      success: function(results){
          if(results.length>0)
          {
              var counter=results[0];
              counter.fetchWhenSave(true); //get recent result
              counter.increment("time");
              counter.save();
          }
          else
          {
              var newcounter=new Counter();
              newcounter.set("title",title);
              newcounter.set("url",url);
              newcounter.set("time",1);
              newcounter.save(null,{
                  success: function(newcounter){
                  //alert('New object created');
                  },
                  error: function(newcounter,error){
                  alert('Failed to create');
                  }
                  });
          }
      },
      error: function(error){
          //find null is not a error
          alert('Error:'+error.code+" "+error.message);
      }
  });
}
