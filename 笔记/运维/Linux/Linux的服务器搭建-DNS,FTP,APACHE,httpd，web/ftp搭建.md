# FTP服务的搭建

## 安装

```
yum -y install vsftpd    服务端

yum -y install ftp        客户端

yum -y install db4 db4_utils 虚拟用户认证的db文件
```

## 1,虚拟用户的创建

 2.文件配置的修改：
 ```
 cat /etc/vsftpd/vsftpd.conf > test
 ```

 ```
 vi vsftpd.conf
 ``` 
 >进行修改 最后添加：guest_enable=YES //设定启用虚拟用户功能
```
guest_username=vuser 
//指定虚拟用户的宿主用户，CentOS中已经有内置的vuser用户了
 ```
3.刚创建的
```
user_config_dir=/etc/vsftpd/vuser_conf
```
>设定虚拟用户个人vsftp的CentOS FTP服务文件存放路径。存放虚拟用户个性的CentOS FTP服务文件(配置文件名=虚拟用户名


## 二、vsfptd常用配置

1、匿名用户的常用配置 

annoymous_enable=YES  #是否启用匿名用户

anno_upload_enable=YES #是否允许匿名用户上传权限

anno_mkdir_write_enable=YES #是否允许匿名用户可创建目录及其文件

anno_other_write_ebable=YES #匿名用户是否除了写权限是否拥有删除和修改的权限 

anno_world_readable_only=YES #匿名用户是否拥有只读权限  

no_anno_password=YES #匿名用户是否跳过密码检测  

anno_umask=077 #匿名用户创建文件的掩码权限   

2、系统用户的配置 

local_enable=YES #是否启用本地用户  

write_enable=YES #本地用户是否可写 

local_mask=022 #本地用户的掩码信息

3、禁锢所有ftp用户在其家目录下  

chroot_local_user=YES  

4、禁锢文件中指定的ftp本地用户在其家目录下  

chroot_list_enable=YES 

chroot_list_file=/etc/vsftpd/chroot_list

5、改变上传文件的属主 

chown_uploads=YES   

chown_username=whoever   

6、是否启用控制用户登录的列表信息  

userlist_enable=YES 

userlist_deny=YES|NO 

此配置文件默认为:/etc/vsftpd/user_list 

## 3. 修改配置文件 

```
Vi /etc/vsftpd/ftpusers 
Vi /etc/vsftpd/user_list 
```
进入之后把root删掉，因为之前是存在的所以禁止登入 