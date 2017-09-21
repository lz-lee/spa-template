<template>
  <div class="upload-wrapper" @click="upload">
    <span class="icon-add" v-show="!thum">+</span>
    <img :src="thum" v-show="thum" class="avatar">
    <input type="file" class="upload-img-button" :name="name" ref="fileInput" @change="picChange">
  </div>
</template>

<script>
export default {
  props: ['src', 'name'],
  data() {
    return {
      thum: ''
    }
  },
  watch: {
    src(val) {
      this.thum = val
    }
  },
  methods: {
    upload() {
      this.$refs['fileInput'].click()
    },
    picChange() {
      let file = this.$refs['fileInput'].files[0]
      // 图片类型
      //  const isType = (file.type === 'image/jpeg' || file.type ===
      // 'image/png')
      // 文件大小
      // const isLt5M = file.size / 1024 / 1024 < 5

      if (file) {
        let render = new FileReader()
        let that = this
        debugger
        render.onload = function(e) {
          // 限制尺寸
          // let image = new Image()
          // image.onload = function() {
          //   console.log(this.width)
          //   console.log(this.height)
          // }
          // image.src = e.target.result
          that.thum = e.target.result
        }
        render.readAsDataURL(file)
        this.$emit('setFormData', {
          name: this.name,
          value: file
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .upload-wrapper{
    display: table-cell;
    text-align:center;
    vertical-align: middle;
    width:150px;
    height:150px;
    border:2px dashed #ccc;
    border-radius:4px;
    &:hover{
      cursor: pointer;
    }
    .icon-add{
      font-size: 20px;
      color:#ccc;
      margin: 0 auto;
    }
    .avatar{
      width:100%;
      border-radius: 0;
    }
    .upload-img-button{
      display:none;
    }
  }
</style>
