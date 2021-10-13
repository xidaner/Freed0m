# JAVA

![](img/2.png)

<p align="center">
    <img src="http://p2.music.126.net/4lNebXpSAaYmuvNaqL62MA==/109951165774765732.jpg?param=130y130" width="25%">
</p>

<p align="center">👴 如果黑夜不再点亮,我会奔向你迷失的方向.</p>
<p align="center"><a href="http://music.163.com/song?id=1824450519"><font>《自发光》</font></a> </p>
<p align="center">专辑：自发光</p>
<p align="center">歌手：南游记乐队</p>



> 最近比较喜欢的一首歌...

IDEA使用教程: https://www.cnblogs.com/zyx110/p/10666082.html


## 第一个程序

### 打印函数

```java
package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        System.out.println("hello world");
    }
}
```

## 常数

**常量**: 在程序运行过程中，其值不可以发生改变的量。

 |**常量的分类**|表示含义                              |
 |----------------|----------------------------------- |
 |**字符串常量：**| 用双引号括起来的内容，"Hello world"  |
 |**整数常量：**  |不带小数的数字。'666-888'            |
 |**小数常量：**  |带小数的数字。 13.14，1.12           |
 |**字符常量：**  |用单引号括起来的内容。'A','0','我'    |
 |**布尔常量：**  |布尔值，表示真假。true，false         |
 |**空常量：**    | 一个特殊的值，空值                   |

#### 常见字符串类型

![](img/1.png)

#### 变量

**变量定义**

```java
数据类型    变量名  =   变量值
int         a      =    10;
```

**基本数据类型**

```
byte,short,int,long,float,double,char,boolean
```

**变量的使用**

取值格式：变量名
修改格式：变量名 = 变量值；


**自动类型转换**

![](img/3.png)

把一个表述数据`范围小的数值`或者`变量`赋值给另外一个表示数据 `范围大的变量`

```java
package com.company;

public class Main {

    public static void main(String[] args) {
//        自动类型转换
        double d = 10;
        System.out.println(d);
    }
}
```

![](img/4.png)


**定义byte类型的变量**

```java
    public static void main(String[] args) {
//        定义byte 类型的变量
        byte b = 10;
        short s = b;
        int i = b;
    }
```

数据类型不兼容时无法进行转换

**强制类型转换**

```java
package com.company;

public class Main {

    public static void main(String[] args) {
//            强制类型转换
        int k = (int)88.88;
        System.out.println(k);
    }
}
```

> 将浮点型数据类型转换为 int型

### 运算符和表达式

常见的 `加减乘除取余`

![](img/5.png)

```java
package com.company;

public class Main {

    public static void main(String[] args) {
    //  定义两个变量
        int a = 5;
        int b = 6;
        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b);
        System.out.println(a / b);
        System.out.println(a % b);
    }
}
```

`严格的数据类型校验` 当整数相除时只能得到整数，如果想要得到小数，此时必须有浮点型的参与。

#### 字符串的 + 操作

```java
package com.company;

public class Main {

    public static void main(String[] args) {
    //  定义两个变量
        int i = 10;
        int b = 99;
        // 字符串使用 + 号时就是直接拼接
        System.out.println("芜湖"+"起飞");

        // 当字符串 + 整数时，如果字符串在前则直接拼接在后方
        System.out.println("芜湖塔台"+ i);

        // 当有字符串在前，后面就算整数之间使用+号也是 字符串拼接
        System.out.println("芜湖塔台"+ b + i);

        // 当先是显示整数时，就先做运算后做字符串拼接
        System.out.println(i + b + "年后EDG夺冠");
    }
}
```

> 输出结果
```
芜湖起飞
芜湖塔台10
芜湖塔台9910
109年后EDG夺冠
```

**结论**

当 + 操作中出现字符串时，这个 "+" 是字符串连接符，而不是算术运算符。

```java
System.out.println("芜湖塔台"+ b + i);
```

在 + 操作中，如果出现了字符串，就是连接运算符，否则就是算术运算符。当连续进行 + 操作时，从左到右逐个进行。

```java
System.out.println(i + b + "年后EDG夺冠");
```

#### 赋值运算符

|符号|作用|说明|
|-|-|-
|=|赋值|a=10,将10赋值给变量a
|+=|加后赋值|a+=b,将a+ b的值给a
|-=|减后赋值|a-=b,将a-b的值给a
|`*=`| 乘后赋值|a`*=`b,将a x b的值给a
|/=|除后赋值|a/=b,将a+ b的商给a
|%=|取余后赋值|a%=b,将a+ b的余数给a

#### 自增自减运算符

|符号|作用|说明|
|-|-|-
|++|自增|变量的值加1|
|--|自减|变量的值减1|

**注意事项:**

- `++`和`--`既可以放在变量的后边，也可以放在变量的前边。
- 单独使用的时候， `++`和`--`无论是放在变量的前边还是后边，结果是一样的。
- 参与操作的时候， 如果放在变量的后边，先镎变量参与操作,后拿变量做`++`或者`--`。
  - 参与操作的时候，如果放在变量的前边,先拿量做`++`或者`--`,后拿变量参与操作。























