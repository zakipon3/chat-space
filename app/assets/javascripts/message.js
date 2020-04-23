$(function(){

  function buildHTML(message){
    if (message.image){
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message-info">
                      <div class="user">
                        ${message.user_name}
                      </div>
                      <div class="date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="text">
                      <p class="text__content">
                        ${message.content}
                      </p>
                    </div>
                    <img class="text__image" src=${message.image}>
                  </div>`
      return html;
    } else {
      var html = `<div class="message" data-message-id=${message.id}>
                    <div class="message-info">
                      <div class="user">
                        ${message.user_name}
                      </div>
                      <div class="date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="text">
                      <p class="text__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
      return html;
    };
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $(".main__chatspace").append(html)
      $('.main__chatspace').animate({ scrollTop: $('.main__chatspace')[0].scrollHeight});
      $("form")[0].reset();
    })
    .fail(function(message){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $(".btn").removeAttr("disabled");
    })
  })

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
        console.log(insertHTML);
  });
      $('.main__chatspace').append(insertHTML);
      $('.main__chatspace').animate({ scrollTop: $('.main__chatspace')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
