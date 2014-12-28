$(document).ready(function() {
  

  var rotate = function() {
  $("html")
    .delay(1000).queue(function() {
        $(this).removeClass("background-image-one");
        $(this).addClass("background-image-two");
        $(this).dequeue();
          next();
    })
    .delay(3000).queue(function() {
        $(this).removeClass("background-image-two");
        $(this).addClass("background-image-three");
        $(this).dequeue();
          next();
    })
    .delay(500).queue(function(next) {
        $(this).removeClass("background-image-three");
        $(this).addClass("background-image-four");
        $(this).dequeue();
          next();
     
    })
    .delay(500).queue(function(next) {
        $(this).removeClass("background-image-four");
        $(this).addClass("background-image-five");
        $(this).dequeue();
    
    })
    .delay(500).queue(function(next) {
        $(this).removeClass("background-image-five");
        $(this).addClass("background-image-one");
        $(this).dequeue();
        next();
    })
    .queue(rotate);
};

rotate();

});