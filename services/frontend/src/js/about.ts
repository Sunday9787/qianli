import Swiper from 'swiper'

new Swiper('.about-environment-swiper > .swiper-container', {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 45,
  speed: 800,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: '.about-environment-swiper .next',
    prevEl: '.about-environment-swiper .prev'
  },
  loop: true,
  breakpoints: {
    1024: {
      spaceBetween: 25
    }
  }
})

new Swiper('.about-patent-swiper > .swiper-container', {
  slidesPerView: 3,
  centeredSlides: true,
  spaceBetween: 90,
  speed: 800,
  navigation: {
    nextEl: '.about-patent-swiper .about-patent__swiper-button.next',
    prevEl: '.about-patent-swiper .about-patent__swiper-button.prev'
  },
  loop: true,
  breakpoints: {
    1368: {
      spaceBetween: 60
    },
    1024: {
      spaceBetween: 30
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    680: {
      slidesPerView: 1,
      spaceBetween: 20
    }
  }
})

new Swiper('.about-partner-swiper .swiper-container', {
  slidesPerView: 5,
  spaceBetween: 0,
  slidesPerColumnFill: 'row',
  slidesPerColumn: 3,
  speed: 800,
  navigation: {
    nextEl: '.about-partner__button-group .next',
    prevEl: '.about-partner__button-group .prev'
  },
  breakpoints: {
    1368: {
      slidesPerView: 4
    },
    1024: {
      slidesPerView: 3
    },
    680: {
      slidesPerView: 2
    }
  }
})
