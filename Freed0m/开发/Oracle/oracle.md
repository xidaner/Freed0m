# Oracle 

ql查询数据库时间最新的一条记录

oracle
```sql
select * from (select *,rownum as sn from tablename order by 时间 desc) as t where sn=1

SELECT * from tablename where 时间=(select max(时间) from tablename)
```



