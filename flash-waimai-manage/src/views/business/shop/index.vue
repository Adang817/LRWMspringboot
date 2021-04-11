<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.name" placeholder="店铺名称（可模糊查询）"></el-input>
        </el-col>

        <el-col :span="6">
          <el-button type="success" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
        </el-col>
      </el-row>
      <br>
      <div class="table_container">
        <el-table
          stripe
          :data="tableData"
          style="width: 100%"
        >

          <el-table-column type="expand">
            <template slot-scope="props">

              <el-form label-position="left" inline class="demo-table-expand">


                <el-form-item label="店铺名称">
                  <span>{{ props.row.shop_name }}</span>
                </el-form-item>

                <el-form-item label="店铺头像">
                  <el-image style="width: 60px; height:40px "
                            :src="props.row.shop_pic">
                  </el-image>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.shop_address }}</span>
                </el-form-item>
                <el-form-item label="店铺介绍">
                  <span>{{ props.row.shop_content }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.shop_id }}</span>
                </el-form-item>
                <el-form-item label="联系电话">
                  <span>{{ props.row.shop_phone }}</span>
                </el-form-item>
                <el-form-item label="销售额">
                  <span>{{ props.row.shop_sales }}</span>
                </el-form-item>
                <el-form-item label="分类">
                  <span>{{ props.row.shop_classification }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column
            label="店铺名称"
            prop="shop_name">
          </el-table-column>

<!--          <el-table-column-->
<!--            label="店铺头像"-->
<!--            prop="shop_pic">-->
<!--        <el-image style="width: 60px; height:40px "-->
<!--            :src="props.row.shop_pic">-->
<!--            </el-image>-->
<!--          </el-table-column>-->

          <el-table-column
            label="店铺介绍"
            prop="shop_content">
          </el-table-column>

          <el-table-column
            label="电话"
            prop="shop_phone">
          </el-table-column>

          <el-table-column
            label="店铺分类"
            prop="shop_classification">
          </el-table-column>

<!--          操作-->
          <el-table-column label="操作" width="350">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="success"
                @click="addFood(scope.$index, scope.row)">添加食品
              </el-button>
              <el-button
                size="mini"
                type="info"
                @click="viewFood(scope.$index, scope.row)">查看食品
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[2, 3, 5, 100,500]"
          :page-size="listQuery.limit"
          :total="total"
          @size-change="changeSize"
          @current-change="fetchPage"
          @prev-click="fetchPrev"
          @next-click="fetchNext">
        </el-pagination>


        <el-dialog title="修改店铺信息"
                   :visible.sync="dialogFormVisible"
        >
          <el-form :model="selectTable">

            <el-form-item label="店铺名称" label-width="100px">
              <el-input v-model="selectTable.shop_name" auto-complete="off"></el-input>
            </el-form-item>
<!--            v-model="address.address"-->
<!--            <el-form-item label="详细地址" label-width="100px">-->
<!--              <el-autocomplete-->
<!--                v-model="address.address"-->
<!--                :fetch-suggestions="querySearchAsync"-->
<!--                placeholder="请输入地址"-->
<!--                style="width: 100%;"-->
<!--                @select="addressSelect"-->
<!--              ></el-autocomplete>-->
<!--              <span>当前城市：{{city.name}}</span>-->
<!--            </el-form-item>-->

            <el-form-item label="详细地址" label-width="100px">
              <el-input v-model="selectTable.shop_address"></el-input>
            </el-form-item>

            <el-form-item label="店铺介绍" label-width="100px">
              <el-input v-model="selectTable.shop_content"></el-input>
            </el-form-item>

            <el-form-item label="联系电话" label-width="100px">
              <el-input v-model="selectTable.shop_phone"></el-input>
            </el-form-item>

            <el-form-item label="店铺分类" label-width="100px">

              <el-cascader
                :options="categoryOptions"
                v-model="selectTable.shop_classification"
                :props="{ checkStrictly: true }"
                change-on-select
              ></el-cascader>

            </el-form-item>
            <el-form-item label="商铺图片" label-width="100px">
              <el-upload
                class="avatar-uploader"
                :action="fileMgrUrl"
                :headers="uploadHeaders"
                :show-file-list="false"
                :on-success="handleServiceAvatarScucess"
                :before-upload="beforeAvatarUpload">

                <img v-if="selectTable.shop_pic" :src="selectTable.shop_pic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateShop">确 定</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script src="./shop.js"></script>


<style lang="less">
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .table_container {
    padding: 20px;
  }

  .Pagination {
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>
