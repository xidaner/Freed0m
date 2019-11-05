# 系统综合密码读取 LaZagne


> 该LaZagne项目是用于开源应用程序获取大量的密码存储在本地计算机上。每个软件都使用不同的技术（纯文本，API，自定义算法，数据库等）存储其密码。开发该工具的目的是为最常用的软件找到这些密码。

![](img/1.png)

Python代码将在不接触磁盘的情况下在内存中进行解释，并且可以在Windows和Linux主机上运行。

## 用法

- 启动所有模块
```
laZagne.exe all
```

- 仅启动特定模块
```
laZagne.exe browsers
```

- 仅启动特定的软件脚本
```
laZagne.exe browsers -firefox
```

- 将找到的所有密码写到文件中 **（普通txt为-oN，Json为-oJ，所有为-oA）**。注意：如果您在解析以多行字符串形式编写的JSON结果时遇到问题，请选中this。
```
laZagne.exe all -oN
laZagne.exe all -oA -output C:\Users\test\Desktop
```

- 帮助
```
laZagne.exe -h
laZagne.exe browsers -h
```

- 安静模式，**标准上不会输出任何内容**
```
laZagne.exe all -quiet -oA
```

- 您可以使用交互式模式，该模式将向用户提示对话框，直到密码正确为止
```
laZagne all -i
```







