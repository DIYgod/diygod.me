// 顶部头像动画
$('.site-master-avatar').on('mouseover', function () {
  this.classList.add('animated', 'tada');
});
$('.site-master-avatar').on('mouseout', function () {
  this.classList.remove('animated', 'tada');
});
