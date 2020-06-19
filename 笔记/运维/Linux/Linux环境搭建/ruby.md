# 安装 Ruby2.2/2.3/2.4

## 方法一：换yum源安装


```
 yum install centos-release-scl-rh　　　　//会在/etc/yum.repos.d/目录下多出一个CentOS-SCLo-scl-rh.repo源

 yum install rh-ruby23  -y　　　　//直接yum安装即可　　

 scl  enable  rh-ruby23 bash　　　　//必要一步

 ruby -v　　　　//查看安装版本
```

![](img/ruby/2.png)




























