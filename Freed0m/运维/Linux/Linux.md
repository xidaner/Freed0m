# Linux

**解决中文乱码问题**
```
在命令行输入

dpkg-reconfigure locales
```
> 进入图形化界面之后，（空格是选择，Tab是切换，*是选中）
```
选中en_US.UTF-8和zh_CN.UTF-8，确定后，将en_US.UTF-8选为默认。


安装中文字体

apt-get install xfonts-intl-chinese 
apt-get install ttf-wqy-microhei
重启
```


oracl TNS Listener Remote Poisoning
