package cn.enilu.flash.api.pojotest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderPojoTest {

    private String tk_id;
    private String food_type;
    private String food_name;

}
