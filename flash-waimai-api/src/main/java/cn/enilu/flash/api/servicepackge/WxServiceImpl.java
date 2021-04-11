package cn.enilu.flash.api.servicepackge;

import cn.enilu.flash.api.daopakage.WxMapper;
import cn.enilu.flash.api.pojotest.Food;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class WxServiceImpl implements WxService{
    @Resource
    WxMapper wxMapper;

    @Override
    public int checkOAndS(String openid, String session_key) {
        return wxMapper.checkOAndS(openid,session_key);

    }
}
