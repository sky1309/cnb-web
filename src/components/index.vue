<template>
  <div>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse" background-color="#545c64" active-text-color="#ffd04b" text-color="#fff">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">首页</span>
        </template>
        <el-menu-item-group>
          <span slot="title">个人中心</span>
          <el-menu-item id="one" v-for="item in centerOne" :key="item.index"><p v-if="item.value=='值1'">{{ item.value }}</p>
            <p v-else item.value="value">{{ item.value }} + 1</p>
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">精彩空间</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">设置</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">帮助中心</span>
      </el-menu-item>
    </el-menu>
    <!--    <div id="one"  v-for="item in centerGroup"><h1>{{ item.index }}</h1></div>-->

  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "index",
    data() {
      return {
        isCollapse: true,
        centerOne: [
          {
            value: "值1",
            index: "1 - 1"
          },
          {
            value: "值2",
            index: "1 - 2"
          }
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
  window.onload = function () {
    var center = new Vue({
      el: '#one',
      data: {
        centerGroup: [
          {
            value: "值1",
            index: 1 - 1
          },
          {
            value: "值2",
            index: 1 - 2
          }
        ]
      }
    })
  }

</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
