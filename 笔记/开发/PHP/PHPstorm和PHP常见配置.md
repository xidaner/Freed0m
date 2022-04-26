# phpstorm远程编辑代码技巧

1. 打开PHPStorm，选择`Create New Project from Existing Files`
   
![](img/1.png)

2. 选择模式，选择SFTP

![](img/2.png)

3. 填写本地存储的项目名称

![](img/3.png)

4. 进入配置页面及配置

> 需要目标配置SFTP/FTP服务才可进行。

![](img/4.png)


输入账户密码和对应信息即可。

|选项名称|解释|
|---|---|
|Name |服务器名称 |
|Type |传输模式 |
|FTP host |服务器地址 |
|PORT |默认端口 |
|Root path |根目录 |
|Username| 服务器用户名 |
|Auth type |密码类型 |
|password |密码 |
|Web server root URL |服务器根目录的Url|

**注意要勾选**
![](img/5.png)


6. 点击对应的文件夹，然后点下一步等项目下拉完成。

![](img/6.png)


7. 完成项目的下拉，同步到本地成功。

![](img/7.png)


**配置保存**

1. 在本地写完后最后手动保存到服务器
   ![](img/8.png)
   ![](img/9.png)

2. 设置我们ctrl+s（保存）后，自动同步

   ![](img/10.png)

这时候我们就能在本地编写及保存后实时同步到服务器端了。


