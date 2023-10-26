import $ from 'jquery'

$('.contact-job-table').on('click', '.contact-job-table-row.job', function (e) {
  const jobDetail = $(e.currentTarget).next()
  jobDetail.find('.contact-job-item-inner').slideToggle()
})

$('.contact-form-container').on('submit', '.contact-form', function (e) {
  e.preventDefault()
  const target = e.currentTarget as HTMLFormElement

  $.ajax({
    url: '/api/contact/feedback',
    method: 'put',
    data: $(target).serialize(),
    success(data) {
      target.reset()
      console.log(data)
    }
  })
})
