$(document).ready(function(){
  var scrollTop = 0;
  $(window).scroll(function(){
    scrollTop = $(window).scrollTop();
     $('.counter').html(scrollTop);
    var value = 390;
    if (scrollTop >= value) {
      $('#navbar').addClass('scrolled-nav');
    } else if (scrollTop < value) {
      $('#navbar').removeClass('scrolled-nav');
    } 
    
  }); 
  
});

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});


let height = $( "#gray" ).height();
console.log(height);