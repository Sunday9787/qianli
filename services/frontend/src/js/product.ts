import Swiper from 'swiper'
import $ from 'jquery'

interface State {
  id: number
}

const $buttons = $('.product-center-title .qianli-button')

const productSwiper = new Swiper('.product-center-swiper > .swiper-container', {
  allowTouchMove: false,
  autoHeight: true,
  speed: 1000
})

window.addEventListener('popstate', function (e) {
  const data = e.state as State
  productSwiper.slideTo(data.id)
  $buttons.eq(data.id).addClass('active').siblings().removeClass('active')
})

$('.product-center-title').on('click', '.qianli-button', function (e) {
  const index = $(e.target).index()
  $(e.target).addClass('active').siblings().removeClass('active')
  productSwiper.slideTo(index)

  // pushState
  const data = $(e.target).data() as State
  const url = new URL(location.href)
  url.searchParams.set('id', String(data.id))
  window.history.pushState(data, '', url)
})
