<!--
 * @Author: tackchen
 * @Date: 2022-08-03 21:24:33
 * @Description: Coding something
-->
# [Selon](https://www.github.com/theajack/selon)

<p>
    <a href="https://www.github.com/theajack/selon/stargazers" target="_black">
        <img src="https://img.shields.io/github/stars/theajack/selon?logo=github" alt="stars" />
    </a>
    <a href="https://www.github.com/theajack/selon/network/members" target="_black">
        <img src="https://img.shields.io/github/forks/theajack/selon?logo=github" alt="forks" />
    </a>
    <a href="https://www.npmjs.com/package/selon" target="_black">
        <img src="https://img.shields.io/npm/v/selon?logo=npm" alt="version" />
    </a>
    <a href="https://www.npmjs.com/package/selon" target="_black">
        <img src="https://img.shields.io/npm/dm/selon?color=%23ffca28&logo=npm" alt="downloads" />
    </a>
    <a href="https://www.jsdelivr.com/package/npm/selon" target="_black">
        <img src="https://data.jsdelivr.com/v1/package/npm/selon/badge" alt="jsdelivr" />
    </a>
    <a href="https://github.com/theajack/selon/issues"><img src="https://img.shields.io/github/issues-closed/theajack/selon.svg" alt="issue"></a>
</p>
<p>
    <a href="https://github.com/theajack" target="_black">
        <img src="https://img.shields.io/badge/Author-%20theajack%20-7289da.svg?&logo=github" alt="author" />
    </a>
    <a href="https://www.github.com/theajack/selon/blob/master/LICENSE" target="_black">
        <img src="https://img.shields.io/github/license/theajack/selon?color=%232DCE89&logo=github" alt="license" />
    </a>
    <a href="https://cdn.jsdelivr.net/npm/selon"><img src="https://img.shields.io/bundlephobia/minzip/selon.svg" alt="Size"></a>
    <a href="https://github.com/theajack/selon/search?l=javascript"><img src="https://img.shields.io/github/languages/top/theajack/selon.svg" alt="TopLang"></a>
    <a href="https://www.github.com/theajack/selon"><img src="https://img.shields.io/librariesio/dependent-repos/npm/selon.svg" alt="Dependent"></a>
    <a href="https://github.com/theajack/selon/blob/master/test/test-report.txt"><img src="https://img.shields.io/badge/test-passed-44BB44" alt="test"></a>
</p>

<h2>🚀 Select from Json: Json Query Language </h2>

**[中文](https://github.com/theajack/selon) | [Online Use](https://theajack.github.io/jsbox?github=theajack.selon@master) | [Message Board](https://theajack.github.io/message-board?app=selon)**

----

## 1. Quick to use

### 1.1 npm reference

```
npm i selon
```

```js
import {selon} from 'selon';

selon([
    {name: 'user1', age: 15}, 
    {name: 'user2', age: 20}
]).select('name')
    .where('age<18')
    .run();
```

### 1.2 script attribute configuration

```html
<script src='https://cdn.jsdelivr.net/npm/selon'></script>
```

Or referenced by version:

```html
<!-- uses the specified version -->
<script src='https://cdn.jsdelivr.net/npm/selon@x.x.x'></script>
<!-- use the latest version -->
<script src='https://cdn.jsdelivr.net/npm/selon@latest'></script> 
```

## selon

For usage, please refer to: [selon.d.ts](https://github.com/theajack/selon/blob/master/packages/selon/src/selon.d.ts)

### 0. .run()

Execute the entire query statement

Execute the entire query statement. This method means that the query statement ends and returns the query result. It can also be executed by adding a true after the last method. Example: user.select('*').run() and. user.select('*',true)。

Note: This method is only valid for selon objects whose data is an array

'Parameter: null; Return value: data'

```js
var data=[{name:"name1",pw:"p1"},
		{name:"name2",pw:"p2"}];

var result=selon(data).select("*").run();
Equivalent to user.select("*",true).
```

### 1. .select()

Query statements

Queries the specified properties of each element in the data and composes a new data (the data can be arrays, objects, or other single-valued types). <span class='red'> If you only want to take effect on data that meets the requirements of a certain feature, you need to use it with the where method, which will be described in a later section. </span>

'Parameters: String(attribute), [Boolean(run)]; Return value: data| BQL`

```js
var data = [{name:"name1",pw:"p1",age:21},
		{name:"name2",pw:"p2",age:22}];
var users = selon(data);
var result=users.select("*",true);
var result1=users.select("name",true);
var result2=users.select("name,age",true);
```

### 2. .select(name)

Alias the column names

Aliases query results. The property name of the query result is replaced by the alias.

'Parameters: String (property alias), [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"n1",age:10,sex:"male"},
		{name:"n2",age:12,sex:"male"},
		{name:"n3",age:20,sex:"female"},
		{name:"n4",age:22,sex:"female"}];
var users = selon(data);
var result=users.select("name nickname,age",true);
var result1=users.select("name nickname, age age", true);
```

### 3. .select(distinct)

Deduplicate query results

Deduplicate query results. If there are multiple attributes, multiple attributes that are the same will be removed.

'Parameters: String(attribute), [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"name1",pw:"p"},
		{name:"name2",pw:"p"},
		{name:"name3",pw:"p3"},
		{name:"name3",pw:"p3"},];
var users = selon(data);
var result=users.select("distinct pw",true);
var result1=users.select("distinct pw,name",true);

```

### 4. .select()|func

Use aggregate functions

Use aggregate functions on your data. Aggregate functions include count, count(distinct), sum, avg, min, max, first, last. When not used with groupBy, select can only contain one attribute with an aggregate function, not other attributes.

'Parameters: String(func(attribute)),[Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"n1",age:10,sex:"male"},
	{name:"n2",age:12,sex:"male"},
	{name:"n3",age:20,sex:"female"},
	{name:"n4",age:22,sex:"female"}];
var result=selon(data).select("count(*)",true);
var result1=selon(data).select("sum(age) sum",true);// aliases can also be set
		More aggregate functions are available for readers to try for themselves

```

### 5. .update()

Update the value of the property

Update (modify) the value of a property in the data as a string. The disadvantage is that the value type is converted to a string. If the original data is not a string type, the original data type is destroyed.

'Parameters: String (property), String (value), [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"name1",pw:"p1",age:21},
	{name:"name2",pw:"p2",age:22},
	{name:"name3",pw:"p3",age:23}];
selon(data).update("pw","same pw",true);
selon(data).update("name,age","same name,same age",true);
```

### 6. .update(JSON)

Update the value of the property

Update (modify) the value of an attribute in the data in JSON format. Fixed the disadvantage that the previous section could only be a string. Can only be any type without destroying the original data type.

'parameters: JSON,[Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"name1",pw:"p1",age:21},
		{name:"name2",pw:"p2",age:22},
		{name:"name3",pw:"p3",age:23}];
selon(data).update({
	name:"same name",
	age:20// does not destroy the original data type
},true);

```

### 7. .add()

Add properties

Add the property as a string. You cannot add an existing attribute, otherwise an error will be reported

'Parameters: String (property), String (value), [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"name1"},
		{name:"name2"}];
var users = selon(data);
users.add("pw","same pw",true);
users.add("age,sex","20,male",true);

```

### 8. .add(JSON)

Add Validation

Add properties in JSON format. You cannot add an existing attribute, otherwise an error will be reported

'parameters: JSON,[Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"name1"},
		{name:"name2"}];
var users = selon(data);
users.add({
	pw:"same pw",
	age:20,
	sex: "female"
},true);
```

### 9. .remove()

Remove the attribute

Remove the element's attributes.

'Parameters: String(attribute), [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"name1",pw:"p1",age:21,sex:"male"},
	{name:"name2",pw:"p2",age:22,sex:"female"}];
var users = selon(data);
users.remove("pw",true);
users.remove("age,sex",true);
```

### 10. .insert()

Insert an element

Inserts an element as a string. This method is only valid for selon objects whose data is arrays

'Parameters: String (property), String (value), [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"name1",pw:"p1"},
	{name:"name2",pw:"p2"}];
var users = selon(data);
users.insert("name,pw","new name,new pw",true);
users.insert("name,pw","new name1; new name2,new pw1; new pw2",true);
users.insert("name,pw","name common,new pw1; new pw2",true);
```


### 11. .insert(JSON)

Insert an element

Insert JSON or JSON arrays. This method is only valid for selon objects whose data is arrays

'Parameter: JSON| JSON Array,[Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"name1",pw:"p1"},
	{name:"name2",pw:"p2"}];
var users = selon(data);
users.insert({
	name:"new name",
	pw:"new pw"
},true);
users.insert([{
	name:"new name1",
	pw:"new pw1"
},{
	name:"new name2",
	pw:"new pw2"
}],true);
```

### 12. .insert(index)

Specifies the location to insert

Inserts an element at the specified location. This method is only valid for selon objects whose data is arrays

'Parameter: (JSON| JSON Array)| (String,String),[int],[Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"name1",pw:"p1"},
	{name:"name2",pw:"p2"}];
var users = selon(data);
users.insert("name,pw","new,new1; new2",1,true);// indexes are 0-based
users.insert({
	name:"new name1",
	pw:"new pw1"
},1,true);
```

### 13. .delete()

Delete an element

Delete an element. To remove elements that meet specific requirements, use them in conjunction with the where method. This method is only valid for selon objects whose data is arrays

'parameter: [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"name1",pw:"p1"},
	{name:"name2",pw:"p2"}];
var users = selon(data);
users.delete(true);
// If you need to delete a feature element, use it with the where statement
```

### 14. .delete(index)

Specifies the location to delete

Specifies the location to delete. To remove elements that meet specific requirements, use them in conjunction with the where method. This method is only valid for selon objects whose data is arrays

'parameters: [int],[Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"name1",pw:"p1"},
	{name:"name2",pw:"p2"}];
var users = selon(data);
users.delete(0,true);//Delete the first element
```

### 15. .where()

Conditional judgment

Make a conditional deletion of other statements (including select, update, add, remove, delete, groupBy, orderBy) in the form of String, and the elements that do not meet the conditions will not execute other statements. For multiple conditions, only the AND relationship between them is satisfied. For something else, refer to .where(exp). This method is only valid for selon objects whose data is arrays

'Parameters: String (property), String (value), [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"same name",pw:"p1"},
	{name:"same name",pw:"p2"},
	{name:"name3",pw:"p3"}];
var users = selon(data);
var result=users.select("*").where("name","same name",true);
var result=users.select("*").where("name,pw","same name,p1",true);//The relationship between multiple conditions is AND
```

### 16. .where(JSON)

Conditional judgment

Use JSON to make a conditional deletion of other statements. The effect is similar to the previous section. For multiple conditions, only the AND relationship between them is satisfied. For something else, refer to .where(exp).

'parameters: JSON,[Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"same name",pw:"p1"},
	{name:"same name",pw:"p2"},
	{name:"name3",pw:"p3"}];
var users = selon(data);
var result=users.select("*").where({
	name:"same name",
	pw:"p1"
},true);

```

### 17. .where(exp)

Conditional judgment

Make a conditional deletion of other statements in the form of a js boolean expression. The effect is similar to the previous section. For multiple conditions, you can customize the AND or NOT relationship between them, following the JS syntax.

'Parameters: String(Boolean expression), [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"same name",pw:"p1",age:11,marry:true},
	{name:"same name",pw:"p2",age:12,marry:false},
	{name:"name3",pw:"p3",age:13,marry:false}];
// var users = selon(data);
Try writing your own boolean expressions following the js syntax
Such as "age>=12" "marry" "!marry", etc., or use them &&|| Combined use
var result=users.select("name,age").where("name=='same name'",true);
var result=users.select("name,age").where("$index==0",true);
// Select the first piece of data
var result=users.select("name,age").where("$i>0&&name=='same name'",true);
// The first piece of data is filtered, note: $i is equivalent to $index

```

### 18. .groupBy()

Group data

To group data, parameters can only be a single property, which can be used separately, returning a two-dimensional array. However, it is usually used with aggregate functions, as described in the next section. Can be used in conjunction with the where statement.

'Parameters: String (single property), [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"n1",age:10},
	{name:"n2",age:10},
	{name:"n3",age:20},
	{name:"n4",age:20}];
var users = selon(data);
var result=users.groupBy("age",true);
var result=users.groupBy("age").where("name!='n2'",true);
// The order of groupBy and where can be reversed
// It can also be used in conjunction with the select statement
```

### 19. .groupBy()|func

Use aggregate functions

Group data and use aggregate functions for grouping. Aggregate functions include count, count(distinct), sum, avg, min, max, first, last.

'Parameters: String(attribute), [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"n1",age:10,sex:"male"},
	{name:"n2",age:12,sex:"male"},
	{name:"n3",age:20,sex:"female"},
	{name:"n4",age:22,sex:"female"}];
var users = selon(data);
var result=users.select("count(age)",true);
var result=users.select("count(age),sex").groupBy("sex",true);
// Due to space limitations, readers are invited to use the count, sum, avg, min, max, first, last, count(distinct) functions
```

### 20. .orderBy()

Sort the data

Sorts BQL data based on a certain attribute, and returns the sorting result, which is ascending by default. Sorting does not affect the original data.

'Parameters: String (single property), [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"n1",age:14,sex:"male"},
	{name:"n2",age:12,sex:"male"},
	{name:"n3",age:20,sex:"female"},
	{name:"n4",age:16,sex:"female"}];
var users = selon(data);
var result=users.orderBy("age",true);
var result=users.select("name").orderBy("age",true);
var result=users.select("name").groupBy("sex").orderBy("age",true);
```

### 21. .orderBy(order)

Sort the data

Sorts BQL data based on an attribute and returns the sorting result. You can choose ascending or sorting. Order types are not case-sensitive.

'Parameters: String(single attribute), [String(desc|asc)], [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"n1",age:14},
	{name:"n2",age:12},
	{name:"n3",age:20},
	{name:"n4",age:16}];
var users = selon(data);
var result=users.orderBy("age","desc",true);
```

### 22. .orderBy(type)

Sort the data

Sorts BQL data based on an attribute and returns the sorting result. You can select the type of attribute value. Value types are case-sensitive and there are the following types (data, length, headLetter, Number), where Number is the default value.

'Parameters: String(single attribute), [String(desc|asc)], [String], [Boolean(run)]; Return value: data| BQL`

```js
var data=[{name:"aaa",height:170,birth:"1994-03-01"},
	{name:"dd",height:180,birth:"1994-02-01"},
	{name:"ccccc",height:176,birth:"1994/08/01"},
	{name:"bbbbbb",height:177,birth:"1994/07/01"}]; 
var users = selon(data);
var result=users.orderBy("birth","date",true);
var result=users.orderBy("name","length",true);
var result=users.orderBy("name","desc","headLetter",true);
var result=users.orderBy("height","desc","number",true);
// number is the default value, you don't need to add this attribute
```

### 23. .set()

Set up new data

Set up new data. The setting is a clone version, and changes to the set data will not affect the BQL data. The type of the data to be set must be the same as the original data, otherwise an exception will be thrown.

'parameter: data; Return value: data'

```js
var data=[{name:"n1",age:14},
	{name:"n2",age:12}];
var users = selon(data);
var newdata=[{name:"new1",age:12},
	{name:"new2",age:12},
	{name:"new3",age:12}];
users.set(newdata);
// The following is to prove that the settings are a clone version of newdata, and changes to newdata data will not affect BQL
```

### 24. .get()

Get the cloned data

The clone version of the BQL data is obtained, and its data changes will not affect the BQL.

'Return value: data'

```js
var data=[{name:"n1",age:14},
	{name:"n2",age:12}];
var users = selon(data);
var data=users.get();

```

### 25. .data()

Get the original data

The original BQL data is obtained, and its data changes will affect the BQL

'Return value: data'

```js
var data=[{name:"n1",age:14},
	{name:"n2",age:12}];
var users = selon(data);
function dataTest(){
var data=users.data();
```

### 26. .clear()

Clear the data

Empty the data of the BQL object. The array type selon's data is set to [], and the object type is set to {} or null

'Return value: data'

```js
var data=[{name:"n1",age:14},
	{name:"n2",age:12}];
var users = selon(data);
users.clear();
```

## [selon-view](https://github.com/theajack/selon/blob/master/scripts/docs/selon-view.md)

Please refer to [selon-view.md](https://github.com/theajack/selon/blob/master/scripts/docs/selon-view.md)

## [selon-view query](https://github.com/theajack/selon/blob/master/scripts/docs/sv-attr.md)

Please refer to [selon-view.md](https://github.com/theajack/selon/blob/master/scripts/docs/sv-attr.md)
