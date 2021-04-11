package cn.enilu.flash.api.pojotest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WechatUser {
  private    int openID;
  private   String username;
  private  String userpic;
  private  int integral;
  private  int balance;
}
