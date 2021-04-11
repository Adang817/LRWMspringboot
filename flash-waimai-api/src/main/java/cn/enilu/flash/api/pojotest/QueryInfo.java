package cn.enilu.flash.api.pojotest;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryInfo {
    private int page;
    private int limit;
    private String name;
}
