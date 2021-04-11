package cn.enilu.flash.api.daopakage;

import org.apache.ibatis.annotations.Param;
import org.mapstruct.Mapper;

@Mapper
public interface WxMapper {


    //校对openid和session_key
    int checkOAndS(@Param("openid")String openid,@Param("session_key")String session_key);
}
