import Swiper from 'swiper'
import $ from 'jquery'

interface State {
  category: number
}

const $buttons = $('.product-center-title .qianli-button')

const productSwiper = new Swiper('.product-center-swiper > .swiper-container', {
  allowTouchMove: false,
  autoHeight: true,
  speed: 1000
})

function action(index: number) {
  if (index < 0) index = 0

  productSwiper.slideTo(index)
  $buttons.eq(index).addClass('active').siblings().removeClass('active')
}

window.addEventListener('popstate', function (e) {
  const data = e.state as State
  action(Number(data.category))
})

$('.product-center-title').on('click', '.qianli-button', function (e) {
  const index = $(e.target).index()
  $(e.target).addClass('active').siblings().removeClass('active')
  productSwiper.slideTo(index)

  // replaceState
  const data = $(e.target).data() as State
  const url = new URL(location.href)
  url.searchParams.set('category', String(data.category))
  window.history.replaceState(data, '', url)
})

setTimeout(function () {
  const url = new URL(location.href)
  const index = url.searchParams.get('category')
  action(Number(index) - 1)
}, 0)
