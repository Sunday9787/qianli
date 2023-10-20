import $ from 'jquery'
import log from '@sunday9787/log'

const fn = (message: string) => console.warn(message)

log(
  {
    label: 'jQuery',
    message: $.fn.jquery
  },
  ['#585858', '#1475b2']
)

log(
  {
    label: 'Swiper',
    message: '4.5.0'
  },
  ['#585858', '#1475b2']
)

log(process.env.ENV, 'env')
log(process.env.BUILD, 'build')
log(process.env.PLATFORM, 'platform')
log(process.env.VERSION, 'version')

{
  const text = 'Webpack 牛逼'
  fn(text)
}

$('.qianli-footer-backtop').on('click', function () {
  $('body,html').animate({ scrollTop: 0 }, 800)
})
