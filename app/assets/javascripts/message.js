$(function(){
  function buildHTML(message){
    if(message.image){
      let html =
        `<div class="ChatMain__info">
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
        </div>`
      return html;
    } else {
      let html = 
       `<div class="ChatMain__info">
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
        </div>`
      return html;
    };
  }
  $('.ChatMain__form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      $('.ChatMain__messageList').append(html);
      $('.ChatMain__messageList').animate({ scrollTop: $('.ChatMain__messageList')[0].scrollHeight});
      $('.ChatMain__form')[0].reset();
      $('.ChatMain__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  });
});