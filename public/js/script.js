$(document).ready(() => {
   let close = $('.alert-close');
   close.on('click', (e) => {
      //console.log(`Clicked!!`);
      $(e.target).parent().fadeOut(1000);
      let secMsg = $(e.target).parent().parent().parent();
      //console.log(secMsg);
      secMsg.css('display', 'none');
   });

});