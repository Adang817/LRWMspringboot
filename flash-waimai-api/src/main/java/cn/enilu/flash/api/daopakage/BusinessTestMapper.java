package cn.enilu.flash.api.daopakage;

import cn.enilu.flash.api.pojotest.Food;
import cn.enilu.flash.api.pojotest.OrderPojoTest;
import cn.enilu.flash.api.pojotest.ShopPojo;
import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface BusinessTestMapper {
    //获得订单列表
    List getOrderAll();
    //获得店铺分页列表
    List getShopAll(@Param("currentPage") int currentPage
            ,@Param("pageSize") int pageSize,@Param("name")String name);

    //获取店铺总数
    int getShopSum(@Param("name")String name);

    //根据店铺ID删除店铺
    void delShopById(@Param("id") int id);

    //更新店铺信息
    void updateShop(ShopPojo shopPojo);

    //添加店铺
    void addShop(ShopPojo shopPojo);

    //检测重复
    int getRepeatData(String shop_name);

    //添加食品
    void addFood(Food food);

    //查看店铺是否有重复食品
    int getRepeatDataFood(@Param("food_name")String food_name,@Param("shop_name")String shop_name);

    //查询店铺食品
    void getAllFood();

    //获得店铺食品
    List getAllFood(@Param("currentPage")int currentPage,@Param("pageSize")int pageSize,@Param("shop_name")String shop_name);

    //获得食品条数
    int getFoodSum(@Param("shop_name")String shop_name);

    //删除食品
    void delFood(@Param("food_id") int food_id);

    //更新食品
    void updateFood(Food food);

    //获得所有店铺的收入
    int getShopSales();

    //获得每种店铺的收入金额
    int getShopTypeSales(@Param("shop_classification")String shop_classification );

}
