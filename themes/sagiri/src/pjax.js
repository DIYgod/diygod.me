require('jquery-pjax');
const NProgress = require('nprogress');

NProgress.configure({
  showSpinner: false,
  easing: 'ease-out',
  speed: 1000
});

$(document).pjax('a:not(.fancybox):not([target="_blank"])', '#main', {
  scrollTo: $('.main').position().top - 60,
  fragment: '#main',
  timeout: 5000,
});

let nftBody;

$(document).on('pjax:start', function () {
    NProgress.start();
    $('html, body').animate({
      scrollTop: $('.main').position().top - 60
    }, 500);

    if (window.dplayers) {
      for (let i = 0; i < window.dplayers.length; i++) {
          window.dplayers[i].destroy();
      }
      window.dplayers = [];
    }
    if (window.aplayers) {
      for (let i = 0; i < window.aplayers.length; i++) {
        window.aplayers[i].destroy();
      }
      window.aplayers = [];
    }

  if (!$('.sidebar-nft-body').hasClass('sidebar-nft-loading')) {
    nftBody = $('.sidebar-nft-body').html();
  } else {
    nftBody = null;
  }
});

$(document).on('pjax:end', function () {
  NProgress.done();

  if (nftBody) {
    $('.sidebar-nft-body').html(nftBody);
    $('.sidebar-nft-body').removeClass('sidebar-nft-loading');
  }

    require('./post-details')();
    require('./leancloud')();
    require('./share')();
    require('./pisces')();
    require('./zoom')();
    require('./nft')();
    window.originTitle = document.title;

    if (ga) {
      ga('set', 'location', window.location.href);
      ga('send', 'pageview');
    }

    $('.site-overview, .post-toc').css('max-height', document.body.clientHeight - 164);
});
