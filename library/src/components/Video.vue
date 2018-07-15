<template>
  <div class="video" v-loading="loading">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item>{{ data.name }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ video.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="player">
      <el-col class="dplayer-wrap"><div class="dplayer" ref="dplayer"></div></el-col>
      <el-col class="player-playlist">
        <div class="album-name">{{ data.name }}</div>
        <ul class="playlist">
          <li
            v-for="(video, i) in data.video"
            :key="video.id || video.name"
            :class="{ active: index ===  i }"
            v-on:click="switchVideo(i)"
            >{{ video.name }}</li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['id'],
  name: 'Video',
  data () {
    return {
      data: {},
      loading: true,
      index: 0,
    }
  },
  computed: {
    video: function () {
      return this.data.video ? this.data.video[this.index] : {}
    }
  },
  created: function () {
    this.axios
      .get(`./${this.id}.json`)
      .then(response => {
        this.data = response.data.data
        document.title = `${this.data.name} | DIYgod 的媒体库`
        this.loading = false
        window.dp = new window.DPlayer({
          container: this.$refs.dplayer,
          autoplay: true,
          video: {
              url: `https://pan.prprpr.me/?/${this.data.album}/${this.id}/${this.video.id || this.video.name}.mp4`,
          },
          danmaku: {
              id: `${this.data.album}-${this.id}-${this.video.id || this.video.name}`,
              api: 'https://dplayer.prprpr.me/',
              addition: this.video.cid ? [`https://dplayer.prprpr.me/v3/bilibili?cid=${this.video.cid}`] : null,
          }
        })
        window.dp.on('ended', () => {
          this.switchVideo(this.index === this.data.video.length - 1 ? 0 : this.index + 1)
        })
      })
  },
  methods: {
    switchVideo: function (i) {
      if (i !== this.index) {
        this.index = i;
        window.dp.switchVideo({
          url: `https://pan.prprpr.me/?/${this.data.album}/${this.id}/${this.video.id || this.video.name}.mp4`,
        }, {
          id: `${this.data.album}-${this.id}-${this.video.id || this.video.name}`,
          api: 'https://dplayer.prprpr.me/',
          addition: this.video.cid ? [`https://dplayer.prprpr.me/v3/bilibili?cid=${this.video.cid}`] : null,
        });
      }
    }
  }
}
</script>

<style scoped>
  .video-title {
    font-size: 16px;
  }

  .breadcrumb {
    margin-bottom: 30px;
  }

  .player {
    height: 405px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
  }

  .dplayer-wrap {
    width: 720px;
    height: 100%;
  }

  .dplayer {
    height: 100%;
  }

  .player-playlist {
    height: 100%;
    width: 260px;
  }

  .album-name {
    padding: 20px;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    height: 22px;
    background: rgba(238, 238, 238, 0.3);
  }

  .playlist {
    margin: 0;
    padding: 0;
    list-style-type: none;
    height: 343px;
    overflow: scroll;
  }

  .playlist li {
    padding: 10px 20px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
    color: #999;
  }

  .playlist li:hover {
    background: rgb(240, 240, 240);
  }

  .playlist li.active {
    cursor: default;
    color: #222;
    background: none;
  }
</style>
