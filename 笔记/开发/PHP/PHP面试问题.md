Q1.描述PHP

Ans： PHP是一种服务器端脚本语言，最常用于Web应用程序。PHP附带了各种框架和CMS，可以帮助创建网站。面向对象，PHP类似于Java和C＃等语言，这使得它易于学习和实现。一些基于PHP的流行应用程序是WordPress和osCommerce。

Q2.显示在PHP中使用“echo”的内容

Ans：PHP中echo的主要目的是帮助在网页中打印数据。例如，以下代码从网页打印此项目的文本： <？php echo'Branded shirts'; ？>

Q3.PHP页面中包含文件的方式是什么？

Ans： 将文件包含到PHP页面很简单。我们需要做的就是使用带有文件路径的 include() or require() 函数作为参数。

Q4.如何包括不同于要求？

答： 之间的主要区别 include 和 require 涉及文件执行。当require() 找不到文件时会发生什么，会发生 致命错误，导致脚本无法执行。然而，当 include() 找不到文件时，它会发出警告，但不会停止执行，这可以继续。

Q5.描述require_once（），require（）和include（）之间的区别。

Ans： 这些之间的主要区别在于，虽然 require() 包含和评估特定文件， require_once() 但同样如此，但前提是它之前未包含在同一页面上。因此，理想情况下，建议require_once() 在要包含有许多功能的文件时使用 。这是确保多次不包含文件并避免“重新声明函数”错误的一种方法。

Q6.GET和POST方法之间的基本区别是什么？

Ans： 这些是GET和POST方法的基本区别：

在GET方法中，可以只发送1024个字节，但是使用POST方法，我们可以传输更大量的数据。
GET方法比POST方法安全性相对较低。
Q7.你如何在PHP中声明一个数组？

答： var $arr = array('brinjal', 'cucumber', 'carrot');

Q8.PHP中“打印”的用途是什么？

Ans： 具有讽刺意味的是，'print'函数在PHP中不是真正的函数。相反，它是一种语言结构，这意味着它可以在没有括号的情况下使用其参数列表。

例：

print('Personality Development');

print 'management test';

Q9.PHP中in_array（）函数的用途是什么？

答： 该 in_array 是指用于检查是否一个数组包含一个值。

Q10.解释在PHP中使用count（）函数

Ans： 使用 count() 是双重的：1。计算数组中的所有元素; 2.计算对象中的某些内容。

Q11.以什么方式包含并要求彼此不同？

Ans： 这些功能彼此不同主要在于它们处理故障的方式。如果 require() 找不到该文件，将导致致命错误，该错误将停止执行该脚本。另一方面，如果 include() 找不到文件，它将发出警告，但继续执行。

Q12.你如何区分会话和Cookie？

答： 我们可以通过以下方式解释会话和cookie之间的差异：

会话存储在服务器上时，cookie以文本文件格式存储在用户的计算机上。
虽然cookie不能容纳多个变量，但会话可以。
可以为cookie设置过期，因为只要浏览器处于打开状态，会话就会保持活动状态。由于数据在会话中存储在服务器中，因此不允许访问用户。
Cookie用于跟踪用户活动，而会话主要用于登录/注销。
Q13.如何在PHP中设置Cookie？

答：Setcookie("sample", "ram", time()+3600);

Q14.如何检索Cookie值？

答：echo $_COOKIE["user"];

Q15.会话是如何创建的？会话中的价值集如何？如何从会话中删除数据？

答：

创建会话： session_start();
设置会话的值： $_SESSION['USER_ID']=1;
从会话中删除数据： unset($_SESSION['USER_ID'];
问16.使用explode（）函数有什么用途？

Ans： 语法： array explode (string $delimiter, string $string [, int $limit ]);

这个函数的作用是将字符串分解为数组。每个数组元素是字符串的子字符串，通过将其分割在由字符串分隔符形成的边界上而形成。

Q17.区分explode（）和str_split（）函数

Ans： 该 str_split 函数使用正则表达式将字符串拆分为数组; explode 将字符串拆分为数组。

Q18.描述mysql_real_escape_string（）函数的用途？

Ans： 该 mysql_real_escape_string() 函数用于转义字符串中的特殊字符，以便在SQL语句中使用。

Q19.header（）函数在PHP中有什么用？

Ans： 该header() 函数的目的 是将原始HTTP标头发送到客户端浏览器。请记住，在发送实际输出之前必须调用此函数。例如，确保在使用此功能之前不打印任何HTML元素。

Q20.如何在PHP中重定向页面？

Ans： 可以使用以下代码完成： header("Location:index.php");

Q21.如何停止执行PHP脚本？

Ans： 可以使用该exit() 函数停止执行PHP脚本 。

Q22.在基于PHP的站点中，页面如何设置为主页？

Ans： 在所有基于PHP的站点中，index.php是主页的默认名称。

Q23.你如何找到字符串的长度？

答： 一个字符串的长度可以使用找到 strlen() F结。

Q24.描述在PHP中使用rand（）

Ans： rand() 可用于生成随机数。如果在没有参数的情况下调用它，则返回0和0之间的伪随机整数getrandmax()。我们假设你想要一个5到15之间的随机数（包括在内）。在这种情况下，您需要使用rand(5, 15)。请注意， rand() 不能用于生成加密安全值，因此应避免将其用于加密。但是，如果您正在寻找加密安全值，您可以考虑使用 openssl_random_pseudo_bytes() 。

Q25.描述在PHP中使用isset（）

答： 该isset() F结在PHP用于确定是否一个变量被设定，并没有NULL。

Q26.mysql_fetch_array（）和mysql_fetch_assoc（）如何相互不同？

答： 虽然 mysql_fetch_assoc 函数获得的结果一行作为关联阵列; 所述 mysql_fetch_array() 取任一个关联数组，数字数组，或两者。

Q27.什么是关联数组？

Ans： 使用字符串键的数组称为关联数组。

Q28.对于什么目的是使用的HTML表单中的“操作”属性？

Ans： action属性的目的是确定在表单提交中发送表单数据的位置。

Q29.“enctype”属性在HTML表单中有什么用处？

Ans： 此属性有助于理解在将表单数据提交到服务器时应对其进行编码的方式。

enctype 需要设置为multipart/form-data 使用表单上传文件时。

Q30.什么是常数？

Ans： 使用 define() 指令，比如 define ("MYCONSTANT",150)

Q31.描述在PHP中使用“ksort”

Ans：ksort 我习惯按相反的顺序按键对数组进行排序。

Q32.什么是SQL注入？

Ans：SQL注入是一种恶意代码注入技术，可识别和利用Web应用程序中的SQL漏洞。

Q33.为什么需要在fopen（）中使用x +模式？

Ans： 用于以下内容：读/写。它创建一个新文件并返回FALSE，如果该文件已存在则返回错误。

Q34.查找字符串中第一次发生子串的位置的方式是什么？

Ans： 找到字符串中第一次出现子字符串的位置 strpos()。


- 现在编程中经常采取MVC三层结构，请问MVC分别指哪三层，有什么优点？

MVC三层分别指：业务模型、视图、控制器，由控制器层调用模型处理数据，然后将数据映射到视图层进行显示。

优点是：①可以实现代码的重用性，避免产生代码冗余；②M和V的实现代码分离，从而使同一个程序可以使用不同的表现形式

- 对json数据格式的理解？

JSON(JavaScript Object Notation)是一种轻量级的数据交换格式，json数据格式固定，可以被多种语言用作数据的传递。
PHP中处理json格式的函数为json_decode( string $json [, bool $assoc ] ) ，接受一个 JSON格式的字符串并且把它转换为PHP变量，参数json待解码的json string格式的字符串。assoc当该参数为TRUE时，将返回array而非object；
Json_encode：将PHP变量转换成json格式。


11、Print、echo、print_r有什么区别？

（1） echo和print都可以做输出，不同的是，echo不是函数，没有返回值，而print是一个函数有返回值，所以相对而言如果只是输出echo会更快，而print_r通常用于打印变量的相关信息，通常在调试中使用。
（2） print 是打印字符串
（3）print_r 则是打印复合类型 如数组 对象



12、SESSION与COOKIE的区别？

（1）存储位置：session存储于服务器，cookie存储于浏览器
（2）安全性：session安全性比cookie高
（3）session为‘会话服务’，在使用时需要开启服务，cookie不需要开启，可以直接用



二 、数据库部分

常见的关系型数据库管理系统产品有？
答：Oracle、SQL Server、MySQL、Sybase、DB2、Access等。

SQL语言包括哪几部分？每部分都有哪些操作关键字？
答：SQL语言包括数据定义(DDL)、数据操纵(DML),数据控制(DCL)和数据查询（DQL）四个部分。
数据定义：Create Table,Alter Table,Drop Table, Craete/Drop Index等
数据操纵：Select ,insert,update,delete,
数据控制：grant,revoke
数据查询：select

完整性约束包括哪些？
数据完整性(Data Integrity)是指数据的精确(Accuracy) 和 可靠性(Reliability)。

包括：

（1）实体完整性：规定表的每一行在表中是惟一的实体。

（2）域完整性：是指表中的列必须满足某种特定的数据类型约束，其中约束又包括取值范围、精度等规定。

（3）参照完整性：是指两个表的主关键字和外关键字的数据应一致，保证了表之间的数据的一致性，防止了数据丢失或无意义的数据在数据库中扩散。

（4） 用户定义的完整性：不同的关系数据库系统根据其应用环境的不同，往往还需要一些特殊的约束条件。用户定义的完整性即是针对某个特定关系数据库的约束条件，它反映某一具体应用必须满足的语义要求。


三、 面向对象部分

1、什么是面向对象?（理解着回答）

面向对象是一种思想，是基于面向过程而言的，就是说面向对象是将功能等通过对象来实现，将功能封装进对象之中，让对象去实现具体的细节。

面向对象有三大特征：封装性、继承性、多态性。

现在纯正的OO语言主要是 Java 和 C#，PHP、C++也支持OO，C是面向过程的。



6、抽象类和接口的概念以及区别？

抽象类：它是一种特殊的，不能被实例化的类，只能作为其他类的父类使用。使用abstract关键字声明。

接口：它是一种特殊的抽象类，也是一个特殊的类，使用interface声明。



- 什么是构造函数，什么是析构函数，作用是什么？

构造函数（方法）是对象创建完成后第一个被对象自动调用的方法。它存在于每个声明的类中，是一个特殊的成员方法。作用是执行一些初始化的任务。Php中使用__construct()声明构造方法，并且只能声明一个。

析构函数（方法）作用和构造方法正好相反，是对象被销毁之前最后一个被对象自动调用的方法。是PHP5中新添加的内容作用是用于实现在销毁一个对象之前执行一些特定的操作，诸如关闭文件和释放内存等。






