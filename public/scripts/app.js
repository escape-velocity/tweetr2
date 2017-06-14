// Document ready
$(function() {
  function createTweetElement(tweet) {
    const { name, handle } = tweet.user;
    const html = `
      <article class="tweet">
        <header>
          <img src="${tweet.user.avatars.small}" class="userPic">
          <h3>${ name }</h3>
          <p>${ handle }</p>
        </header>
          <p>${ tweet.content.text }</p>
        <footer>
          <div class="icons">
          <i class="fa fa-flag"></i>
          <i class="fa fa-heart"></i>
          <i class="fa fa-retweet"></i>
          </div>
          <p>${moment(new Date(tweet.created_at)).startOf('hour').fromNow()}</p>
        </footer>
      </article>
    `;
    return html;
  }


  // This loops through
  function renderTweets(tweets) {
    var $tweetContainer = $('#alltweets');
    $tweetContainer.empty();
    tweets.forEach(function(tweet) {
      $tweetContainer.prepend(createTweetElement(tweet));
    });
    // This one calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        renderTweets(data);
      }
    });
  }
  loadTweets();

  function createNewTweet(data) {

    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: data,
      success: loadTweets
    });
  }

  $('form').submit(function(evt) {
    evt.preventDefault();
    var text = $('textarea').val();
    if (text.length === 0) {
      alert('You forgot to put something in the form field');
    } else if (text.length > 140) {
      alert('Max Character limit exceeded');
    } else {
      var formStuff = $( this ).serialize();
      createNewTweet(formStuff);
      $('textarea').val('');
    }
  });

  $("button").click(function() {
    $(".new-tweet").slideToggle();
    $('textarea').focus();
    $("body").scrollTop(0);
  });

  $(".new-tweet").hide();

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
});

