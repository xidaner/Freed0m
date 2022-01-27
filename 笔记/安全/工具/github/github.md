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







