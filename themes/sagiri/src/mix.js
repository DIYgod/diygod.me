// 顶部头像动画
$('.site-master-avatar').on('mouseover', function () {
  this.classList.add('animated', 'tada');
});
$('.site-master-avatar').on('mouseout', function () {
  this.classList.remove('animated', 'tada');
});

// subtitle
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
