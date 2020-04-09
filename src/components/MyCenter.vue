<template>
  <div>
    <el-container>
      <el-main style="height: 100%;  margin: 0; padding: 0">
        <el-row style="height: 30px"></el-row>
        <el-row style="">
          <div class="myInfo">
            <div>
              <el-avatar :size="100" src="static/images/myHeader.jpeg"></el-avatar>
            </div>
            <div>我是一只不会飞的鱼</div>
          </div>
          <el-col :offset="3" :span="18">
            <el-divider>·</el-divider>
          </el-col>
        </el-row>
        <el-row style="">
          <el-col :span="4" style="min-height: 1px"></el-col>
          <el-col :span="16" style="">
            <div>
              <div class="infinite-list-wrapper articleList" style="overflow:auto">
                <ul
                  class="list"
                  infinite-scroll-disabled="disabled">
                  <li v-for="i in articleData" class="list-item">
                    <el-row>
                      <el-col :offset="3" :span="18" style="">
                        <div class="articleTop">
                          <el-row>
                            <el-col :span="12"><p class="articleTitle">{{i.title !== "" ? i.title:"暂无标题"}}</p></el-col>
                            <el-col :xs="6" :span="12">
                              <p class="articleTags">
                                <el-tag :key="tag.index" :color="tag.level" v-for="tag in i.tags.slice(0, 5)"
                                        :disable-transitions="false" style="color:white">
                                  {{tag.name}}
                                </el-tag>
                              </p>
                            </el-col>
                          </el-row>

                        </div>
                        <!--                        <p>序号：{{i.id}}</p>-->
                        <p class="articleContent">{{ i.content }}</p>
                        <div>
                          <el-row>
                            <el-col class="articleInfo" :span="12" :xs="24">
                              <a href=""><i class="el-icon-ice-tea"></i></a>
                              <i class="el-icon-phone"></i>
                            </el-col>
                            <el-col :span="12" :xs="24"><p class="articleCT" style="">
                              {{i.create_time.substring(0,10)}}</p>
                            </el-col>
                          </el-row>
                        </div>
                        <el-divider class="hidden-xs-only" content-position="center"></el-divider>
                      </el-col>

                    </el-row>


                  </li>
                </ul>
              </div>
              <el-row>
                <el-col :span="24">
                  <div style="">
                    <el-pagination
                      small
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-size="pagesize"
                      layout="prev, pager, next"
                      :total="total"
                    >
                    </el-pagination>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="4" style=""></el-col>
        </el-row>
        <el-row style="height: 50px; margin-top: 50px; font-size: 5px">
          <p>联系我 tel:10101010101</p>
          <p>Copyright © 飞鱼小站 fy98.cn All Rights Reserved
          </p>
        </el-row>
<!--        <el-row>-->
<!--          <article class="markdown-body" style="text-align:left" v-html="content"></article>-->
<!--          <mavon-editor-->
<!--            @imgAdd="handleEditorImgAdd"-->
<!--            @imgDel="handleEditorImgDel"-->
<!--            :boxShown="false"-->
<!--            style="height:600px"-->
<!--            v-model="value"-->
<!--            @change="change"-->
<!--            ref=md-->
<!--          />-->
<!--        </el-row>-->
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {get} from "../utils/request";

  export default {
    name: "MyCenter",
    data() {
      return {
        activeIndex: '1',
        count: 1,
        loading: false,
        handleSelect: '1',

        articleData: [],
        currentPage: 1,
        pagesize: 5,
        total: 0,
        value: "",
        content: '<h2><a id="CSS_0"></a>CSS入门属性</h2> <h3><a id="1css__1"></a>1.css 是什么</h3>',

      }
    },
    methods: {
      getList() {
        let that = this;
        get('article/', {'limit': this.pagesize, 'offset': (this.currentPage - 1) * this.pagesize})
          .then(function (res) {
            let len = res.data.results.length;
            that.total = res.data.count;
            that.articleData = res.data.results;
          })
          .catch(function (err) {
          })

      },
      handleSizeChange: function (size) {
        this.pagesize = size;
        this.getList();
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.getList();
      },
      change(value, render) {
        this.html = render;
        this.blogInfo.blogMdContent = value;
        this.blogInfo.blogContent = render;
      },
      //上传图片接口pos 表示第几个图片
      handleEditorImgAdd(pos, $file) {
        var formdata = new FormData();
        formdata.append('file', $file);
        this.$axios
          .post("http://localhost:8000/blogs/image/upload/", formdata)
          .then(res => {
            var url = res.data.data;
            this.$refs.md.$img2Url(pos, url);  //这里就是引用ref = md 然后调用$img2Url方法即可替换地址
          });
      },
      handleEditorImgDel() {
        console.log('handleEditorImgDel');    //我这里没做什么操作，后续我要写上接口，从七牛云CDN删除相应的图片
      }
    },
    mounted() {
      this.getList();
    }

  }
</script>
<style>
  .sysBox .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #FD7A3A;
    color: #FD7A3A;
  }

  .articleContent {
    margin: 15px;
    text-align: left;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    line-clamp: 2;
    text-indent: 40px;

  }

  .articleTitle {
    font-size: 22px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 180px;

  }

  .articleCT {
    display: block;
    text-align: right
  }

  .articleList {
    height: 1260px;
  }

  .articleList li {
    height: 250px;
    border: 1px;
  }

  .articleTags span {
    display: block;
    float: left;

  }

  .articleTags {
    float: right;
  }

  .articleInfo {
    display: block;
    text-align: left;
  }

  @media screen and (max-width: 1000px) {
    .articleTags {
      display: none;
    }

    .articleTitle {
      text-align: center;
      font-size: 16px;
    }

    .articleContent {
      margin: 5px;
      text-indent: 0px;
      font-size: 8px;
    }

    .articleCT {
      margin: 10px;
      text-align: center;
      font-size: 5px;
    }

    .articleList li {
      height: 160px;
    }

    .articleList {
      height: 850px;
    }
  }
</style>

