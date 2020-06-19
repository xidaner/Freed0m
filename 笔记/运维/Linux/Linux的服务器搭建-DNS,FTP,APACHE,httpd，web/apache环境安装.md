
# apache搭建

## 1下载CertBot

```
yum -y install python-certbot-apache
```
 

## 2.Apache下配置让我们加密

 ```
wget https://dl.eff.org/certbot-auto
``` 
```
chmod a + x certbot-auto

 ```

```
./certbot-auto
```
 

执行配置
```
./certbot-auto --apache

```

https://www.cnblogs.com/ppeenngg/p/7717850.html