<template>
  <div class="fillcontain">
    <div class="table_container">

      <el-row  :gutter="20">
        <el-col :span="6" >
          <el-input  v-model="listQuery.shop_name" placeholder="店铺名称（输入全名）" ></el-input>
        </el-col>

        <el-col :span="6">
          <el-button type="success" icon="el-icon-search" @click.native="search" >搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click.native="reset">重置</el-button>
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        style="width: 100%">

        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                <span>{{ props.row.shop_name }}</span>
              </el-form-item>
              <el-form-item label="食品 ID">
                <span>{{ props.row.food_id }}</span>
              </el-form-item>
              <el-form-item label="食品介绍">
                <span>{{ props.row.food_content }}</span>
              </el-form-item>
              <el-form-item label="食品分类">
                <span>{{ props.row.food_type }}</span>
              </el-form-item>
              <el-form-item label="包装费">
                <span>{{ props.row.packing_fee }}</span>
              </el-form-item>
              <el-form-item label="销量">
                <span>{{ props.row.food_sales }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column
          label="食品名称"
          prop="food_name">
        </el-table-column>

        <el-table-column
          label="参考图">

          <template slot-scope="scope">
            <el-image style="width: 60px; height:40px "
                      :src="scope.row.food_pic">
            </el-image>
          </template>

        </el-table-column>

        <el-table-column
          label="食品介绍"
          prop="food_content">
        </el-table-column>

        <el-table-column
          label="食品价格"
          prop="food_total">
        </el-table-column>

        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[2, 3,5, 100,500]"
        :page-size="listQuery.limit"
        :total="total"
        @size-change="changeSize"
        @current-change="fetchPage"
        @prev-click="fetchPrev"
        @next-click="fetchNext">
      </el-pagination>
      <el-dialog title="修改食品信息"     :visible.sync="dialogFormVisible">
        <el-form :model="selectTable">
          <el-form-item label="食品名称" label-width="100px">
            <el-input v-model="selectTable.food_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍" label-width="100px">
            <el-input v-model="selectTable.food_content"></el-input>
          </el-form-item>

<!--          <el-form-item label="食品分类" label-width="100px">-->
<!--            <el-select v-model="selectIndex" :placeholder="selectMenu.label" @change="handleSelect">-->
<!--              <el-option-->
<!--                v-for="item in menuOptions"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.index">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="食品类型" label-width="100px">
            <el-cascader
              :options="categoryOptions"
              v-model="selectTable.food_type"
              :props="{ checkStrictly: true }"
              change-on-select
            ></el-cascader>
          </el-form-item>


          <el-form-item label="食品图片" label-width="100px">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :action="fileMgrUrl"
              :headers="uploadHeaders"
              :on-success="handleServiceAvatarScucess"
              :before-upload="beforeAvatarUpload">
              <img v-if="selectTable.food_pic" :src="selectTable.food_pic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

            <el-form-item label="包装费">
              <el-input-number v-model="selectTable.packing_fee" :min="0" :max="4"></el-input-number>
            </el-form-item>

            <el-form-item label="价格">
              <el-input-number v-model="selectTable.food_total" :min="0" :max="1000"></el-input-number>
            </el-form-item>

        </el-form>


        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateFood">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script src="./food.js"></script>

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
  .table_container{
    padding: 20px;
  }
  .Pagination{
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
