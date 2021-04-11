<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="24">
        <el-col :span="4">
          <el-input v-model="listQuery.restaurant_id" placeholder="餐厅编号"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="listQuery.id" placeholder="订单编号"></el-input>
        </el-col>

        <el-col :span="8">
          <el-button type="success" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
        </el-col>
      </el-row>
      <br>

    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
              @expand-change="expandRow"
              :expand-row-keys="expandRowData"
              :row-key="getRowKeys"
              boder stripe>


<!--      <el-table-column type="expand">-->
<!--        <template slot-scope="props">-->
<!--          <el-form label-position="left" inline class="application-table-expand">-->
<!--              <el-form-item label="用户名" >-->
<!--                <span>{{ props.row.user_name }}收货地址</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="店铺名称">-->
<!--                <span>{{ props.row.restaurant_name }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="收货地址">-->
<!--                <span>{{ props.row.address }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="店铺 ID">-->
<!--                <span>{{ props.row.restaurant_id }}</span>-->
<!--              </el-form-item>-->

<!--          </el-form>-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column
        label="订单编号"
        prop="tk_id">

      </el-table-column>

      <el-table-column
        label="食品种类"
        prop="food_type">
      </el-table-column>

      <el-table-column
        label="食品名称"
        prop="food_name">
      </el-table-column>




    </el-table>


<!--    size-change:页面总数改变时触发事件-->
<!--    current-change:页码值发生变化时，触发事件-->
<!--    :page-size:当前情况下，每页有多少数据-->

    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50, 100,500]"
      :page-size="listQuery.limit"
      :total="total"
      @size-change="changeSize"
      @current-change="fetchPage"
      @prev-click="fetchPrev"
      @next-click="fetchNext">
    </el-pagination>

  </div>
</template>

<script src="./order.js">

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
