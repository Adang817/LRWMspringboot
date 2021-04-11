package cn.enilu.flash.api.controllerpackge;

import cn.enilu.flash.api.pojotest.Food;
import cn.enilu.flash.api.pojotest.OrderPojoTest;
import cn.enilu.flash.api.pojotest.ShopPojo;
import cn.enilu.flash.api.servicepackge.ServiceTestPackge;
import cn.enilu.flash.bean.entity.front.Shop;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.ibatis.annotations.Param;
import org.nutz.json.Json;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class BusinessTestController {

        @Autowired
    private ServiceTestPackge serviceTestPackge;


    @RequestMapping("/getOrderList")
    //获取全部订单
    public JSON getOrderAll(){

        List<OrderPojoTest> all = serviceTestPackge.getOrderAll();
        HashMap<String,Object> hashMap=new HashMap<String, Object>();
        hashMap.put("orderList",all);
        JSON s =new JSONObject(hashMap);
        return s;
    }
    //获取全部商店列表
    @RequestMapping("/getShopList")
    public JSON getShopList(@RequestParam(defaultValue = "1") int page,int limit
            ,@RequestParam(defaultValue ="") String name){

        List<Shop> all=serviceTestPackge.getShopAll(page,limit,name);
        HashMap map=new HashMap();

        map.put("shopList",all);

        JSON json=new JSONObject(map);

        return  json;
    }
    //获取商店总数量
    @RequestMapping("/getShopSum")
    public JSON getShopSum(@RequestParam(defaultValue = "")String name){

        int all=serviceTestPackge.getShopSum(name);
        HashMap map=new HashMap();

        map.put("ShopSum",all);

        JSON json=new JSONObject(map);

        return  json;
    }

    //删除商店
    @RequestMapping("/delShopById")
    public void delShopById(int shop_id){
        serviceTestPackge.delShopById(shop_id);
    }
    //更新商店
    @RequestMapping("/updateShop")
    public void updateShop(int shop_id,String shop_name,
                           String shop_address, String shop_content
                            ,String shop_phone,String shop_pic
                            ,String shop_classification,int shop_sales){

       ShopPojo pojo= new ShopPojo(shop_id,shop_name,shop_address,shop_content
               ,shop_pic,shop_phone,shop_classification,shop_sales);
        System.out.println("==pojo=="+pojo.toString());
       serviceTestPackge.updateShop(pojo);
    }

    //添加店铺
    @RequestMapping("/addShop")
    public void addShop(String name, String address, String content
            ,String phone,String imagePath,String classification){

        ShopPojo pojo=new ShopPojo(null,name,address,content,imagePath,phone,classification,null);

        serviceTestPackge.addShop(pojo);
    }


    //查询是否有重复数据
    @RequestMapping("/getRepeatData")
    public JSON getRepeatData(@RequestParam(defaultValue = "") String name){
        int all=serviceTestPackge.getRepeatData(name);

        HashMap map=new HashMap();

        map.put("RepeatDataSum",all);

        JSON json=new JSONObject(map);
        return  json;
    }

    @RequestMapping("/addFood")
    public JSON  addFood(String foodname,String name,String description,
                         String imagePath,String food_flavor,int packing_fee,int price,String food_type){

        HashMap map=new HashMap();

        Food food=new Food(null,name,foodname,description,imagePath,food_flavor,packing_fee,price,food_type,null);
        System.out.println(food.toString());
        try {
            serviceTestPackge.addFood(food);
        }catch (Exception e){
            map.put("status",0);
            JSON json=new JSONObject(map);
            return json;
        }
        map.put("status",1);
        JSON json=new JSONObject(map);
        return json;
    }

    //查看店铺是否存在相同食品
    @RequestMapping("/getRepeatDataFood")
    public JSON getRepeatDataFood(String foodname,String name){
        int repeatDataFood = serviceTestPackge.getRepeatDataFood(foodname,name);

        HashMap map=new HashMap();

        map.put("RepeatDataSumFood",repeatDataFood);

        JSON json=new JSONObject(map);
        return  json;
    }
    //获得店铺所有食品
    @RequestMapping("/getAllFood")
    public JSON getAllFood(@RequestParam(defaultValue = "1") int page,int limit
            ,@RequestParam(defaultValue ="") String shop_name){

        List<Shop> all=serviceTestPackge.getAllFood(page,limit,shop_name);
        HashMap map=new HashMap();

        map.put("shopList",all);

        JSON json=new JSONObject(map);

        return  json;
    }

    //获得食品数量
    @RequestMapping("/getFoodSum")
    public JSON getFoodSum(@RequestParam(defaultValue = "")String shop_name){

        int sum=serviceTestPackge.getFoodSum(shop_name);
        HashMap map=new HashMap();

        map.put("FoodSum",sum);

        JSON json=new JSONObject(map);

        return  json;
    }
    //删除食品
    @RequestMapping("/delFood")
    public void delFood(int food_id){
       serviceTestPackge.delFood(food_id);
    }

    //更新食品
    @RequestMapping("/updateFood")
    public void updateFood(int food_id,String food_name,String food_content,String food_pic,String food_flavor,
    int packing_fee,int food_total,String food_type){

        Food food=new Food(food_id,null,food_name,food_content,food_pic,food_flavor,packing_fee,food_total,food_type,null);
        serviceTestPackge.updateFood(food);

    }

    @RequestMapping("/getShopSales")
    public JSON getShopSales(){

        int a= serviceTestPackge.getShopSales();
        HashMap map=new HashMap();

        map.put("shopSales",a);

        JSON json=new JSONObject(map);

        return  json;
    }

    @RequestMapping("/getShopTypeSales")
    public JSON getShopTypeSales(String shop_classification){

        int a= serviceTestPackge.getShopTypeSales(shop_classification);
        System.out.println("=====================================:"+a);
        HashMap map=new HashMap();
        map.put("shopTypeSales",a);

        JSON json=new JSONObject(map);

        return  json;
    }
}
