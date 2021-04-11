<template>

  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="14" :offset="4">




          <el-form :model="foodForm" :rules="foodrules" ref="foodForm" label-width="110px" class="form food_form" style="margin-top: 100px">

            <el-form-item label="店铺名称" prop="name">
              <el-input v-model="foodForm.name"></el-input>
            </el-form-item>

            <el-form-item label="食品名称" prop="foodname">
              <el-input v-model="foodForm.foodname"></el-input>
            </el-form-item>

            <el-form-item label="食品种类">
              <el-select v-model="foodForm.food_type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>



            <el-form-item label="食品详情" prop="description">
              <el-input v-model="foodForm.description"></el-input>
            </el-form-item>
            <el-form-item label="上传食品图片">
              <el-upload
                class="avatar-uploader"
                :action="fileMgrUrl"
                :headers="uploadHeaders"
                :show-file-list="false"
                :on-success="uploadImg"
                :before-upload="beforeImgUpload">

                <img v-if="foodForm.image_path" :src="foodForm.imagePath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

            <el-form-item label="食品口味" >
              <el-input v-model="foodForm.food_flavor"></el-input>
            </el-form-item>

            <el-row v-if="foodSpecs == 'one'">
              <el-form-item label="包装费">
                <el-input-number v-model="foodForm.packing_fee" :min="0" :max="100"></el-input-number>
              </el-form-item>
              <el-form-item label="价格">
                <el-input-number v-model="foodForm.price" :min="0" :max="10000"></el-input-number>
              </el-form-item>
            </el-row>
            <el-row v-else style="overflow: auto; text-align: center;">
              <el-button type="primary" @click="dialogFormVisible = true" style="margin-bottom: 10px;">添加规格</el-button>
              <el-table
                :data="foodForm.specs"
                style="margin-bottom: 20px;"
                :row-class-name="tableRowClassName">
                <el-table-column
                  prop="specs"
                  label="规格">
                </el-table-column>
                <el-table-column
                  prop="packing_fee"
                  label="包装费">
                </el-table-column>
                <el-table-column
                  prop="price"
                  label="价格">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="addFood('foodForm')">确认添加食品</el-button>
            </el-form-item>
          </el-form>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script src="./add.js"></script>

<style lang="less">
  .form {
    min-width: 400px;
    margin-bottom: 30px;

    &:hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
      border-radius: 6px;
      transition: all 400ms;
    }
  }

  .food_form {
    border: 1px solid #eaeefb;
    padding: 10px 10px 0;
  }

  .form_header {
    text-align: center;
    margin-bottom: 10px;
  }

  .category_select {
    border: 1px solid #eaeefb;
    padding: 10px 30px 10px 10px;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }

  .add_category_row {
    height: 0;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
  }

  .showEdit {
    height: 185px;
  }

  .add_category {
    background: #f9fafc;
    padding: 10px 30px 0px 10px;
    border: 1px solid #eaeefb;
    border-top: none;
  }

  .add_category_button {
    text-align: center;
    line-height: 40px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border: 1px solid #eaeefb;
    border-top: none;
    transition: all 400ms;

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

  .cell {
    text-align: center;
  }
</style>
