# webshell

## 1.1 文件上传


>文件上传功能在大多数的 web 应用中都存在，比如用户头像上传，文章内容的图片、视频、音频、附件上传，一些 CMS 系统上传模版文件，数据库备份文件，插件文件等地方。

>一般来说，`对于那些未校验文件类型的上传操作的，可以直接上传我们的小马、大马文件。`

如服务器设置了黑名单，比如某些 `wAF` 设置了不允许上传的文件为php，asp，aspx等的文件，可以更具php的一些可解析文件后缀上传，比如：
php3、php4、php5、phtml等

>黑名单：
```php

array(
    ".php",".php5",".php4",".php3",".php2","php1",
    ".html",".htm",".phtml",".pht",".pHp",".pHp5",".pHp4",".pHp3",
    ".pHp2","pHp1",".Html",".Htm",".pHtml",".jsp",".jspa",".jspx",
    ".jsw",".jsv",".jspf",".jtml",".jSp",".jSpx",".jSpa",".jSw",
    ".jSv",".jSpf",".jHtml",".asp",".aspx",".asa",".asax",".ascx",
    ".ashx",".asmx",".cer",".aSp",".aSpx",".aSa",".aSax",".aScx",
    ".aShx",".aSmx",".cEr",".sWf",".swf"
);
```

## 突破文件上传

实际的环境中，很少有`直接可以任意上传文件的漏洞（常见于前端限制）`
```
前端禁用JS	        前端限制，禁用JS，去除input标签的accept属性
```
操作：Chrome 中：先按 F12 打开开发者工具，再按 F1 打开设置，在debugger中勾选
 ，在General 那一栏找到 Disable JavaScript 勾上即可禁用前端的js了。注意f12的页面不要关闭。

![](img/1.png)

```
修改文件后缀	抓包工具，修改文件后缀为黑名单之外的后缀
```


```
修改文件后缀    	修改文件后缀为index.jpg.php
修改文件后缀    	%00截断，比如index.php%00.jpg
修改文件后缀	    文件名末尾添加::$DATA，windows会把::$DATA之后的数据当成文件流，不会检测后缀名.且保持::$DATA之前的文件名
```











