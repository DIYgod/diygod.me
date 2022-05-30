const Unidata = require('unidata.js').default;
const axios = require('axios');

function showNFT () {
  if (!NexT.utils.isMobile() && CONFIG.sidebar.nft) {
    const dom = document.querySelector('.sidebar-nft-body');

    if (dom) {
      window.chekNFTMimeType = (e) => {
        console.log(e);
      }

      const unidata = new Unidata({
        moralisWeb3APIKey: 'gqcVQSCpWGNlfs2nMM1xvW1pOmZhzHc058aNpEK8BKIp26Q39PJemBu5BJi6SZOD',
      });

      unidata.assets.get({
        identity: CONFIG.sidebar.nft,
        source: 'Ethereum NFT',
      }).then((nft) => {
        let html = '';
        for (let i = 0; i < nft.list.length; i++) {
          if (([
            '0x0251af933d0ace03f817a37613bf5f0a437021e1',
            '0x2953399124f0cbb46d2cbacd8a89cf0599974963',
            '0x5bc9c90be23af74db084934c683d80f722e074d9',
            '0x7ac04336b214ea81546685d2bf27222bc4ee02ea',
            '0xad47d554e3a527d5cb4712b79eabba4f6152abcd',
            '0x23a8c2ce858b2e66222567923641cb6417994caf',
            '0x6470f8d1fb3c757e878a7ab8231cf45d0d752fa5',
            '0x4de0881ca95106a3fa01007cd2e4fe773fc8ac99',
          ]).includes(nft.list[i]?.metadata?.collection_address)) {
            continue;
          }
          const item = nft.list[i]?.previews?.[nft.list[i]?.previews?.length - 1];
          if (item) {
            let itemElement = '';
            const type = item.mime_type?.split('/')[0];
            if (type === 'video') {
              itemElement = `<video src="${item.address}" preload="metadata" loop muted crossorigin="anonymous"></video>`;
            } else if (type === 'model') {
              itemElement = `<model-viewer src="${item.address}" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="1" camera-controls enable-pan crossorigin="anonymous"></model-viewer>`;
            } else if (type === 'text') {
              itemElement = `<iframe src="${item.address}" frameborder="0"></iframe>`;
            } else {
              itemElement = `<img src="${item.address}">`;
            }
            if (nft.list[i].related_urls?.length && type !== 'model') {
              html += `
                <a class="nft-item" target="_blank" href="${nft.list[i].related_urls[nft.list[i].related_urls.length - 1]}">
                  ${itemElement}
                </a>
              `;
            } else {
              html += `
                <div class="nft-item">
                  ${itemElement}
                </div>
              `;
            }
          }
        }

        dom.innerHTML = html;

        dom.querySelectorAll('.nft-item img').forEach((img) => {
          img.addEventListener('error', (e) => {
            const parentElement = e.path[0].parentElement;
            const src = e.path[0].src;
            parentElement.removeChild(e.path[0]);
            try {
              axios({
                url: src,
                method: 'HEAD',
              }).then((result) => {
                const type = result.headers['content-type']?.split('/')[0];
                if (type === 'video') {
                  itemElement = `<video src="${src}" preload="metadata" loop muted crossorigin="anonymous"></video>`;
                } else if (type === 'model') {
                  itemElement = `<model-viewer src="${src}" ar ar-modes="webxr scene-viewer quick-look" seamless-poster shadow-intensity="1" camera-controls enable-pan crossorigin="anonymous"></model-viewer>`;
                } else if (type === 'text') {
                  itemElement = `<iframe src="${src}" frameborder="0"></iframe>`;
                } else {
                  itemElement = `<img src="${item.address}">`;
                }
                parentElement.innerHTML = itemElement;
              });
            } catch (error) {
              parentElement.innerHTML = `<img src="${item.address}">`;
            }
          });
        });
      })
    }
  }
}

module.exports = showNFT;
