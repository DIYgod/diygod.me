// 顶部头像动画
// $('.site-master-avatar').on('mouseover', function () {
//   this.classList.add('animated', 'tada');
// });
// $('.site-master-avatar').on('mouseout', function () {
//   this.classList.remove('animated', 'tada');
// });

// subtitle
if (navigator.userAgent.match(/mobile/i)) {
  $('.menu-item').click(function () {
    const subtitle = $(this).find('.submenu');
    if (subtitle.length) {
      if (subtitle.height()) {
        subtitle.css({
          height: ''
        })
      } else {
        subtitle.css({
          height: subtitle[0].scrollHeight
        })
      }
    }
  })
} else {
  $('.menu-item').hover(function () {
    const subtitle = $(this).find('.submenu');
    if (subtitle.length) {
      subtitle.css({
        height: subtitle[0].scrollHeight
      })
    }
  }, function () {
    const subtitle = $(this).find('.submenu');
    if (subtitle.length) {
      subtitle.css({
        height: ''
      })
    }
  })
}

$('.des-of-author-title').click(function () {
  $('.des-of-author-title.active').removeClass('active');
  $('.des-of-author-des.active').removeClass('active');
  const index = $(this).data('index');
  $(this).addClass('active');
  $(`.des-of-author-des[data-index="${index}"]`).addClass('active');
});
