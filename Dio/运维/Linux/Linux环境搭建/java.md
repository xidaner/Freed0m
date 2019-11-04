# Jenkins的搭建和java环境安装

https://blog.csdn.net/miss1181248983/article/details/82840006

## 1.下载地址

         http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

![](img/java/1.png)

把安装包复制到Linux的目录下，具体工具可以使用xshell，这里不再赘述。

## 2 通过Xshell连接到虚拟机，执行如下命令，解压文件：

```
cd (文件目录)
 tar zxvf 安装的java压缩包名称
```

![](img/3.png)

## 3 使用Vi编辑器，设置环境变量


    sudo vi /etc/profile

>在文件最后，添加如下内容：       
```
#Java Env
export JAVA_HOME=/usr/jdk1.8.0_221
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin
```
## 然后退出vi编辑器，使环境变量设置立即生效

       source /etc/profile

## 查看jdk是否安装成功，安装了什么版本

        java -version


![](img/java/2.png)










