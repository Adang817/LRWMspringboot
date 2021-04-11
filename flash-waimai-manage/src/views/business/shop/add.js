import { getApiUrl } from '@/utils/utils'
import { getToken } from '@/utils/auth'
import { cityGuess, searchplace } from '@/api/getData'
import { addShop, foodCategory } from '@/api/business/shop'

export default {
  data() {
    return {

      limitCount:"",
      submitData: {
        // 产品图片
        productImg: ""
      },
      hideUpload: false,
      city: {},
      fileMgrUrl: getApiUrl() + '/file',
      uploadHeaders: {
        'Authorization': ''
      },
      formData: {

        name: '', //店铺名称
        address: '', //地址
        latitude: '',
        longitude: '',
        content: '', //介绍
        phone: '',
        promotion_info: '',
        is_premium: true,
        deliveryMode: true,
        news: true,
        bao: true,
        zhun: true,
        piao: true,
        startTime: '',
        endTime: '',
        image_path: '',
        business_license_image: '',
        catering_service_license_image: '',
        classification:['快餐店'],
        imagePath:""
      },

      rules: {
        name: [
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话' ,trigger: 'blur' },
          { type: 'number', message: '电话号码必须是数字' ,trigger: 'blur' }
        ],
        selectedCategory: [
          { required: true, message: '请选择店铺类型',trigger: 'blur' }
        ]
      },

      categoryOptions: [{value: '快餐店', label: '快餐店'},
        {value: '早餐店', label: '早餐店'},
        {value: '水果店', label: '水果店'},
        {value: '糕点店', label: '糕点店'}],

    }
  },
  mounted() {
    this.uploadHeaders['Authorization'] = getToken()
  },
  methods: {

    onChange(file,filelist){
      console.log("handleShopAvatarScucess=================file:"+JSON.stringify(file))
      this.formData.imagePath = getApiUrl() + '/getImg?fileName=' +file.name
      this.formData.image_path = file.name
    },
    beforeAvatarUpload(file) {
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

    async initData() {


    },
    async querySearchAsync(queryString, cb) {
      if (queryString) {
        try {
          const cityListResponse = await searchplace(this.city.id, queryString)
          const cityList = cityListResponse.data
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

    // 处理店铺头像成功
      handleShopAvatarScucess(res, file) {

      this.formData.imagePath = getApiUrl() + '/file/getImgStream?fileName=' + res.data.realFileName
      this.formData.image_path = res.data.realFileName

        console.log("this.formData.imagePath:"+this.formData.imagePath)
        console.log("this.formData.image_path:"+this.formData.image_path)
    },
    handleBusinessAvatarScucess(res, file) {
      console.log("handleBusinessAvatarScucess================="+res.data.realFileName)
      // this.formData.business_license_image = res.data.realFileName
      // this.formData.businessLicenseImage = getApiUrl() + '/file/getImgStream?fileName=' + res.data.realFileName
    },
    handleServiceAvatarScucess(res, file) {
      console.log("handleServiceAvatarScucess================="+res.data.realFileName)
      // this.formData.catering_service_license_image = res.data.realFileName
      // this.formData.cateringServiceLicenseImage = getApiUrl() + '/file/getImgStream?fileName=' + res.data.realFileName
    },



    //提交表单
    async submitForm(formName) {
      console.log("FROMDATA:"+JSON.stringify(this.formData))


      const {data:res} =await this.$http.get("http://localhost:8082/getRepeatData",
        {params:this.formData});

      console.log("RepeatDataSum:"+res.RepeatDataSum)



      if(this.formData.name=="" || this.formData.address=="" || this.formData.phone=="" ){
        this.$message({
          type: 'error',
          message: '请检查店铺信息是否输入完整'
        })
      }else if(res.RepeatDataSum>=1){
        this.$message({
          type: 'error',
          message: '店铺名称存在重复值'
        })
        }else{
        this.formData.classification=this.formData.classification[0]

        console.log("selectTable:"+JSON.stringify(this.formData))
        const {data} =await this.$http.get("http://localhost:8082/addShop",
          {params:this.formData})

        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.formData = {
          name: '', //店铺名称
          address: '', //地址
          latitude: '',
          longitude: '',
          description: '', //介绍
          phone: '',
          promotion_info: '',
          is_premium: true,
          deliveryMode: true,
          news: true,
          bao: true,
          zhun: true,
          piao: true,
          startTime: '',
          endTime: '',
          image_path: '',
          business_license_image: '',
          catering_service_license_image: ''
        }

      }

    },
    upLoadFile(){

    }

  }
}
