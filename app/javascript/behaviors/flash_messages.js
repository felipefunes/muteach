const flash_messages = document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const messages = document.querySelectorAll('.js-flash-msg')

    for (var i = 0; i < messages.length; i++) {
      messages[i].classList.add('js-flash-msg--fade-off');
    }
  }, 3500);
})

export default flash_messages;
