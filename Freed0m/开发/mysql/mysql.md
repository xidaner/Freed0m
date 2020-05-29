# Mysql

> sql查询数据库时间最新的一条记录

```sql
select top 1 * from tablename order by 时间 desc;
```


> 查询已经存储的日期，并按照时间排序输出

```sql
select distinct Date from xxxx  ORDER BY xxxx DESC;
```
> 查询当天来日期在一周年的数据
```sql
select * from ShopOrder where datediff(week,ordTime,getdate()-1)=0 
```

> 查询当天的所有数源据
```sql
select * from ShopOrder where datediff(day,ordTime,getdate()-1)=0 
```

> 查询当天：
```sql
select * from info where DateDiff(dd,datetime,getdate())=0
```

> 查询24小时内的:
```sql
select * from info where DateDiff(hh,datetime,getDate())<=24
```

**info为表名,datetime为数zhidao据库中的字段值**

> 查询当天：
```sql
select * from info where DateDiff(dd,datetime,getdate())=0
```


> 查询24小时内的:

```sql
select * from info where DateDiff(hh,datetime,getDate())<=24
```

**info为表名,datetime为数据库中的字段值** 




> mysql查询最新一组数据,倒叙 取第一条数据。

```sql
SELECT * FROM (SELECT * FROM tablename ORDER BY 排序列 ) AS NEWS GROUP BY 排序列 DESC LIMIT 1
```

SELECT * FROM (SELECT * FROM NT_data_t01 ORDER BY GetDateFlag ) AS NEWS GROUP BY GetDateFlag


查询输出某个查询列的字段的前几位，去重输出
```
SELECT DISTINCT substr(GetDate,1,8) FROM NT_Data_01 ORDER BY GetDate DESC
```


IT 整改 合规性改 







```sql
select CONCAT(extract(hour from 创建时间),'-',extract(hour from 创建时间)+1)时段,DAYNAME(订单创建时间)周几, count(*)计数 FROM [11月订单表] where DAYNAME(创建时间)="monday" GROUP BY extract(hour from 创建时间)unionselect CONCAT(extract(hour from 创建时间),'-',extract(hour from 创建时间)+1)时段,DAYNAME(订单创建时间)周几, count(*)计数 FROM [12月订单表] where DAYNAME(创建时间)="monday" GROUP BY extract(hour from 创建时间);


```


**更新数据**

```
upload xxxx SET table
```


