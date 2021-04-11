<template>
  <div class="app-container">
    <div class="block" style="margin-top: 150px">
      <el-row>
        <el-col :span="12" :offset="4">
          <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">

            <el-form-item label="店铺名称" prop="name">
              <el-input v-model="formData.name"></el-input>
            </el-form-item>

            <el-form-item label="详细地址" prop="address">
              <el-input v-model="formData.address"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model.number="formData.phone" maxLength="11"></el-input>
            </el-form-item>

            <el-form-item label="店铺简介" prop="description">
              <el-input v-model="formData.content"></el-input>
            </el-form-item>

            <el-form-item label="店铺分类">
              <el-cascader
                :options="categoryOptions"
                v-model="formData.classification"
                change-on-select
              ></el-cascader>
            </el-form-item>

<!--            <el-form-item label="配送费" prop="float_delivery_fee">-->
<!--              <el-input-number v-model="formData.float_delivery_fee" :min="0" :max="20"></el-input-number>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="起送价" prop="float_minimum_order_amount">-->
<!--              <el-input-number v-model="formData.float_minimum_order_amount" :min="0" :max="100"></el-input-number>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="营业时间" style="white-space: nowrap;">-->
<!--              <el-time-select-->
<!--                placeholder="起始时间"-->
<!--                v-model="formData.startTime"-->
<!--                :picker-options="{-->
<!--							start: '05:30',-->
<!--							step: '00:15',-->
<!--							end: '23:30'-->
<!--							}">-->
<!--              </el-time-select>-->
<!--              <el-time-select-->
<!--                placeholder="结束时间"-->
<!--                v-model="formData.endTime"-->
<!--                :picker-options="{-->
<!--							start: '05:30',-->
<!--							step: '00:15',-->
<!--							end: '23:30',-->
<!--							minTime: formData.startTime-->
<!--							}">-->
<!--              </el-time-select>-->
<!--            </el-form-item>-->

            <el-form-item label="上传店铺头像">
              <el-upload
                class="avatar-uploader"
                :action="fileMgrUrl"
                :headers="uploadHeaders"
                :show-file-list="false"
                :on-success="handleShopAvatarScucess"
                :before-upload="beforeAvatarUpload">
                <img v-if="formData.image_path" :src="formData.imagePath" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              请上传一张格式为png或jpeg的图像

            </el-form-item>

            <el-form-item class="button_submit">
              <el-button type="primary" @click="submitForm('formData')">立即创建</el-button>
            </el-form-item>


          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script src="./add.js"></script>

<style lang="less" >

  .disabled .el-upload--picture-card {
    display: none;
  }

  .button_submit {
    text-align: center;
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

  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }


</style>
