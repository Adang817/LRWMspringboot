import { getApiUrl } from '@/utils/utils'
import { getToken } from '@/utils/auth'

import { getFoods, updateFood, deleteFood } from '@/api/business/food'
import { getResturantDetail, getMenuById, getMenu } from '@/api/business/shop'
import { Loading } from 'element-ui'

export default {
  data() {
    return {
      fileMgrUrl: '',
      uploadHeaders: {
        'Authorization': ''
      },
      serchShopname:'',
      shop_id: null,
      city: {},
      offset: 0,
      limit: 3,
      count: 0,
      tableData: [],
      currentPage: 1,
      selectTable: {},
      imgName:'',
      img_Path:'',
      dialogFormVisible: false,
      // menuOptions: [{
      //   value: '水果',
      //   label: '水果'
      // }, {
      //   value: '套餐',
      //   label: '套餐'
      // }, {
      //   value: '面食',
      //   label: '面食'
      // }, {
      //   value: '饮品',
      //   label: '饮品'
      // }, {
      //   value: '点心',
      //   label: '点心'
      // }],
      categoryOptions: [{value: '水果', label: '水果'},
        {value: '套餐', label: '套餐'},
        {value: '面食', label: '面食'},
        {value: '饮品', label: '饮品'},
        {value: '点心', label: '点心'}],
      selectMenu: {},
      selectIndex: '',
      specsForm: {
        specs: '',
        packing_fee: 0,
        price: 20
      },
      specsFormrules: {
        specs: [
          { required: true, message: '请输入规格', trigger: 'blur' }
        ]
      },
      specsFormVisible: false,
      expendRow: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 3,
        shop_name:''
      }
    }
  },
  created() {
    this.listQuery.shop_name = this.$route.query.shop_name
    console.log("this.tableData.shop_name:"+this.listQuery.shop_name)
    this.initData()
    this.fileMgrUrl = getApiUrl() + '/file'
    this.uploadHeaders['Authorization'] = getToken()
  },
  computed: {
    specs: function() {
      let specs = []
      if (this.selectTable.specfoods) {
        this.selectTable.specfoods.forEach(item => {
          specs.push({
            specs: item.specs_name,
            packing_fee: item.packing_fee,
            price: item.price
          })
        })
      }
      return specs
    }
  },
  methods: {
    async initData() {
      this.fetchData()
      this.getFoodSum();
    },
    async getMenu() {
      // this.menuOptions = []
      // try {
      //   console.log('seltable', this.selectTable)
      //   const menuResponse = await getMenu({ restaurant_id: this.selectTable.restaurant_id, allMenu: true })
      //   const menu = menuResponse.data
      //   menu.forEach((item, index) => {
      //     this.menuOptions.push({
      //       label: item.name,
      //       value: item.id,
      //       index
      //     })
      //   })
      // } catch (err) {
      //   console.log('获取食品种类失败', err)
      // }
    },
    // 查找店铺
    search() {
      this.fetchData()
      this.getFoodSum()
    },
    //重置
    reset(){
      this.listQuery.shop_name=''
      this.fetchData()
      this.getFoodSum()
    },
    async fetchData() {

    const  {data:res} =await this.$http.get("http://localhost:8082/getAllFood",{params:this.listQuery})

      this.tableData=res.shopList

      console.log(JSON.stringify(this.tableData))
    },
    async getFoodSum() {
      const  {data:res} =await this.$http.get("http://localhost:8082/getFoodSum",{params:this.listQuery})
      this.total=res.FoodSum
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return 'info-row'
      } else if (index === 3) {
        return 'positive-row'
      }
      return ''
    },
    addspecs() {
      this.specs.push({ ...this.specsForm })
      this.specsForm.specs = ''
      this.specsForm.packing_fee = 0
      this.specsForm.price = 20
      this.specsFormVisible = false
    },
    deleteSpecs(index) {
      this.specs.splice(index, 1)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.fetchData()
    },
    // expand(row, status) {
    //   if (status) {
    //     this.getSelectItemData(row)
    //   } else {
    //     const index = this.expendRow.indexOf(row.index)
    //     this.expendRow.splice(index, 1)
    //   }
    // },
    handleEdit(row) {
      this.getSelectItemData(row, 'edit')
      this.dialogFormVisible = true
    },
    async getSelectItemData(row, type) {
    this.selectTable=row
      console.log("this.selectTable:"+JSON.stringify(this.selectTable))
      // const response = await getResturantDetail(row.restaurant_id)
      // const restaurant = response.data
      // const categoryResponse = await getMenuById(row.category_id)
      // const category = categoryResponse.data
      // this.selectTable = {
      //   ...row, ...{
      //     restaurant_name: restaurant.name,
      //     restaurant_address: restaurant.address,
      //     category_name: category.name,
      //     image: getApiUrl() + '/file/getImgStream?fileName=' + row.image_path
      //   }
      // }
      //
      // this.selectMenu = { label: category.name, value: row.category_id }
      // this.tableData.splice(row.index, 1, { ...this.selectTable })
      // this.$nextTick(() => {
      //   this.expendRow.push(row.index)
      // })
      // if (type === 'edit' && this.restaurant_id !== row.restaurant_id) {
      //   this.getMenu()
      // }
    },
    handleSelect(index) {
      this.selectIndex = index
      this.selectMenu = this.menuOptions[index]
      console.log(" this.selectMenu:"+JSON.stringify(this.selectMenu))
      console.log(" this.selectIndex:"+this.selectIndex)
    },
    async handleDelete(index, row) {
      const  {data:res} =await this.$http.get("http://localhost:8082/delFood",{params:row})

      this.$message({
        type: 'success',
        message: '删除食品成功'
      })
      this.fetchData()
      this.getFoodSum()

      // try {
      //   deleteFood(row.food_id).then(response => {
      //
      //   })
      //
      //   console.log("删除成功！")
      // } catch (err) {
      //   this.$message({
      //     type: 'error',
      //     message: err.message
      //   })
      //   console.log('删除食品失败')
      // }

    },
    handleServiceAvatarScucess(res, file) {
      console.log("handleShopAvatarScucess=================file:"+JSON.stringify(res))

      this.imgName = res.data.realFileName
      this.selectTable.food_pic =  getApiUrl() + '/file/getImgStream?fileName=' + res.data.realFileName
      console.log("handleShopAvatarScucess=================imgName:"+ this.imgName)
      console.log("handleShopAvatarScucess=================img_Path:"+ this.img_Path)
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

    handleBeforeUpload() {
      this.loadingInstance = Loading.service({
        lock: true,
        text: this.$t('common.uploading'),
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,0.7)'
      })
    },
    handleUploadSuccess(res, file) {


      this.imgName= res.data.realFileName
      this.selectTable.food_pic = getApiUrl() + '/file/getImgStream?fileName=' + res.data.realFileName

      // this.loadingInstance.close()
      // if (response.code === 20000) {
      //   console.log(response.data)
      //
      // } else {
      //   this.$message({
      //     message: this.$t('common.uploadError'),
      //     type: 'error'
      //   })
      // }
    },
    async updateFood() {
      this.dialogFormVisible = false

      if(this.selectTable.food_type.length!=2){
        this.selectTable.food_type=this.selectTable.food_type[0]
      }

      console.log("JSON.stringify(this.selectTable):"+JSON.stringify(this.selectTable))
      const {data:res} =await this.$http.get("http://localhost:8082/updateFood",
        {params:this.selectTable});


      this.$message({
              type: 'success',
              message: '更新食品信息成功'
            })

      // const subData = { new_category_id: this.selectMenu.value, specs: this.specs }
      // const postData = { ...this.selectTable, ...subData }
      // const me = this
      // updateFood({
      //   name: me.selectTable.name,
      //   id: me.selectTable.item_id,
      //   descript: me.selectTable.description,
      //   idMenu: me.selectMenu.value,
      //   idShop: me.selectTable.restaurant_id,
      //   imagePath: me.selectTable.image_path,
      //   specsJson: JSON.stringify(me.specs)
      // }).then(response => {
      //   this.fetchData()
      //   this.$message({
      //     type: 'success',
      //     message: '更新食品信息成功'
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'error',
      //     message: err.message
      //   })
      // })
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
    }
  }
}
