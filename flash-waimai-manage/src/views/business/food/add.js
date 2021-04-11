import { getApiUrl } from '@/utils/utils'
import { getToken } from '@/utils/auth'
import { addFood } from '@/api/business/food'
import { getCategory, addCategory } from '@/api/business/shop'
import food from "@/views/business/food/food";

export default {
  data() {
    return {
      restaurant_id: 1,

        options: [{
          value: '水果',
          label: '水果'
        }, {
          value: '套餐',
          label: '套餐'
        }, {
          value: '面食',
          label: '快餐'
        }, {
          value: '饮品',
          label: '饮品'
        }, {
          value: '点心',
          label: '点心'
        }],



      fileMgrUrl: getApiUrl() + '/file',
      uploadHeaders: {
        'Authorization': ''
      },
      foodForm: {
        foodname: '',
        name: '',
        shop:'',
        description: '',
        image_path: '',
        activity: '',
        food_type:'套餐',
        food_flavor: '',

        attributes: [],
        packing_fee: 0,
        price: 15,
        specs: [{
          specs: '默认',
          packing_fee: 0,
          price: 10
        }]
      },
      categoryRules: {
        name: [
          { required: true, message: '请选择食品种类', trigger: 'blur' }
        ]
      },
      foodrules: {
        foodname: [
          { required: true, message: '请输入食品名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        categoryName: [
          { required: true, message: '请选择食品种类', trigger: 'blur' }
        ],
        description:[
          { required: true, message: '请填写食品详情', trigger: 'blur' }
       ]
      },
      showAddCategory: false,
      foodSpecs: 'one',
      dialogFormVisible: false,
      specsForm: {
        specs: '',
        packing_fee: 0,
        price: 20
      },
      specsFormrules: {
        specs: [
          { required: true, message: '请输入规格', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.uploadHeaders['Authorization'] = getToken()

    if (this.$route.query.shopname) {
      this.foodForm.name = this.$route.query.shopname
    } else {
      // this.restaurant_id = Math.ceil(Math.random() * 10)
      this.$msgbox({
        title: '提示',
        message: '添加食品需要选择一个商铺，现在就去选择商铺吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.$router.push('/data/shop')
            done()
          } else {
            this.$message({
              type: 'info',
              message: '取消'
            })
            done()
          }
        }
      })
    }
    this.initData()
  },
  computed: {
    selectValue: function() {
      return this.categoryForm.categoryList[this.categoryForm.categorySelect] || {}
    }
  },
  methods: {
    async initData() {
      // try {
      //   const result = await getCategory(this.restaurant_id)
      //   if (result.code === 20000) {
      //     result.category_list.map((item, index) => {
      //       item.value = index
      //       item.label = item.name
      //     })
      //     this.categoryForm.categoryList = result.category_list
      //   } else {
      //     console.log(result)
      //   }
      // } catch (err) {
      //   console.log(err)
      // }
    },
    addCategoryFun() {
      this.showAddCategory = !this.showAddCategory
    },
    submitcategoryForm(formName) {
      console.log(this.categoryForm)
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          console.log(2,this.categoryForm)
          const params = {
            name: this.categoryForm.name,
            description: this.categoryForm.description,
            restaurant_id: this.restaurant_id
          }
          try {
            const result = await addCategory(params)
            if (result.code === 20000) {
              this.initData()
              this.categoryForm.name = ''
              this.categoryForm.description = ''
              this.showAddCategory = false
              this.$message({
                type: 'success',
                message: '添加成功'
              })
            }
          } catch (err) {
            console.log(err)
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: '请检查输入是否正确',
            offset: 100
          })
          return false
        }
      })
    },
    uploadImg(res, file) {
      this.foodForm.imagePath = getApiUrl() + '/file/getImgStream?fileName=' + res.data.realFileName
      this.foodForm.image_path = res.data.realFileName
    },

    beforeImgUpload(file) {
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isRightType) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isRightType && isLt2M
    },
    addspecs() {
      this.foodForm.specs.push({ ...this.specsForm })
      this.specsForm.specs = ''
      this.specsForm.packing_fee = 0
      this.specsForm.price = 20
      this.dialogFormVisible = false
    },
    handleDelete(index) {
      this.foodForm.specs.splice(index, 1)
    },
    tableRowClassName(row, index) {
      if (index === 1) {
        return 'info-row'
      } else if (index === 3) {
        return 'positive-row'
      }
      return ''
    },
    async addFood(foodForm) {

      console.log(JSON.stringify(this.foodForm))
      //查询店铺是否存在
      const {data:sum} =await this.$http.get("http://localhost:8082/getRepeatData",
        {params:this.foodForm});

    if(this.foodForm.name!='' ||this.foodForm.foodname!=''||this.foodForm.description!=''){

      //查询店铺是否存在相同食品
      const {data:RepeatDataSumFoodSum} =await this.$http.get("http://localhost:8082/getRepeatDataFood",
        {params:this.foodForm});
      console.log("RepeatDataSumFoodSum.RepeatDataSumFood:"+RepeatDataSumFoodSum.RepeatDataSumFood)
      if(sum.RepeatDataSum==0) {
        this.$message({
          type: 'error',
          message: '该店铺不存在，无法添加食品'
        })
      }else{

        if(RepeatDataSumFoodSum.RepeatDataSumFood>=1){
          this.$message({
            type: 'error',
            message: '该食品名在该店铺已存在'
          })
          this.foodForm.foodname=''
        }else{
          //添加食品请求
          const {data:res} =await this.$http.get("http://localhost:8082/addFood",
            {params:this.foodForm});

          if(res.status==1){
            this.$message({
              type: 'success',
              message: '添加成功',
            })

            this.foodForm.foodname=''
            this.foodForm.food_type='套餐'
            this.foodForm.price=15
            this.foodForm.packing_fee=0
            this.foodForm.image_path=''
            this.foodForm.food_flavor=''
            this.foodForm.attributes=[]
            this.foodForm.description=''
            this.foodForm.specs=[{
              specs: '默认',
              packing_fee: 0,
              price: 10
            }]

          }else{
            this.$message({
              type: 'error',
              message: '添加失败，检查数据是否合法'
            })
          }
        }


      }
    }else{
      this.$message({
        type: 'error',
        message: '请将数据填写完整'
      })
    }

    }
  }
}
