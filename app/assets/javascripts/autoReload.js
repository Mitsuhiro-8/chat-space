$(function(){
  function buildHTML(message){
    if (message.image){
      let html =
        `<div class="ChatMain__messageBox" data-message-id=${message.id}>
          <div class="ChatMain__info">
            <div class="ChatMain__userName">
              ${message.user_name}
            </div>
            <div class="ChatMain__date">
              ${message.created_at}
            </div>
          </div>
          <div class="ChatMain__message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="ChatMain__messageBox" data-message-id=${message.id}>
        <div class="ChatMain__info">
          <div class="ChatMain__userName">
            ${message.user_name}
          </div>
          <div class="ChatMain__date">
            ${message.created_at}
          </div>
        </div>
        <div class="ChatMain__message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.ChatMain__messageBox:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.ChatMain__messageList').append(insertHTML);
        $('.ChatMain__messageList').animate({ scrollTop: $('.ChatMain__messageList')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
   setInterval(reloadMessages, 7000);
});