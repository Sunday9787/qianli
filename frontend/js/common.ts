import $ from 'jQuery'

$(window).on('scroll', function () {
  /**
   * 页面滚动距离
   */
  const top = $(window).scrollTop()

  if (top >= 10) {
    if (!$('.header').hasClass('pin')) {
      $('.header').addClass('pin')
    }
    return
  }

  if ($('.header').hasClass('pin')) {
    $('.header').removeClass('pin')
  }
})
