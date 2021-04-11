package cn.enilu.flash.api.controllerpackge;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
public class WXloginController {

    @RequestMapping("/wxLogin")
    public JSON wxLogin(String code){

        //存放
        HashMap map=new HashMap();

            System.out.println("wxlogin - code: " + code);

            String url = "https://api.weixin.qq.com/sns/jscode2session";
            Map<String, String> param = new HashMap<>();
    //        param.put("appid", WxApp.APPID);
    //        param.put("secret", WxApp.SECRET);
            param.put("js_code", code);
            param.put("grant_type", "authorization_code");


            // 创建Httpclient对象
            CloseableHttpClient httpclient = HttpClients.createDefault();

            // 定义请求的参数
            URI uri = null;
            try {
                uri = new URIBuilder(url).setParameter("js_code", code)
                        .setParameter("grant_type", "authorization_code")
                        .setParameter("appid","wxddf5059cfa241f57")
                        .setParameter("secret","32b04585a18352524f231723e8da0b8e").build();
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }

            System.out.println("uri======:"+uri);

            // 创建http GET请求
            HttpGet httpGet = new HttpGet(uri);

            CloseableHttpResponse response = null;
            try
            {
                // 执行请求
                response = httpclient.execute(httpGet);
                // 判断返回状态是否为200
                if (response.getStatusLine().getStatusCode() == 200)
                {
                    String content = EntityUtils.toString(response.getEntity(), "UTF-8");
                    JSONObject jsonObject=JSONObject.parseObject(content);
                   map.put("session_key",(String)jsonObject.get("session_key")) ;
                    map.put("openid",(String)jsonObject.get("openid")) ;
                    System.out.println("content:"+content);

                }

            } catch (ClientProtocolException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally
            {
                if (response != null)
                {
                    try {
                        response.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
                try {
                    httpclient.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }




        JSON json=new JSONObject(map);
        return  json;


    }
}
