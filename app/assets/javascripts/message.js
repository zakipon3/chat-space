$(function(){

  function buildHTML(message){
    if (message.image){
      var html = `<div class="message">
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
      var html = `<div class="message">
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
});
