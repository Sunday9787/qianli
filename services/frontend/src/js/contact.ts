import $ from 'jquery'

$('.contact-job-table').on('click', '.contact-job-table-row.job', function (e) {
  const jobDetail = $(e.currentTarget).next()
  jobDetail.find('.contact-job-item-inner').slideToggle()
})
