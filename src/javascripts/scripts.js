// Load jQuery from NPM
import $ from 'jquery';
import isEmail from 'is-email';

window.jQuery = $;
window.$ = $;
require('jquery.marquee');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms / 2));

const animateIntro = async () => {
  const textLayers = $('.intro__text-layer');
  const bgLayers = $('.intro__bg-layer');
  const slashes = $('.slash img');
  const counter = $('.counter__progress');
  const curtainsUp = async () => {
    $('.progress-bar__part').addClass('progress-bar__part--hide');
    await delay(1400);
    $('.loader').remove();
    window.scrollTo(0, 0);
  };
  const interval = setInterval(() => {
    counter.text(+counter.text() + 1);
    if (counter.text() === '100') {
      clearInterval(interval);
      curtainsUp();
    }
  }, 5000 / 100);
  let slashIndex = 0;
  const showT = (index) => textLayers.eq(index).addClass('intro__text-layer--show');
  const hideT = (index) => textLayers.eq(index).addClass('intro__text-layer--hide');
  const showBg = (index) => bgLayers.eq(index).addClass('intro__bg-layer--show');
  const hideBg = (index) => bgLayers.eq(index).addClass('intro__bg-layer--hide');
  const showProgress = () => {
    $('.progress-bar').addClass('progress-bar--show');
    $('.counter').addClass('counter--show');
  };
  const showNextSlash = () => {
    slashes.eq(slashIndex).addClass('show');
    slashIndex += 1;
  };
  await delay(1000);
  showProgress();
  await delay(1000);
  showT(0);
  showBg(0);
  showNextSlash();
  await delay(2500);
  hideBg(0);
  hideT(0);
  await delay(200);
  showT(1);
  showBg(1);
  showNextSlash();
  await delay(200);
  showT(2);
  await delay(2500);
  hideT(1);
  await delay(200);
  hideT(2);
  hideBg(1);
  await delay(200);
  showT(3);
  showBg(2);
  showNextSlash();
  await delay(200);
  showT(4);
};

$(document).ready(() => {
  // loader stuff
  animateIntro();

  $('.table__header-line-wrapper').css({
    width: $('.main__table').width() - 2,
  });
  if ($(window).width() > 767) {
    $('[data-marquee-trigger]').hover(
      (e) => {
        const index = $(e.currentTarget).attr('data-marquee-trigger');
        $('[data-marquee]').removeClass('table__header-line--show');
        $(`[data-marquee="${index}"]`).addClass('table__header-line--show');
      },
      () => {
        $('[data-marquee]').removeClass('table__header-line--show');
        $('[data-marquee="0"]').addClass('table__header-line--show');
      },
    );
    $('.marquee').marquee({
      duration: 15000,
      duplicated: true,
      gap: 0,
      startVisible: true,
    });
  } else {
    $('[data-marquee="0"]').text('ALLIED TRUCKING');
  }
  $('.table-link__show-hide').on('click', (e) => {
    $(e.currentTarget).toggleClass('table-link__show-hide--show');
    $(e.currentTarget).closest('.table-link').toggleClass('table-link--mobile-hover');
    $(e.currentTarget).prev().toggleClass('table-link__text--visible');
    if ($(e.currentTarget).hasClass('table-link__show-hide--show')) {
      const text = 'About'; // $(e.currentTarget).parent().find('.table-link__footer').text();
      $('.table__header-line').text(text);
    } else {
      $('.table__header-line').text('ALLIED TRUCKING');
    }
  });

  

  // form stuff
  const input = $('.input__field');
  const form = $('form');
  const messageButton = $('.message-button');
  const showMessageButton = () => messageButton.addClass('message-button--visible');
  const hideMessageButton = () => messageButton.removeClass('message-button--visible');
  const handlePageScroll = () => {
    const inputRect = input.get(0).getBoundingClientRect();
    if (inputRect.top - inputRect.height > window.innerHeight) {
      showMessageButton();
    } else {
      hideMessageButton();
    }
  };
  messageButton.on('click', () => input.focus());
  $(window).on('scroll', handlePageScroll);
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
        form
          .addClass('form--valid')
          .removeClass('form--invalid');
      } else {
        form
          .removeClass('form--valid')
          .addClass('form--invalid');
      }
    } else {
      form.removeClass('form--has-value form--valid form--invalid');
    }
  }
  handlePageScroll();
  handleBlurState();
  handleFormState();
  input.on('input', handleFormState);
});
