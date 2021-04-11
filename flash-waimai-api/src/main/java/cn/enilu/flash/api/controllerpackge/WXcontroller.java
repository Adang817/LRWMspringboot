package cn.enilu.flash.api.controllerpackge;


import cn.enilu.flash.api.servicepackge.WxService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class WXcontroller {

    @Autowired
    WxService wxService;

    //检查openid，session_key
    @RequestMapping("/VerifyLogin")
    public JSON VerifyLogin(String openid,String session_key){

        int i = wxService.checkOAndS(openid, session_key);

        HashMap map=new HashMap();

        map.put("isCheck",i);

        JSON json=new JSONObject(map);
        return  json;
    }

}
