package cn.enilu.flash.api.pojotest;

import io.swagger.models.auth.In;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShopPojo {

    private Integer shop_id;
    private String shop_name;
    private String shop_address;
    private String shop_content;
    private String shop_pic;
    private String shop_phone;
    private String shop_classification;
    private Integer shop_sales;

}
