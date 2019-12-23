# PHP报错

![](img/2.png)

# 错误处理

## 错误处理
> 指的是系统(或者用户)在对某些代码执行的时候，发现有错误，就会通过错误处理的形式告知`程序员`。



## 错误分类

1. 语法错误：用户书写的PHP代码不符合规范导致无法编译，语法错误会导致代码在编译过程中不通过。`(parse error)`


2. 运行时报错: 代码编译通过，但是代码在执行的过程中会出现一些条件不满足导致的错误。`(runtime error)`

3. 逻辑错误：程序员在写代码的时候不够规范，出现了一些逻辑性的错误导致代码正常执行但是得不到想要的结果。`()`



**解析错误**:

`parse error`



**语法错误**：

`syntax error`



**没有变量**

> 没找到变量XXX
`Notice：Undefined variable：xxx`
  通知



**定义错误 -- 以数字开头**
![](img/1.png)




**Fatal error**

致命错误；严重错误；致命的错误


**required**函数出错

failed opening required  `require文件包含出错`



**E_PARSE**  

编译错误代码不会执行。


**E_WARNING**

警告错误：不会影响代码执行，但是可能得到预想不到的结果。


**E_EOTICE**

通知错误，不会影响代码执行。

 
## 用户错误：

别问 问就是撒比乙方




## 错误触发

程序运行时触发：系统自动根据错误发生后，对比对应的错误信息，输出给用户:
注意针对代码的语法错误和运行时的错误。

**触发姿势**

人为触发：知道某些逻辑可能会出错，从而用对应的代码进行触发，
一句话概括：`我 错 我 自 己`
`(A君：我看你是没吃饭就撑着。)`

可以理解为 把用户的错误输入给翻译成人能看得懂的输出。

最简单的报错处理：trigger_errors()函数，但是该函数不会阻止系统报错。

也就是相当于一个提示。

PHP系统提供了一种用户处理错误的机制：用户定义错误处理函数，然后将该函数增加至操作系统错误处理的句柄中。

`(B君:可以理解为，自定义了一个函数报错加入到报错规则中，可以随时调用)`
`(A君：Fatal error 小逼崽子你密码写错了，是不是在爆破啊，行不行我三天之内撒了你)`





# **错误显示设置**：

错误显示设置：那些错误应该显示，应该如何显示。

在PHP中，其实有两种方式来显示。当前脚本中的错误信息的处理。


1. PHP的配置:全局配置  -- `php.ini`文件.

display_error:是否显示错误。

error_reporting:显示什么级别的错误。



# 字符串

## 1. 结构化定义字符串变量的规则

**1.1 上边界符后面不能跟任何内容**
```php
s1 = <<<EOD
hello 
			word    
							my
		friend
EOD;

var_dump($s1);

$s2 = <<<'EOD'
hello 
			word    
							my
		friend
EOD;
var_dump($s2);

```

> 在EOD后面不能更近任何符号 空格都不行注释也不行如果有就报错。


**1.2 下边界符必须顶格：在最左边。不然系统无法匹配到，会报错。**

**1.3 下边界符同样后面之内跟分号，不能更任何其他内容。**

## 2. 结构化定义字符串的内部(边界符之间) 的所有内容都是字符串本身


---

## 连接错误

mysqli_connect()

mysqli 数据库连接错误。


主动显示 `MySQL` 连接错误：`mysqli_error();` `mysqli_errno();`


---

# 文件操作

- 即对文件进行的操作

PHP提供了一套文件操作系统函数。通过这套函数来进行:

对于文件的修改，对于文件的删除，对于文件的重命名，对于文件的移动等。都可以使用这套函数进行。

文件的理解：

系统识别的文件只有两种：

1. 文件

2. 文件夹




## 文件相关信息

1. file_exists(filename);

说明:改函数用于判断一个文件是否存在。

`filename` 必须为一个表示文件的完整名的一个。


```php
<?php
header('Content-type:text/html;charset=utf-8');
// include_once 'link_mysql.php';

$file = './1.txt'; //文件
$file1 = file_exists($file); //判读是否存在
var_dump($file1);//输出是否存在
echo '</br>';

if($file1 == false){
    echo  'nmsl大傻逼乱输入些什么垃圾东西';

}else{
    echo 'nmd文件不就在下面吗：';
    include_once $file; //包含进来
}
;
```

![](img/3.png)


---

2. filemtime($filename)  获取文件修改时间

说明：用于获取文件修改时间的函数

filename   是一个文件的包含文件名的完整路径。

```php
<?php
header('Content-type:text/html;charset=utf-8');
// include_once 'link_mysql.php';

$file = './1.txt'; //文件
$file1 = filemtime($file); //函数获取文件修改的时间
echo date('Y_m-d H:i:s',$file1); //输出出文件信息

if($file1 == false){
    echo  'nmsl大傻逼乱输入些什么垃圾东西';

}else{
    echo 'nmd文件不就在下面吗：';
    include_once $file; //包含进来
}
;
```



3.  filesize($file)             获取文件大小

```php

$file = './1.txt'; //设定文件路径
$size= filesize($file);//获取
echo $size;//输出
```

4. basename(path)    获取文件名
用于获取文件名

```php
$path = './1.txt';
basename($path);
echo $path;
```

5.  realpath(path)  判读路径是否真实存在

```php

$file1= '1.txt';
 realpath($file1); //获取文件路径
var_dump($file1); //输出文件查看是否存在
//输出为一个布尔值。
```
一般布尔值都可以用于判断而进行下一步操作这里不再细讲。



