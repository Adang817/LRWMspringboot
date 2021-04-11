package cn.enilu.flash.api.servicepackge;

import org.apache.ibatis.annotations.Param;

public interface WxService {

    //校对openid和session_key
    int checkOAndS(@Param("openid")String openid, @Param("session_key")String session_key);
}
