import Swiper from 'Swiper'
import $ from 'jQuery'
;(function () {
  let isMove = false

  //给页面绑定滑轮滚动事件
  $(document).on('mousewheel', function (event) {
    if (isMove) return false
    const e = event.originalEvent as WheelEvent
    const h = $(window).scrollTop(),
      aboutTop = $(window).height(),
      isScroll = -e.deltaY

    if (isScroll < 0 && h < aboutTop) {
      isMove = true
      $('body,html').animate(
        {
          scrollTop: aboutTop
        },
        800,
        function () {
          isMove = false
        }
      )
    } else if (isScroll > 0 && h <= aboutTop) {
      isMove = true
      $('body,html').animate(
        {
          scrollTop: 0
        },
        800,
        function () {
          isMove = false
        }
      )
    }
  })
})()

const solveItemSwiper = new Swiper('#solve-item > .swiper-container', {
  slidesPerView: 5,
  spaceBetween: 6,
  speed: 800,
  watchSlidesVisibility: true, //防止不可点击
  breakpoints: {
    1024: {
      slidesPerView: 4
    },
    768: {
      slidesPerView: 3
    },
    680: {
      slidesPerView: 1
    }
  }
})

new Swiper('#solve-container > .swiper-container', {
  slidesPerView: 1,
  initialSlide: 1,
  spaceBetween: 0,
  effect: 'fade',
  speed: 1000,
  navigation: {
    nextEl: '#solve-item > .solve-button.next',
    prevEl: '#solve-item > .solve-button.prev'
  },
  thumbs: {
    swiper: solveItemSwiper
  }
})
