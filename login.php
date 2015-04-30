<?xml version="1.0" encoding="utf8"?>
<root><![CDATA[

<style>
*{margin:0;padding:0}
body{font-size:12px}

.fwin{ background-color:#fff;  box-shadow:0px 0px 4px #666; border:1px solid #aaa;}
.cl:after{content:".";display:block;height:0;clear:both;visibility:hidden;}.cl{zoom:1;}
.fwin .rfm, .nfl .f_c .rfm { width: 500px; }
.fwin .rfm th, .fwin .rfm td, .nfl .f_c .rfm th, .nfl .f_c .rfm td { padding: 6px 2px; }
.t_l, .t_c, .t_r, .m_l, .m_r, .b_l, .b_c, .b_r { overflow: hidden; background:#000; opacity: 0.2; filter: alpha(opacity=20); }
.m_c {background:#FFF;border-radius:6px;}
.m_c .tb { margin: 0 0 10px; padding: 0 10px; }
.m_c .c { padding: 10px; }
.m_c .o { padding: 8px 10px; height: 26px; text-align: right; border-top: 1px solid #CCC; background: #FFF; }



body {margin:0;padding:0; font-size:12px;color:#666666;}
div,form,img,ul,li,dl,dt,dd,h1,h2,h3,p {margin:0px; padding:0px; border:0px;}
li {list-style-type: none;}
* {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0; 
  font-size: 100%;
  background: transparent; 
}
input[type="checkbox"] { margin:0 4px 0 0; vertical-align:middle;}
table { border:0px; border-collapse:collapse; }
ol, ul {list-style:none;}
blockquote, q {quotes: none;}
em { font-style:normal}
a { text-decoration:none; color:#333; }
.clear { clear:both; float:none;}
html .hidden, .rsyc_load { display:none; } 
img { display:block;}
/* CSS Document */
/*
** 制作时间：2013.7.15
** 内容描述：登录注册样式；
** 涉及范围(1)：弹窗公用样式
** 涉及范围(2)：登录注册公用样式
** 涉及范围(3)：登录注册单独页
** 涉及范围(4)：登录模块样式
** 涉及范围(5)：第三方帐号模块样式
** 涉及内容(6)：注册模块样式
** 涉及内容(7)：登录注册弹窗
**********************************************/

/*弹窗公用样式*/

.dialog_t { display:block; background-color:#f0f1f2; border-bottom:1px solid #ddd; line-height:36px; }
.dialog_t h3 { display:block; font-size:16px; font-weight:100; text-align:center; }
.dialog a.close { display:block; position:absolute; background:url(http://s.yunfan.com/style/images/common/icons_log.png) no-repeat 0 -288px; width:24px; height:24px; top:6px; right:6px;}
.dialog a.close:hover { background-position:0 -312px;}

/*登录注册公用样式*/
.log_form { width:300px; }
.ipt { position:relative; height:34px; width:298px; border:1px solid #ccc; background-color:#fafafa; margin-bottom:12px; }
.log_form .ipt_hover { border:1px solid #7abd54;background-color:#fff}
.ipt input { position:absolute; top:5px; left:11px; right:11px; z-index:2; line-height:24px; display:block; height:24px; outline:none; border:0; background:none }
.ipt_tips { position:absolute; top:0; left:11px; line-height:34px; color:#999; z-index:1  }
a.log_btn { display:inline-block; background:url(http://s.yunfan.com/style/images/common/btn_bg.png) repeat-x 0 -576px; width:298px; height:36px; border-left:1px solid #ec2929; border-right:1px solid #ec2929; color:#fff; line-height:36px; font-size:14px; text-align:center; font-weight:700; text-shadow:0 1px 1px #ff3f3f; box-shadow: 0 1px 1px #bbb; }
a.log_btn:hover { background-position:0 -624px;}
a.log_btn:active { background-position:0 -672px; box-shadow:none;}
.ipt_tips { position:absolute; top:0; left:11px; line-height:34px; color:#999; z-index:1  }
.ipt .error { position:absolute; right:-1px; top:-1px; z-index:3; border:1px solid #faa; background-color:#fff2ed; padding:5px; line-height:24px; color:#f00  }
.ipt .error em { position:absolute; background:url(http://s.yunfan.com/style/images/common/icons_log.png) no-repeat 0 -376px; width:7px; height:8px; display:block; left:-6px; top:13px;}


/*登录模块样式*/
#login .ipt { padding:0;}
#login .ipt i { display:block; float:left; width:34px; height:34px; border-right:1px solid #ccc; filter:alpha(opacity=60); opacity:0.6}
#login .ipt_hover i { filter:alpha(opacity=100); opacity:1.0} 
#login .i_account { background:url(http://s.yunfan.com/style/images/common/icons_log.png) no-repeat 5px 5px #f2f2f2;}
#login .i_psw { background:url(http://s.yunfan.com/style/images/common/icons_log.png) no-repeat 5px -31px #f2f2f2; }
#login .ipt input {left:47px; width: 247px;}
#login .ipt_tips { left:47px; }
#login .log_check { display:block; line-height:16px; height:16px; margin:-2px 0 10px; vertical-align:middle }
#login .log_check label { display:inline-block; float:left; height:16px; line-height:16px; vertical-align:middle;}
#login .log_check a { float:right;}
#login .log_check a:hover { color:#333; text-decoration:underline}

/*登录注册弹窗*/
#dialog-log { right:0; top:45px; border-top:0;}
.dialog .log_form { padding:35px 35px 30px;}
#dialog-others { display:block; border-top:1px solid #ddd; background-color:#f5f5f5; padding:20px 35px; _padding:20px 15px 20px 35px; width:300px;}
#dialog-others p { line-height:14px;}
#dialog-others .others_btn { width:320px; display:block; margin:0 auto; padding-top:12px; overflow:hidden; height:36px;}
#dialog-others li { float:left; width:45px; height:36px; overflow:hidden; padding-right:6px;}
#dialog-others li a { display:block; width:25px; height:28px; background-color:#e5e5e5; padding:4px 10px; }
#dialog-others li a:hover { color:#fff; background-color:#ff6060; line-height:14px; text-align:center  }
#dialog-others li a span { display:none; line-height:28px;}
#dialog-others li a:hover span { display:block}
#dialog-others li i { margin:6px 4px; *margin:10px 4px;}
#dialog-others li a:hover i { display:none }

</style>


<div class="dialog" id="" > 
      <div class="dialog_t">       
	  <h3>精彩美女秀，立即登录</h3>        
	  <a style="display:none" href="javascript:;" class="close" title="关闭" id="closeDialog_c7e3_f75d"></a>   
	  </div>        
	  <div class="log_form" id="login">       
		  <div class="ipt">           
		  <i class="i_account"></i>       
		  <input type="text" id="txtName_6ee2_da3b">      
		  <span class="ipt_tips">请输入帐号</span>        
		  <span class="error" style="display:none">            
		  <em></em>            </span>        </div>      
		  <div class="ipt">            <i class="i_psw"></i>       
		  <input type="password" id="txtPassword_6edc_8cd0">        
		  <span class="ipt_tips">请输入密码</span>     
		  <span class="error" style="display:none">             
		  <em></em>            </span>        </div>     
		  <div class="log_check">                     
		  <label class="log_next">              
		  <input type="checkbox" id="checkOutLogin_0e98_0094" value="1" checked="checked">下次自动登录            </label>   
		  <a href="/user/forget/password/" target="_blank">忘记密码</a>        </div>        <a href="javascript:;" class="log_btn" id="btnLogin_7aeb_f1c1">登&nbsp;&nbsp;录</a>    
	  </div>       
	  </div>




]]></root>


