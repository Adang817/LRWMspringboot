package cn.enilu.flash.api.pojotest;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Food {
    private Integer food_id;
    private String shop_name;
    private String food_name;
    private String food_content;
    private String food_pic;
    private String food_flavor;
    private Integer packing_fee;
    private Integer food_total;
    private String food_type;
    private Integer food_sales;
}
