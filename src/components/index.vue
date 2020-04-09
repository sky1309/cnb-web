<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="uid"
        label="UID"
        width="360">
      </el-table-column>
      <el-table-column
        prop="account_info.name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号" width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        fixed="left"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div>
      <el-row>
        <el-button @click="jumpRouting(url='')">默认按钮</el-button>

        <router-link to="myCenter">
          <el-button type="success">成功按钮</el-button>
        </router-link>
      </el-row>
    </div>
  </div>

</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import {get, del} from '../utils/request.js'
  // import { Message } from 'element-ui'
  export default {
    name: "index",
    data() {
      return {
        isCollapse: true,
        // centerOne: centerOne,
        tableData: this.tableData,
        row: this.row
      };
    },
    mounted() {
      this.getAccountInfo()
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      getAccountInfo() {
        get('account/', {"page": 1, "size": 10}).then(res => {
          if (res.data.code == '000000') {
            this.tableData = res.data.data
            this.$message.Message.success({message: "查询成功"})
          } else {
          }

        })
      },
      deleteAccount(accountId) {
        del('account/', {"account_id": accountId}).then(res => {
          if (res.data.code == '000000') {
            this.getAccountInfo()
            this.$message.Message.success({message: "删除成功AccountId:" + accountId})
          } else {
            this.$message.Message.error("删除失败:" + res.data.message)
          }

        })
      },

      handleClick(row) {
        this.row = row
      },
      handleDelete(row) {
        this.deleteAccount(row.id)
      },
      jumpRouting() {
        this.$router.push({path: "myCenter"})
      }


    }
  }


</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
