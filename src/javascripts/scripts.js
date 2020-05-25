// Load jQuery from NPM
import $ from 'jquery';
import isEmail from 'is-email';

window.jQuery = $;
window.$ = $;
require('jquery.marquee');


$(document).ready(() => {
  $('.table__header-line-wrapper').css({
    width: $('.main__table').width() - 2,
  });
  if ($(window).width() > 768) {
    $('#marquee').marquee({
      duration: 15000,
      duplicated: true,
      gap: 0,
      startVisible: true,
    });
  } else {
    $('#marquee').text('ALLIED TRUCKING');
  }
  $('.table-link__show-hide').on('click', (e) => {
    $(e.currentTarget).toggleClass('table-link__show-hide--show');
    $(e.currentTarget).prev().toggleClass('table-link__text--visible');
  });

  // form stuff
  const input = $('.input__field');
  const form = $('form');
  const handleInputFocus = () => {
    $('.input').addClass('input__focus');
  };
  input.on('focus', handleInputFocus);
  const handleBlurState = () => {
    if (!input.val()) {
      $('.input').removeClass('input__focus');
    } else {
      handleInputFocus();
    }
  };
  input.on('blur', handleBlurState);
  $(form).on('submit', (e) => {
    const val = input.val();
    if (!isEmail(val)) {
      e.preventDefault();
    }
  });
  function handleFormState() {
    const val = input.val();
    if (val) {
      form.addClass('form--has-value');
      if (isEmail(val)) {
        form.addClass('form--valid');
        form.removeClass('form--invalid');
      } else {
        form.removeClass('form--valid');
        form.addClass('form--invalid');
      }
    } else {
      form.removeClass('form--has-value');
      form.removeClass('form--valid');
      form.removeClass('form--invalid');
    }
  }
  handleBlurState();
  handleFormState();
  input.on('input', handleFormState);
});
