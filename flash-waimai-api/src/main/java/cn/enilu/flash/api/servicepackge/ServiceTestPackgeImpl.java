package cn.enilu.flash.api.servicepackge;


import cn.enilu.flash.api.daopakage.BusinessTestMapper;
import cn.enilu.flash.api.pojotest.Food;
import cn.enilu.flash.api.pojotest.ShopPojo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ServiceTestPackgeImpl implements ServiceTestPackge{

    @Resource
    BusinessTestMapper businessTestMapper;

    public void setBusinessTestMapper(BusinessTestMapper businessTestMapper) {
        this.businessTestMapper = businessTestMapper;
    }


    @Override
    public List getOrderAll() {
        return businessTestMapper.getOrderAll();
    }

    @Override
    public int getShopSum(String name) {
        return businessTestMapper.getShopSum(name);
    }

    @Override
    public List getShopAll(int currentPage,int pageSize,String name) {
        int start =(currentPage-1)*pageSize;
        return businessTestMapper.getShopAll(start,pageSize,name);
    }

    @Override
    public void delShopById(int id) {

        businessTestMapper.delShopById(id);
    }

    @Override
    public void updateShop(ShopPojo shopPojo) {
        businessTestMapper.updateShop(shopPojo);
    }

    @Override
    public void addShop(ShopPojo shopPojo) {
        businessTestMapper.addShop(shopPojo);
    }

    @Override
    public int getRepeatData(String shop_name) {
        return businessTestMapper.getRepeatData(shop_name);
    }

    @Override
    public void addFood(Food food) {
        businessTestMapper.addFood(food);
    }

    @Override
    public int getRepeatDataFood(String food_name,String shop_name) {
        return businessTestMapper.getRepeatDataFood(food_name,shop_name);
    }

    @Override
    public List getAllFood(int currentPage, int pageSize, String shop_name) {
        int start =(currentPage-1)*pageSize;
        return businessTestMapper.getAllFood(start,pageSize,shop_name);
    }

    @Override
    public int getFoodSum(String shop_name) {
        return businessTestMapper.getFoodSum(shop_name);
    }

    @Override
    public void delFood(int food_id) {
        businessTestMapper.delFood(food_id);
    }

    @Override
    public void updateFood(Food food) {
        businessTestMapper.updateFood(food);
    }

    @Override
    public int getShopSales() {
        return businessTestMapper.getShopSales();
    }

    @Override
    public int getShopTypeSales(String shop_classification) {
        return businessTestMapper.getShopTypeSales(shop_classification);
    }


}
