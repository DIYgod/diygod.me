<template>
  <div class="home" v-loading="loading">
    <div class="column" v-for="column in data" :key="column.id">
      <h2 class="column-header">{{ column.name }}</h2>
      <el-row :gutter="20">
        <el-col :span="6" v-for="sub in column.sub" :key="sub.id" class="playlist">
          <router-link :to="`/video/${sub.id}`">
            <img class="playlist-poster" :src="`https://pan.prprpr.me/?/${column.id}/${sub.id}/poster.jpg`">
            <h3 class="playlist-title">{{ sub.name }}</h3>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      data: [],
      loading: true
    }
  },
  created: function () {
    this.axios
      .get('./album.json')
      .then(response => {
        this.data = response.data.data
        this.loading = false
      })
  }
}
</script>

<style scoped>
  .home {
    min-height: 100px;
  }

  .column-header {
    font-size: 16px;
    margin-top: 0;
  }

  .playlist {
    margin-bottom: 20px;
  }

  .playlist-poster {
    width: 100%;
    height: 125.89px;
    background: #eee;
    border-radius: 4px;
  }

  .playlist-title {
    margin: 8px 0;
    font-size: 14px;
  }
</style>
