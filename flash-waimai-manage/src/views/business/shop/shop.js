import { getApiUrl } from '@/utils/utils'
import { getToken } from '@/utils/auth'
import { cityGuess } from '@/api/getData'
import {
  getResturants,
  getResturantsCount,
  foodCategory,
  updateResturant,
  searchplace,
  deleteResturant
} from '@/api/business/shop'

export default {
  data() {

    return {
      image:  "",
      imgsVisible: false,
      city: {},
      count: 0,
      fileMgrUrl: getApiUrl() + '/file',
      uploadHeaders: {
        'Authorization': ''
      },
      tableData: [],
      currentPage: 1,
      selectTable: {},
      dialogFormVisible: false,
      categoryOptions: [{value: '快餐店', label: '快餐店'},
                      {value: '早餐店', label: '早餐店'},
                      {value: '水果店', label: '水果店'},
                      {value: '糕点店', label: '糕点店'}],
      address: {},
      total: 0,
      //分页信息
        listQuery: {
        page: 1,
        limit:5,
        name:undefined
      }
    }
  },
  created() {
    this.fetchData()
    this.getShopSum();
    this.uploadHeaders['Authorization'] = getToken()
  },

  methods: {
    async initData() {
      try {
        cityGuess().then(response => {
          this.city = response.data
          getResturantsCount().then(response2 => {
            this.count = response2.count
            this.fetchData()
          })
        })
      } catch (err) {
        console.log('获取数据失败', err)
      }
    },
    async getCategory() {

      try {
        const response = await foodCategory()
        const categories = response.data
        categories.forEach(item => {
          if (item.sub_categories.length) {
            const addnew = {
              value: item.name,
              label: item.name,
              children: []
            }
            item.sub_categories.forEach((subitem, index) => {
              if (index === 0) {
                return
              }
              addnew.children.push({
                value: subitem.name,
                label: subitem.name
              })
            })
            this.categoryOptions.push(addnew)
          }
        })
      } catch (err) {
        console.log('获取商铺种类失败', err)
      }
    },
    async fetchData() {

      console.log( "==================="+getApiUrl())
        const latitude = ''
        const longitude = ''
        const {data:res} =await this.$http.get("http://localhost:8082/getShopList",
          {params:this.listQuery});


      this.searchFlag=false
        this.tableData = res.shopList
      console.log(res.shopList)
      // getResturants(this.listQuery).then(response => {
      //   const restaurants = response.data.records
      //   restaurants.forEach(item => {
      //     const tableData = {}
      //     tableData.name = item.name
      //     tableData.address = item.address
      //     tableData.description = item.description
      //     tableData.id = item.id
      //     tableData.phone = item.phone
      //     tableData.rating = item.rating
      //     tableData.recent_order_num = item.recent_order_num
      //     tableData.category = item.category
      //     tableData.image_path = item.image_path
      //     this.tableData.push(tableData)
      //   })
      //
      // })
    },
    async  getShopSum() {
      const {data} =await this.$http.
      get("http://localhost:8082/getShopSum",
        {params:this.listQuery})

      this.total=data.ShopSum;

    }
     ,
    // 查找店铺
    search() {
      this.fetchData()
      this.getShopSum()
    },
    //重置
    reset() {
      this.listQuery.name = ''
      this.fetchData()
      this.getShopSum()
    },
    handleSizeChange(val) {
      this.pagesize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPage(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    handleEdit(index, row) {
      console.log(row)
      this.selectTable = row
      // this.selectTable.image = getApiUrl() + '/file/getImgStream?fileName=' + row.image_path
      this.address.address = row.shop_address
      this.dialogFormVisible = true
      // this.selectedCategory = row.category.split('/')
      // if (!this.categoryOptions.length) {
      //   this.getCategory()
      // }
    },

    addFood(index, row) {

      this.$router.push({ path: '/data/food/add', query: { shopname: row.shop_name }})
    },

    viewFood(index,row) {
      console.log(JSON.stringify(row))
      this.$router.push({path:'/data/food',query:{shop_name:row.shop_name}})
    },

    async handleDelete(index, row) {

      const res = await this.$http.get("http://localhost:8082/delShopById",
        {params: row})
      this.$message({
                type: 'success',
                message: '删除店铺成功'
              })
              this.tableData.splice(index, 1)

      this.fetchData()
      this.getShopSum()

    },

    async querySearchAsync(queryString, cb) {
      if (queryString) {
        try {
          const cityList = await searchplace(this.city.id, queryString)
          if (cityList instanceof Array) {
            cityList.map(item => {
              item.value = item.address
              return item
            })
            cb(cityList)
          }
        } catch (err) {
          console.log(err)
        }
      }
    },

    addressSelect(vale) {
      const { address, latitude, longitude } = vale
      this.address = { address, latitude, longitude }
    },
    handleServiceAvatarScucess(res, file) {
      console.log("handleShopAvatarScucess=================file:"+JSON.stringify(res))

      this.selectTable.image_path = res.data.realFileName
      this.selectTable.shop_pic =  getApiUrl() + '/file/getImgStream?fileName=' + res.data.realFileName

    },
    beforeAvatarUpload(file) {
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isRightType && isLt2M
    },
    async updateShop(){
      this.dialogFormVisible = false
      console.log("1=====JSON.stringify(this.selectTable):"+JSON.stringify(this.selectTable))

      if(this.selectTable.shop_classification.length!=3){
        this.selectTable.shop_classification=this.selectTable.shop_classification[0]
      }


      const {data} =await this.$http.get("http://localhost:8082/updateShop",
        {params:this.selectTable})

      console.log("2=====JSON.stringify(this.selectTable):"+JSON.stringify(this.selectTable))
        this.$message({
              type: 'success',
              message: '更新店铺信息成功'
            })

    }
  }
}
