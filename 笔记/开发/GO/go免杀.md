# go 免杀学习


https://ichxxx.cn/2021/01/06/code_protection_in_go_and_python/#%E5%8A%A0%E5%A3%B3

https://payloads.online/archivers/2019-11-10/3

https://saucer-man.com/operation_and_maintenance/465.html#cl-5

http://iv4n.cc/go-shellcode-loader/#go%E4%B8%AD%E7%9A%84first-class%E5%87%BD%E6%95%B0%E5%AF%B9%E8%B1%A1%E6%98%AF%E4%B8%80%E4%B8%AA%E5%8F%8C%E9%87%8D%E6%8C%87%E9%92%88

http://iv4n.cc/go-shellcode-loader/#shellcode-loader

https://payloads.online/archivers/2019-11-10/3

https://payloads.online/archivers/2019-11-10/1

go get 确实是很忙，跟你git下来一样，我无意中找到的，

```
garble -literals -tiny build <build_flags> <package/main_file>
```


来 cmd打开  输入这两句



第一句是 启用Go Modules 功能

第二句是 配置GOPROXY 国内代理地址，

go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.io

使用 `gobfuscate` 混淆



```
go get -u github.com/unixpickle/gobfuscate
gobfuscate [flags] pkg_name out_path
```

**自动隐藏**

```
go build -ldflags "-H windowsgui"
```




**garble**


https://github.com/burrowers/garble


**库的解释和学习**

- **syscall**

`syscall`包包含一个指向底层操作系统原语的接口。

详细信息取决于基础系统，默认情况下，godoc将显示当前系统的syscall文档。

**RtlCopyMemory与RtlMoveMemory区别**

这两个函数是内核函数api，对应Win32 API是CopyMemory和MoveMemory。都能实现内存块的复制，两者的区别在于CopyMemory是非重叠内存区域的复制，MoveMemory可以不考虑是否重叠，都可以安全复制。




## sm4

https://www.cnblogs.com/mumuzifeng/p/14056154.html

https://blog.csdn.net/bingfeilongxin/article/details/88527477

https://blog.csdn.net/qq_41547659/article/details/113343699



# Python代码安全

**编译成二进制**

工具：[Nuitka](https://github.com/Nuitka/Nuitka)

- 从主文件递归编译整个项目

```
python -m nuitka --remove-output --follow-imports <main_file>
```

- 编译一个包

```
python -m nuitka --remove-output --module --no-pyi-file --include-package=<package> <package>
```

编译后的包（ .pyd / .so ）的使用与正常包无异，直接可以使用 import 导入。


买个白名单证书 打到软件里面面













