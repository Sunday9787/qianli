import Swiper from 'swiper'
import $ from 'jquery'

interface ProductDetail {
  category: string
  title: string
  name: string
  detail: string
  img: string[]
  media: string | null
  feature: ProductDetailFeature[]
  env: ProductDetailEnv[] | null
  spec: ProductDetailSpec[]
}

interface ProductDetailSpec {
  label: string
  value: string
}

interface ProductDetailEnv {
  icon: string
  img: string
  text: string
}

interface ProductDetailFeature {
  img: string
  text: string
}

const perViewSwiper = new Swiper('#product-detail-banner-swiper > .swiper-container.product-detail-swiper__preview', {
  slidesPerView: 'auto',
  direction: 'vertical',
  spaceBetween: 40,
  speed: 1000,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false
  },
  watchSlidesVisibility: true, //防止不可点击
  breakpoints: {
    900: {
      direction: 'horizontal',
      slidesPerView: 3
    },
    680: {
      direction: 'horizontal',
      slidesPerView: 3,
      spaceBetween: 10
    }
  },
  on: {
    click() {
      this.slideTo(this.clickedIndex)
    }
  }
})

new Swiper('#product-detail-banner-swiper > .swiper-container.product-detail-swiper', {
  slidesPerView: 1,
  spaceBetween: 0,
  effect: 'fade',
  speed: 800,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false
  },
  thumbs: {
    swiper: perViewSwiper
  }
})

declare global {
  interface Window {
    qianli_data?: { data: ProductDetail }
  }
}

if (window.qianli_data?.data.media) {
  const mediaElement = document.getElementById('media') as HTMLVideoElement
  mediaElement.pause()

  $('.product-detail-slide').on('click', '.product-detail-play', function (e) {
    $('.product-detail-dialog-container').show()
    mediaElement.play()
  })

  $('.product-detail-dialog-container').on('click', '.close', function (e) {
    $(e.delegateTarget).hide()
    mediaElement.pause()
  })

  $('.product-detail-dialog-container').on('click', '.close', function (e) {
    $(e.delegateTarget).hide()
    mediaElement.pause()
  })
}

if (window.qianli_data?.data.feature) {
  new Swiper('#product-detail-feature .swiper-container', {
    slidesPerView: 4,
    spaceBetween: 20,
    speed: 800,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.product-detail-feature-swiper .swiper-pagination',
      type: 'bullets'
    },
    navigation: {
      nextEl: '.product-detail-feature-swiper > .next',
      prevEl: '.product-detail-feature-swiper > .prev'
    },
    loop: true,
    breakpoints: {
      900: {
        slidesPerView: 3
      },
      680: {
        slidesPerView: 1
      }
    }
  })
}

$('.product-detail-env-banner').on('mouseenter', '.product-detail-env-slide', function (e) {
  const target = e.target as HTMLLIElement
  const data = $(target).data() as { img: string }
  $(e.delegateTarget).css({ backgroundImage: `url(${data.img})` })
})
