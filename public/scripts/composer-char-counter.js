
$(function(){
  $('.container .new-tweet textarea').keyup(function(){
    const inputLength = $(this).val().length;
      // console.log("Bill", inputLength)
    const $counter = $('.new-tweet .counter').text(140 - inputLength);
      // console.log($counter)
    if(inputLength <= 140) {
      $counter.css('color', 'black');
    } else {
      $counter.css('color', 'red');
    }
  });
});