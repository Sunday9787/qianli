import $ from 'jquery'
import 'swiper/dist/css/swiper.css'

$(window).on('scroll', function () {
  /**
   * 页面滚动距离
   */
  const top = $(window).scrollTop()

  if (top >= 10) {
    if (!$('.qianli-header-ghost').hasClass('pin')) {
      $('.qianli-header-ghost').addClass('pin')
    }
    return
  }

  if ($('.qianli-header-ghost').hasClass('pin')) {
    $('.qianli-header-ghost').removeClass('pin')
  }
})

// 显示动画
const offset = 60

$(window).on('scroll', function () {
  $('[qianli-animate*="animate"]')
    .filter(function (index, item) {
      return !$(item).hasClass('qianli-animate-appear')
    })
    .each(function (index, element) {
      const rect = element.getBoundingClientRect()
      if (window.innerHeight - rect.top >= offset) {
        $(element).addClass('qianli-animate-appear')
      }
    })
})

window.dispatchEvent(new Event('scroll'))
