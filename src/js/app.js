import $ from "jquery";
import Swiper from 'swiper';
import '../../node_modules/jquery-popup-overlay/jquery.popupoverlay';
import '../../node_modules/jquery-mask-plugin/dist/jquery.mask.min';
import '../../node_modules/jquery-validation/dist/jquery.validate.min';

// ---- SCROLL ----

$(window).scroll(function() {
  if($(this).scrollTop() > 0) {
    $('.nav').addClass('scroll');
  }
  else {
    $('.nav').removeClass('scroll');
  }
});
var swiper = new Swiper('.how-work__slider .swiper-container', {
  spaceBetween: 30,
  effect: 'fade',
  autoHeight: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});
var swiperTwo = new Swiper('.tech-char__slider .swiper-container', {
  spaceBetween: 30,
  effect: 'fade',
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

function readMore() {
  var elem = $('.tech-char__block_info');
  var fullHeight = $('.tech-char__block_text').innerHeight();
  var maxHeight = 124;
  var moreText = 'Подробнее';
  var lessText = 'Спрятать';
  var btn = $('.more-info');

  $(window).resize(function(event) {
    fullHeight = $('.tech-char__block_text').innerHeight();
    if (parseInt(elem.css('height'), 10) !== fullHeight && parseInt(elem.css('height'), 10) !== maxHeight) {
      elem.css('height', maxHeight).animate({
          height: fullHeight,
        },
        1000, function() {
        });
    }
  });

  elem.css({
    height: maxHeight
  });

  btn.click(function(e) {
    e.preventDefault();

    if (parseInt(elem.css('height'), 10) !== fullHeight) {
      elem.css('height', maxHeight).animate({
          height: fullHeight,
        },
        1000, function() {
          elem.addClass('active');
          btn.html(lessText);
        });
    }
    else {
      elem.animate({
          height: maxHeight,
        },
        1000, function() {
          elem.css('height', maxHeight);
          elem.removeClass('active');
          btn.html(moreText);
        });
    }

  });
}
readMore();

$(document).ready(function() {
  // ---- POPUP ----
  $('.modal').popup({
    transition: 'all 0.3s',
    outline: true, // optional
    focusdelay: 400, // optional
    vertical: 'top', //optional
    // onclose: function() {
    //   $(this).find('label.error').remove();
    // }
  });
  // ---- NAV-BURGER ----
  $('.nav__button').click(function() {
    $('.menu').toggleClass('active');
    $('.nav__button').toggleClass('active');
    $('.nav').toggleClass('active');
  });
  $('a[href="#"]').click(function (event) {
    event.preventDefault();
  });
// --- jQuery Mask + jquery VALIDATION ---
  $('input[type="tel"]').mask('+7 (000) 000-00-00');
  jQuery.validator.addMethod('phoneno', function(phone_number, element) {
    return this.optional(element) || phone_number.match(/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/);
  }, 'Введите Ваш телефон');

  $('.form').each(function(index, el) {
    $(el).addClass('form-' + index);

    $('.form-' + index).validate({
      rules: {
        name: 'required',
        agree: 'required',
        tel: {
          required: true,
          phoneno: true
        }
      },
      messages: {
        name: 'Неправильно введенное имя',
        tel: 'Неправильно введен телефон',
        agree: 'Нужно соглашение на обработку данных',
      },
      submitHandler: function(form) {
        var t = $('.form-' + index).serialize();
        console.log(t);
        ajaxSend('.form-' + index, t);
      }
    });
  });
  function ajaxSend(formName, data) {
    jQuery.ajax({
      type: 'POST',
      url: 'sendmail.php',
      data: data,
      success: function() {
        $('.modal, .modal-flag').popup('hide');
        $('#thanks').popup('show');
        setTimeout(function() {
          $(formName).trigger('reset');
        }, 2000);
      }
    });
  };

var mapControl = document.getElementById('map') !== null ? initMap() : console.log('Тут нет карты');

});
