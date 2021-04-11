import { getList } from '@/api/system/notice'
import { mapGetters } from 'vuex'
import ECharts from "vue-echarts";
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
// import 'echarts/map/js/world'
import 'zrender/lib/svg/svg'

import * as echarts from 'echarts';


export default {

  name: 'dashboard',
  components: {
    chart: ECharts
  },
  data() {
    const data = []
    for (let i = 0; i <= 360; i++) {
      const t = i / 180 * Math.PI
      const r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }
    return {
      ShopNum:'111',
      shopSales:'',
      zaocan:'',
      shuiguo:'',
      kuaican:'',
      gaodian:'',

      zaocanValue:{
        shop_classification:'早餐店'
      },
      shuiguoValue:{
        shop_classification:'水果店'
      },
      kuaicanValue:{
        shop_classification:'快餐店'
      },
      gaodianValue:{
        shop_classification:'糕点店'
      },
      notice: [],

      lineData: {

      },
      barData: {

      },

      pieData: {

      },
      tableData: [],
      listQuery: {
        name:''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {

   this.getShopSum()
    this.getShopSales()
    // this.fetchData()
    this.getShopTypeSales()

  },
  mounted(){

  },
  methods: {

    async  getShopSum() {
      const {data} =await this.$http.
      get("http://localhost:8082/getShopSum")

      this.ShopNum=data.ShopSum;

    },
    //显示扇形统计图
    async drawPie() {
      let PieChart = this.$echarts.init(document.getElementById('PieChart'));

      this.pieData={
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
          left: 'center'
      },
      series: [
        {
          name: '各类型店铺收入',
          type: 'pie',
          radius: ['30%', '60%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {value: this.kuaican, name: '快餐店'},
            {value: this.zaocan, name: '早餐店'},
            {value: this.shuiguo, name: '水果店'},
            {value: this.gaodian, name: '糕点店'}
          ]
        }
      ]
      }

      PieChart.setOption(this.pieData)
    },
    //显示折现统计图
    async drawLien(){
      let LineChart =this.$echarts.init(document.getElementById('LineChart'))

      this.lineData={
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [this.$t('dashboard.email'), this.$t('dashboard.ad'), this.$t('dashboard.vedio'), this.$t('dashboard.direct'), this.$t('dashboard.searchEngine')]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [this.$t('common.week.mon'), this.$t('common.week.tue'), this.$t('common.week.wed'), this.$t('common.week.thu'), this.$t('common.week.fri'), this.$t('common.week.sat'), this.$t('common.week.sun')]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: this.$t('dashboard.email'),
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: this.$t('dashboard.ad'),
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: this.$t('dashboard.vedio'),
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          }

        ]
      }
      LineChart.setOption(this.lineData)
    },
    //显示柱状统计图
    async drawBar(){
      let BarChart =this.$echarts.init(document.getElementById('BarChart'))

      this.barData={
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',       // 默认为直线，可选为：'line' | 'shadow'
            shadowBlur: 10
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      BarChart.setOption(this.barData)
    },
    //获得所有店铺销售额
    async  getShopSales() {
      const {data} =await this.$http.
      get("http://localhost:8082/getShopSales")

      this.shopSales=data.shopSales*0.1;
    },
      getShopTypeSales() {


        this.$axios.get("http://localhost:8082/getShopTypeSales",{params:this.gaodianValue}).then((response) => {
            this.gaodian=response.data.shopTypeSales;
        });

        this.$axios.get("http://localhost:8082/getShopTypeSales",{params:this.zaocanValue}).then((response) => {
          this.zaocan=response.data.shopTypeSales;
        });

        this.$axios.get("http://localhost:8082/getShopTypeSales",{params:this.shuiguoValue}).then((response) => {
          this.shuiguo=response.data.shopTypeSales;
        });

        this.$axios.get("http://localhost:8082/getShopTypeSales",{params:this.kuaicanValue}).then((response) => {
          this.kuaican=response.data.shopTypeSales;
        });


        setTimeout(() => {
          this.drawPie()
          this.drawBar()
          this.drawLien()
        }, 300);

    },
    initEcharts(){
      let  myChart = Echarts.init(this.$refs.chart);
      myChart.setOption(this.option);
    },
    fetchData() {
    //   this.listLoading = true
    //   const self = this
    //   getList(self.listQuery).then(response => {
    //     for (var i = 0; i < response.data.length; i++) {
    //       var notice = response.data[i]
    //       self.$notify({
    //         title: notice.title,
    //         message: notice.content,
    //         duration: 3000
    //       })
    //     }
    //     self.listLoading = false
    //   })
    }
  }
}
