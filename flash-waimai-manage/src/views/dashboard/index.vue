<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎光临:{{name}}(<span v-for='role in roles' :key='role'>{{role}}</span>)</div>

    <el-row :gutter="30">

      <el-col :span="6" style="margin-left: 170px;">
        <el-card class="box-card" >
          <el-col :span="12">
            <svg-icon  icon-class="documentation" ></svg-icon>
          </el-col>
          <el-col :span="12" >
            <div class="card-panel-text">入驻商家</div>
            <div class="card-panel-num">
              {{ShopNum}}
            </div>
          </el-col>
        </el-card>
      </el-col>
<!--      用户数量-->
      <el-col :span="6">
        <el-card class="box-card">
          <el-col :span="12">
            <svg-icon  icon-class="user"></svg-icon>
          </el-col>
          <el-col :span="12" >
            <div class="card-panel-text">{{ $t('dashboard.newUser') }}</div>
            <div class="card-panel-num">102,400</div>
          </el-col>
        </el-card>
      </el-col>

<!--      收入-->
      <el-col :span="7" :gutter="20">
        <el-card class="box-card">
          <el-col :span="12" style="width: 150px">
            <svg-icon  icon-class="money" ></svg-icon>
          </el-col>
          <el-col :span="12" >
            <div class="card-panel-text">收入（店铺收入X10%）</div>
            <div class="card-panel-num">{{shopSales}}</div>
          </el-col>
        </el-card>
      </el-col>

    </el-row>

<!--      折线数据图-->
    <el-row>

      <el-col  :span="22"    style="margin-left: 80px;width: 1200px" >
        <div class="chart section"  id="LineChart" >
        </div>
      </el-col>

    </el-row>


      <el-row :gutter="40"  style="margin-left: 100px;">
        <!--      柱状数据图-->
        <el-col :span="12"  style="width: 600px" >
          <div id="BarChart"  class="chart section" style="margin: auto" ></div>
        </el-col>

        <!--      圆盘数据图-->
        <el-col :span="10" style="width: 600px">
          <div id="PieChart"   class="chart section" style="margin: auto"></div>
        </el-col>


      </el-row>



    </div>


</template>


<script src="./dashboard.js"></script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row{
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

.dashboard {

  &-container {
    padding: 15px;
    background-color: #f0f2f5;
  }
  &-text {
    font-size: 14px;
    line-height: 22px;
    padding-bottom:15px;
  }
}
.echarts{
  width: 100%;
  height: 100%;
}
.box-card{
  height:108px;
}
  .chart{
    height: 350px;
  }

  .section{
    padding:20px;
    background-color: white;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }

  .box-card > div >div > .svg-icon {
    width: 4em;
    height: 4em;
    color:#34bfa3;
  }
  .card-panel-text{
    padding-top:10px;
    font-size:16px;
    color:gray;
  }
  .card-panel-num{
    padding-top:10px;
    font-size:20px;
    font-weight: bold;
  }
</style>
