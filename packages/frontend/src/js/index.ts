import Swiper from 'swiper'
import $ from 'jquery'
;(function () {
  let isMove = false

  //给页面绑定滑轮滚动事件
  $(document).on('mousewheel', function (event) {
    if (isMove) return

    const e = event.originalEvent as WheelEvent
    const top = $(window).scrollTop(),
      height = $(window).height(),
      isScroll = -e.deltaY

    if (isScroll < 0 && top < height) {
      isMove = true
      $('body,html').animate({ scrollTop: height }, 800, function () {
        isMove = false
      })

      return
    }

    if (isScroll > 0 && top <= height) {
      isMove = true
      $('body,html').animate({ scrollTop: 0 }, 800, function () {
        isMove = false
      })
    }
  })
})()

new Swiper('#product-container > .swiper-container', {
  slidesPerView: 1,
  spaceBetween: 0,
  effect: 'fade',
  speed: 600,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false
  },
  loop: true,
  navigation: {
    nextEl: '.product-pagination-group .next',
    prevEl: '.product-pagination-group .prev'
  },
  pagination: {
    el: '#product-container .swiper-pagination',
    type: 'bullets'
    // type: 'progressbar',
  },
  on: {
    slideChange() {
      $('#product-container .product-pagination-step-current').text('0' + String(this.realIndex + 1))
    }
  }
})

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

const productCenterSub = new Swiper('.product-center-sub > .swiper-container', {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 1000,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false
  },
  loop: true,
  watchSlidesVisibility: true //防止不可点击
})

new Swiper('.product-center-main > .swiper-container', {
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 800,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: '.product-center-main .product-center-navigation__button.next',
    prevEl: '.product-center-main .product-center-navigation__button.prev'
  },
  loop: true,
  thumbs: {
    swiper: productCenterSub
  }
})
