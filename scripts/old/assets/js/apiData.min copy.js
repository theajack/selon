module.exports = {
    Attribute: [ {
        title: '如何使用',
        intro: '开始使用BQL',
        test: true,
        func: '这一节介绍BQL的基本使用方法，主要是如何把BQL嵌入到您的html文件中。BQL主要功能是把单值，JSON，JSON数组类型的变量绑定到html元素上，支持双向绑定，动态刷新，以及以类SQL的方式对他们进行操作。具体的属性设置将在下面的章节介绍到。',
        howUse: '以html元素属性的方式使用。',
        code: '<div b-bind="string" b-init="\'test\'">\n\t<!--b-init 的值是String 或者 Number-->\n\t<div>单值类型：<input type="text" value="{{string}}" /></div>\n\t<div>带js语法：<input type="text" value="{{(string==\'test\')?1:0}}" /></div>\n</div><br/> \nJSON单值类型：\n<div b-bind="user" b-init="{nickname:\'theajack\',pw:\'1111\'}">\n\t<!--b-init 的值是Object-->\n\t<div>昵称：{{user.nickname}}</div>\n\t<div>密码：{{user.pw}}</div>\n</div> <br/>\nJSON数组类型：\n<div b-loop="users" b-init="getArray()">\n\t<!--b-init 的值也可以是全局变量或方法-->\n\t<div>昵称：{{each.nickname}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div> \n<script>\n\tfunction getArray(){\n\t\treturn [{nickname:"name1",pw:"p1"},\n\t\t\t{nickname:"name2",pw:"p2"}];\n\t} \n</script>'
    }, {
        title: 'b-bind',
        intro: '绑定BQL元素',
        test: true,
        func: '接下来的章节会介绍BQL UI元素的所有属性。\nb-bind是一个可选的属性(但与b-loop而这之前必选其一)，以将<span class=\'red\'>单值数据</span>(JSON,String,Number,Boolean等)和html元素进行绑定，生成一个全局的BQL元素，变量名就是b-bind属性值。',
        howUse: 'b-bind="name"。',
        code: '<div b-bind="string" b-init="\'test\'">\n\t<!--b-init 的值是String 或者 Number-->\n\t<div>单值类型：<input type="text" value="{{string}}" /></div>\n\t<div>带js语法：<input type="text" value="{{(string==\'test\')?1:0}}" /></div>\n</div><br/> \nJSON单值类型：\n<div b-bind="user" b-init="{nickname:\'theajack\',pw:\'1111\'}">\n\t<!--b-init 的值是Object-->\n\t<div>昵称：{{user.nickname}}</div>\n\t<div>密码：{{user.pw}}</div>\n</div>\n<script>\n</script>'
    }, {
        title: 'b-loop',
        intro: '绑定BQL元素',
        test: true,
        func: 'b-loop是一个可选的属性(但与b-bind而这之前必选其一)，以将<span class=\'red\'>JSON数组</span>(JSON,String,Number,Boolean等)和html元素进行绑定，生成一个全局的BQL元素，变量名就是b-loop属性值。',
        howUse: 'b-loop="name"。',
        code: 'JSON数组类型：\n<div b-loop="users" b-init=\'[{nickname:"name1",pw:"p1"},{nickname:"name2",pw:"p2"}]\'>\n\t<!--b-init 的值也可以是全局变量或方法-->\n\t<div>索引：{{$index}}</div><!--$index 指代元素的位置；$index=$i-->\n\t<div>昵称：{{each.nickname}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div> \n<script>\n</script>'

    }, {
        title: 'b-init',
        intro: '绑定BQL元素',
        test: true,
        func: '可选属性，初始化BQL元素的数据。未经初始化数据的BQL元素不可以使用，或者使用代码初始化数据，下一节会介绍到。值可以是JSON数组、JSON、String、Number等。值的格式遵循js语法，也支持全部变量或方法。',
        howUse: 'b-init=value。',
        code: '直接赋值：\n<div b-bind="user" b-init="{nickname:\'theajack\',pw:\'1111\'}">\n\t<div>昵称：{{user.nickname}}</div>\n\t<div>密码：{{user.pw}}</div>\n</div> <br/>\n全局变量或方法：\n<div b-loop="users" b-init="getArray()">\n\t<div>昵称：{{each.nickname}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div> \n<script>\n\tfunction getArray(){\n\t\treturn [{nickname:"name1",pw:"p1"},\n\t\t\t{nickname:"name2",pw:"p2"}];\n\t} \n</script>'
    }, {
        title: 'b-bind|b-loop;b-init',
        intro: '组合写法',
        test: true,
        func: 'b-bind或者b-loop可以与b-init组合起来写在一个属性里面。详情使用见实例。',
        howUse: 'b-bind=\'name;data\' 或 b-loop=\'name;data\'',
        code: 'b-bind与b-init组合写法：\n<div b-bind="user;{nickname:\'theajack\',pw:\'1111\'}">\n\t<div>昵称：{{user.nickname}}</div>\n\t<div>密码：{{user.pw}}</div>\n</div> <br/>\nb-loop与b-init组合写法：\n<div b-loop="users;getArray()">\n\t<div>昵称：{{each.nickname}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div> \n<script>\n\tfunction getArray(){\n\t\treturn [{nickname:"name1",pw:"p1"},\n\t\t\t{nickname:"name2",pw:"p2"}];\n\t} \n</script>'
    }, {
        title: '.init()',
        intro: '绑定BQL元素',
        test: true,
        func: '使用代码初始化数据。未经初始化的BQL元素不可使用。',
        howUse: '对象:BQL;参数:data;返回值:与参数相同;(data可以是JSON Array|JSON|String|Number|Boolean)',
        code: '<div b-bind="user">\n\t<div>昵称：{{user.nickname}}</div>\n\t<div>密码：{{user.pw}}</div>\n</div>\n<input type="button" onclick="init()" value="初始化user"/>\n<script>\n\tfunction init(){\n\t\tuser.init({nickname:"name1",pw:"p1"});\n\t}\n</script>'
    }, {
        title: 'BQL.init()',
        intro: '绑定BQL元素',
        test: true,
        func: 'BQL.init() 方法可将BQL UI元素生成BQL 元素。页面加载是会对全部BQL UI元素自动init，若是动态添加的需要手动init',
        howUse: '参数:[HTMLElement,data];返回值:[BQL];',
        code: '<div id="parent">\n</div>\n<input type="button" onclick="add()" value="添加一个BQL UI元素"/>\n<input type="button" onclick="init()" value="初始化user"/>\n<input type="button" onclick="initSplit()" value="分步初始化user"/>\n<input type="button" onclick="initAll()" value="初始化全部"/>\n<input type="button" onclick="J.id(\'parent\').empty()" value="重置"/>\n<script>\n\tfunction add(){\n\t\tif(J.id("user")==undefined){\n\t\t\tvar wrapper=J.new("div#user[b-bind=user]").append([\n\t\t\t\tJ.new("div").txt("昵称：{{user.nickname}}"),\n\t\t\t\tJ.new("div").txt("密码：{{user.pw}}")\n\t\t\t]);\n\t\t\tJ.id("parent").append(wrapper);\n\t\t}else{\n\t\t\tJ.show("已经添加过了,请先重置","warn");\n\t\t}\n\t}\n\tfunction init(){\n\t\tBQL.init(J.id("user"),{nickname:"name1",pw:"p1"});\n\t} \n\tfunction initSplit(){\n\t\tBQL.init(J.id("user"));//生成BQL元素\n\t\tuser.init({nickname:"name1",pw:"p1"});//对BQL元素初始化数据\n\t} \n\tfunction initAll(){\n\t\tBQL.init();//将页面所有BQL UI元素生成BQL元素，这会重新生成已有的BQL元素\n\t\tuser.init({nickname:"name1",pw:"p1"});//对BQL元素初始化数据\n\t} \n</script>'
    }, {
        title: 'b-each',
        intro: '循环变量命名',
        test: true,
        func: '可选属性，但是只能与b-loop同时使用。功能是为循环变量命名，缺省值是each。',
        howUse: 'b-each="name"',
        code: '缺省值：\n<div b-loop="users" b-init="getArray()">\n\t<!--b-init 的值也可以是全局变量或方法-->\n\t<div>昵称：{{each.nickname}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div> <br/>\n设置为user：\n<div b-loop="users" b-each="user" b-init="getArray()">\n\t<!--b-init 的值也可以是全局变量或方法-->\n\t<div>昵称：{{user.nickname}}</div>\n\t<div>密码：{{user.pw}}</div>\n</div> \n<script>\n\tfunction getArray(){\n\t\treturn [{nickname:"name1",pw:"p1"},{nickname:"name2",pw:"p2"}];\n\t}\n</script>'
    }, {
        title: 'b-update ',
        intro: '是否更新BQL数据',
        test: true,
        func: '可选属性，缺省值是false。是否在绑定了数据的input或textarea元素<span class=\'red\'>oninput</span>时更新BQL数据。(要求:input 的value 或者textarea的html内容必须是纯粹的值，不可包含js语句，例如value=\'{{each.nickname}}\' &lt;textarea>{{each.nickname}}&lt;/textarea>或value=\'{{name}}\' &lt;textarea>{{name}}&lt;/textarea>))',
        howUse: 'b-update="Boolean"',
        code: '<div b-bind="user" b-update=true b-init="{nickname:\'name\',pw:\'p\'}">\n\t<div>昵称：<input type="text" value="{{user.nickname}}"/></div>\n\t<div>密码：<textarea>{{user.pw}}</textarea></div>\n</div> \n<input type="button" value="查看数据" onclick="showData()"/>\n<div id="show"></div> \n<script>\n\tfunction showData(){\n\t\tvar data=user.get();\n\t\tJ.id("show").txt(J.toString(data));\n\t}\n</script>'
    }, {
        title: 'b-refresh ',
        intro: '循环变量命名',
        test: true,
        func: '可选属性，缺省值是false。是否在绑定了数据的input或textarea元素<span class=\'red\'>onchange</span>是重新生成BQL元素，以致刷新该BQL UI元素里面其他绑定了该值的html元素。',
        howUse: 'b-refresh="Boolean"',
        code: '<div b-bind="user" b-refresh=true b-update=true b-init="{nickname:\'name\',pw:\'p\'}">\n\t<div>昵称：<input type="text" value="{{user.nickname}}"/></div>\n\t<div>昵称：{{user.nickname}}</div>\n</div> \n输入完成以后点击其他地方以将焦点移开\n<script>\n</script>'
    }, {
        title: 'b-callback ',
        intro: '刷新回调函数',
        test: true,
        func: '可选属性；BQL UI元素刷新时的回调函数，可以是一段代码或是一个函数。回调参数:<br/>1.this(或obj)指代的是当前的html元素；<br/>2.data是BQL数据。',
        howUse: 'b-each="name"',
        code: '值为js代码：<div b-bind="user1" b-callback="J.show(this.html())" b-refresh=true b-update=true b-init="{nickname:\'name1\',pw:\'p1\'}">\n\t<div>昵称：<input type="text" value="{{user1.nickname}}"/></div>\n\t<div>昵称：{{user1.nickname}}</div>\n</div> </br>\n值为函数：<div b-bind="user2" b-callback="refreshCall(this,data)" b-refresh=true b-update=true b-init="{nickname:\'name2\',pw:\'p2\'}">\n\t<div>昵称：<input type="text" value="{{user2.nickname}}"/></div>\n\t<div>昵称：{{user2.nickname}}</div>\n</div>\n输入完成以后点击其他地方以将焦点移开\n<script>\nfunction refreshCall(obj,data){ \n\tvar text=obj.html()+J.toString(data);\n\tJ.show(text);\n}\n</script>'
    }, {
        title: '{{...}} ',
        intro: 'js表达式',
        test: true,
        func: '双重大括号的写法使用js表达式，将表达式的值绑定到语句所在位置。也可以是三元表达式。前面的章节已经有很多实例了',
        howUse: '{{js表达式}}',
        code: 'b-bind：\n<div b-bind="user" b-init="{nickname:\'theajack\',pw:\'1111\'}">\n\t<!--b-init 的值是Object-->\n\t<div>昵称：{{user.nickname}}</div>\n\t<div>密码：{{user.pw}}</div>\n</div> <br/>\nb-loop：\n<div b-loop="users" b-init="getArray()">\n\t<!--b-init 的值也可以是全局变量或方法-->\n\t<div>昵称：{{each.nickname}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div> \n<script>\n\tfunction getArray(){\n\t\treturn [{nickname:"name1",pw:"p1"},\n\t\t\t{nickname:"name2",pw:"p2"}];\n\t} \n</script>'
    }, {
        title: '${...}$ ',
        intro: '含return的js语句',
        test: true,
        func: '双重大括号的写法仅限于使用js表达式，如果有更复杂的逻辑就无能为力了。使用${}$的语法可以将js代码嵌入到html页面，然后将该代码的返回值绑定到该语句所在的位置。',
        howUse: '${含return语句的js代码}$',
        code: '<div b-bind="user" b-init="{nickname:\'theajack\',pw:\'1111\'}">\n\t<div>是否是theajack：${\n\t\t\t\tif(user.nickname=="theajack"){\n\t\t\t\t\treturn "是";\n\t\t\t\t}else{\n\t\t\t\t\treturn "不是";\n\t\t\t\t}\n\t\t\t}$</div>\n\t<div>密码：${return user.pw;}$</div>\n</div>\n<script>\n</script>'
    }, {
        title: '$(data){...}$ ',
        intro: '循环语句',
        test: true,
        func: '需要对绑定数据的属性在做循环就是用这个方法，循环的值是$each而不是each。比如一本书，对章做了循环，章里的节还要做循环。当然这个语法也可以使用${}$语法来模拟实现。里面的代码用d{}d里写js表达式，用f{}f里写含return的js语句。详情见例子',
        howUse: '$(data){html与js代码}$',
        code: 'JSON数组类型：\n<div b-loop="users" b-init=\'[{nickname:"name1",brothers:["b1","b2"]},{nickname:"name2",brothers:["b11","b22"]}]\'>\n\t<div>昵称：{{each.nickname}}</div>\n\t<div>\n\t\t\t$(each.brothers){\n\t\t\t\t<div>索引：d{$eachIndex}d</div>\n\t\t\t\t<div>名字：d{$each}d</div>\n\t\t\t\t<div>是不是叫b1：f{\n\t\t\t\t\tif($each=="b1"){\n\t\t\t\t\t\treturn "是";\n\t\t\t\t\t}else{\n\t\t\t\t\t\treturn "不是";\n\t\t\t\t\t}\n\t\t\t\t}f</div>\n\t\t\t}$\n\t</div><br/><!--d{}d里写js表达式，f{}f里写含return的js语句-->\n</div> \n<script>\n</script>'
    }, {
        title: 'd{...}d ',
        intro: '$(){}里的js表达式',
        test: true,
        func: '在$(data){}的循环结构里的js表达式需要用d{}d这个语法，双重大括号不行。上一节已经有实例了',
        howUse: 'd{js表达式}d',
        code: '<div b-loop="users" b-init=\'[{nickname:"name1",brothers:["b1","b2"]},{nickname:"name2",brothers:["b11","b22"]}]\'>\n\t<div>\n\t\t\t$(each.brothers){\n\t\t\t\t<div>索引：d{$eachIndex}d</div>\n\t\t\t\t<div>名字：d{$each}d</div>\n\t\t\t}$\n\t</div><br/><!--d{}d里写js表达式，f{}f里写含return的js语句-->\n</div> \n<script>\n</script>'
    }, {
        title: 'f{...}f ',
        intro: '$(){}里的含return的js语句',
        test: true,
        func: '在$(data){}的循环结构里的含return的js语句(也就是函数)需要用f{}f这个语法，${}$不行。上上一节已经有实例了',
        howUse: 'f{含return的js语句}f',
        code: '<div b-loop="users" b-init=\'[{nickname:"name1",brothers:["b1","b2"]},{nickname:"name2",brothers:["b11","b22"]}]\'>\n\t<div>\n\t\t\t$(each.brothers){\n\t\t\t\t<div>第d{$ei}d个兄弟d是不是叫b1：\n\t\t\t\tf{\n\t\t\t\t\tif($each=="b1"){\n\t\t\t\t\t\treturn "是";\n\t\t\t\t\t}else{\n\t\t\t\t\t\treturn "不是";\n\t\t\t\t\t}\n\t\t\t\t}f</div>\n\t\t\t}$\n\t</div><br/><!--d{}d里写js表达式，f{}f里写含return的js语句-->\n</div> \n<script>\n</script>'
    } ],
    BQL: [ {
        title: '.run()',
        intro: '执行整个查询语句',
        test: true,
        func: '执行整个查询语句。这个方法意味着查询语句终结，返回查询结果。也可以在最后一个方法后面加上一个 true 来执行。例：user.select(\'*\').run()和。user.select(\'*\',true)。<span class=\'red\'>注：该方法只有b-loop类型的BQL对象才有。</span>',
        howUse: '参数:null;返回值:data',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div>\n<input type="button" value="测试" onclick="testRun()" />\n<div id="show"></div>\n<script>\nvar data=[{name:"name1",pw:"p1"},\n\t\t{name:"name2",pw:"p2"}];\nfunction testRun(){\n\tvar result=users.select("*").run();\n\t//与 user.select("*",true) 等价\n\tJ.id("show").txt(J.toString(result));\n}\n</script>'
    }, {
        title: '.select()',
        intro: '查询语句',
        test: true,
        func: '查询数据中每个元素的指定属性，并组成一个新的数据（数据可以是数组，对象或其他单值类型）。<span class=\'red\'>若只希望对满足某特点要求的数据生效，需要与where方法共同使用，后面章节会介绍到。</span>',
        howUse: '参数:String(属性),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n\t<div>年龄：{{each.age}}</div>\n</div>\n<input type="button" value="选取全部" onclick="testAll()" />\n<input type="button" value="选取单个属性" onclick="testSingle()" />\n<input type="button" value="选取多个属性" onclick="testMany()" />\n<div id="show"></div>\n<script>\nvar data=[{name:"name1",pw:"p1",age:21},\n\t\t{name:"name2",pw:"p2",age:22}];\nfunction testAll(){\n\tvar result=users.select("*",true);\n\tJ.id("show").txt(J.toString(result));\n}\nfunction testSingle(){\n\tvar result=users.select("name",true);\n\tJ.id("show").txt(J.toString(result));\n}\nfunction testMany(){\n\tvar result=users.select("name,age",true);\n\tJ.id("show").txt(J.toString(result));\n}\n</script>'
    }, {
        title: '.select(name)',
        intro: '对列名起别名',
        test: true,
        func: '对查询结果起别名。查询结果的属性名会被别名代替。',
        howUse: '参数:String(属性 别名),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}；年龄：{{each.age}}；性别：{{each.sex}}</div>\n</div>\n<input type="button" value="单个别名" onclick="singleTest()" />\n<input type="button" value="多个别名" onclick="manyTest()" />\n<div id="show"></div>\n<script>\n\tvar data=[{name:"n1",age:10,sex:"男"},\n\t\t\t{name:"n2",age:12,sex:"男"},\n\t\t\t{name:"n3",age:20,sex:"女"},\n\t\t\t{name:"n4",age:22,sex:"女"}];\n\tfunction singleTest(){\n\t\tvar result=users.select("name 昵称,age",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n\tfunction manyTest(){\n\t\tvar result=users.select("name 昵称,age 年龄",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n</script>'
    }, {
        title: '.select(distinct)',
        intro: '对查询结果去重',
        test: true,
        func: '对查询结果去重。若是有多个属性，则多个属性都相同的才会被去掉。',
        howUse: '参数:String(属性),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div>\n<input type="button" value="distinct 去重单个属性" onclick="testDist()" />\n<input type="button" value="distinct 去多多个属性" onclick="testDistMany()" />\n<div id="show"></div>\n<script>\nvar data=[{name:"name1",pw:"p"},\n\t\t{name:"name2",pw:"p"},\n\t\t{name:"name3",pw:"p3"},\n\t\t{name:"name3",pw:"p3"},];\nfunction testDist(){\n\tvar result=users.select("distinct pw",true);\n\tJ.id("show").txt(J.toString(result));\n}\nfunction testDistMany(){\n\tvar result=users.select("distinct pw,name",true);\n\tJ.id("show").txt(J.toString(result));\n}\n</script>'
    }, {
        title: '.select()|func',
        intro: '使用聚合函数',
        test: true,
        func: '对数据使用聚合函数。聚合函数包含count,count(distinct ),sum,avg,min,max,first,last。没有与groupBy共同使用时select仅能包含一个带有聚合函数的属性，不能包含其他属性。',
        howUse: '参数:String(func(属性)),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}；年龄：{{each.age}}；性别：{{each.sex}}</div>\n</div>\n<input type="button" value="计行数" onclick="countTest()" />\n<input type="button" value="计总和" onclick="sumTest()" />\n<div id="show"></div>\n<script>\n\tvar data=[{name:"n1",age:10,sex:"男"},\n\t\t\t{name:"n2",age:12,sex:"男"},\n\t\t\t{name:"n3",age:20,sex:"女"},\n\t\t\t{name:"n4",age:22,sex:"女"}];\n\tfunction countTest(){\n\t\tvar result=users.select("count(*)",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n\tfunction sumTest(){\n\t\tvar result=users.select("sum(age) 总和",true);//也可以设置别名\n\t\tJ.id("show").txt(J.toString(result));\n\t\t//更多聚合函数请读者自己尝试\n\t}\n</script>'
    }, {
        title: '.update()',
        intro: '更新属性的值',
        test: true,
        func: '以字符串的方式更新（修改）数据中的属性的值。缺点是值类型会被转换成字符串。若原数据不是字符串类型，则会破坏原数据类型。',
        howUse: '参数:String(属性),String(值),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n\t<div>年龄：{{each.age}}</div>\n</div>\n<input type="button" value="update 单个属性" onclick="updateSingle()" />\n<input type="button" value="update 多个属性" onclick="updateMany()" />\n<script>\nvar data=[{name:"name1",pw:"p1",age:21},\n\t\t{name:"name2",pw:"p2",age:22},\n\t\t{name:"name3",pw:"p3",age:23}];\nfunction updateSingle(){\n\tusers.update("pw","same pw",true);\n}\nfunction updateMany(){\n\tusers.update("name,age","same name,same age",true);\n}\n</script>'
    }, {
        title: '.update(JSON)',
        intro: '更新属性的值',
        test: true,
        func: '以JSON格式更新（修改）数据中的属性的值。解决了上一节只能是字符串的缺点。只可以是任意类型且不会破坏原数据类型。',
        howUse: '参数:JSON,[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n\t<div>年龄：{{each.age}}</div>\n</div>\n<input type="button" value="JSON update" onclick="updateWithJson()" />\n<script>\nvar data=[{name:"name1",pw:"p1",age:21},\n\t\t{name:"name2",pw:"p2",age:22},\n\t\t{name:"name3",pw:"p3",age:23}];\nfunction updateWithJson(){\n\tusers.update({\n\t\tname:"same name",\n\t\tage:20//不会破坏原数据类型\n\t},true);\n}\n</script>'
    }, {
        title: '.add()',
        intro: '添加属性',
        test: true,
        func: '以字符串形式添加属性。不能添加已有的属性否则会报错',
        howUse: '参数:String(属性),String(值),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n\t<div>年龄：{{each.age}}</div>\n\t<div>性别：{{each.sex}}</div>\n</div>\n<input type="button" value="添加单个属性" onclick="addSingle()" />\n<input type="button" value="添加多个属性" onclick="addMany()" />\n<script>\nvar data=[{name:"name1"},\n\t\t{name:"name2"}];\nfunction addSingle(){\n\tusers.add("pw","same pw",true);\n}\nfunction addMany(){\n\tusers.add("age,sex","20,男",true);\n}\n</script>'
    }, {
        title: '.add(JSON)',
        intro: 'Add Validation',
        test: true,
        func: '以JSON格式添加属性。不能添加已有的属性否则会报错',
        howUse: '参数:JSON,[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n\t<div>年龄：{{each.age}}</div>\n\t<div>性别：{{each.sex}}</div>\n</div>\n<input type="button" value="JSON 格式添加属性" onclick="addWithJson()" />\n<script>\nvar data=[{name:"name1"},\n\t\t{name:"name2"}];\nfunction addWithJson(){\n\tusers.add({\n\t\tpw:"same pw",\n\t\tage:20,\n\t\tsex:"女"\n\t},true);\n}\n</script>'
    }, {
        title: '.remove()',
        intro: '移除属性',
        test: true,
        func: '移除元素的属性。',
        howUse: '参数:String(属性),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n\t<div>年龄：{{each.age}}</div>\n\t<div>性别：{{each.sex}}</div>\n</div>\n<input type="button" value="移除单个属性" onclick="removeSingleAttr()" />\n<input type="button" value="移除多个属性" onclick="removeManyAttr()" />\n<script>\n\tvar data=[{name:"name1",pw:"p1",age:21,sex:"男"},\n\t\t\t{name:"name2",pw:"p2",age:22,sex:"女"}];\n\tfunction removeSingleAttr(){\n\t\tusers.remove("pw",true);\n\t}\n\tfunction removeManyAttr(){\n\t\tusers.remove("age,sex",true);\n\t}\n</script>'
    }, {
        title: '.insert()',
        intro: '插入元素',
        test: true,
        func: '以字符串形式插入元素。该方法只对b-loop类型的BQL对象有效',
        howUse: '参数:String(属性),String(值),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div>\n<input type="button" value="插入单个元素" onclick="insertSingle()" />\n<input type="button" value="插入多个元素" onclick="insertMany()" />\n<input type="button" value="有共同属性时插入多个元素" onclick="insertManyComm()" />\n<script>\n\tvar data=[{name:"name1",pw:"p1"},\n\t\t\t{name:"name2",pw:"p2"}];\n\tfunction insertSingle(){\n\t\tusers.insert("name,pw","new name,new pw",true);\n\t}\n\tfunction insertMany(){\n\t\tusers.insert("name,pw","new name1;new name2,new pw1;new pw2",true);\n\t}\n\tfunction insertManyComm(){\n\t\tusers.insert("name,pw","name common,new pw1;new pw2",true);\n\t}\n</script>'
    }, {
        title: '.insert(JSON)',
        intro: '插入元素',
        test: true,
        func: '插入JSON或JSON数组。该方法只对b-loop类型的BQL对象有效',
        howUse: '参数:JSON|JSON Array,[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div>\n<input type="button" value="插入单个元素" onclick="insertSingle()" />\n<input type="button" value="插入多个元素" onclick="insertMany()" />\n<script>\n\tvar data=[{name:"name1",pw:"p1"},\n\t\t\t{name:"name2",pw:"p2"}];\n\tfunction insertSingle(){\n\t\tusers.insert({\n\t\t\tname:"new name",\n\t\t\tpw:"new pw"\n\t\t},true);\n\t}\n\tfunction insertMany(){\n\t\tusers.insert([{\n\t\t\tname:"new name1",\n\t\t\tpw:"new pw1"\n\t\t},{\n\t\t\tname:"new name2",\n\t\t\tpw:"new pw2"\n\t\t}],true);\n\t}\n</script>'
    }, {
        title: '.insert(index)',
        intro: '指定位置插入',
        test: true,
        func: '在指定位置处插入元素。该方法只对b-loop类型的BQL对象有效',
        howUse: '参数:(JSON|JSON Array)|(String,String),[int],[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div>\n<input type="button" value="以字符串形式在第二个位置插入" onclick="insertStr()" />\n<input type="button" value="以JSON形式在第二个位置插入" onclick="insertJson()" />\n<script>\n\tvar data=[{name:"name1",pw:"p1"},\n\t\t\t{name:"name2",pw:"p2"}];\n\tfunction insertStr(){\n\t\tusers.insert("name,pw","new,new1;new2",1,true);//索引是从0开始\n\t}\n\tfunction insertJson(){\n\t\tusers.insert({\n\t\t\tname:"new name1",\n\t\t\tpw:"new pw1"\n\t\t},1,true);\n\t}\n</script>'
    }, {
        title: '.delete()',
        intro: '删除元素',
        test: true,
        func: '删除元素。如要删除满足特定要求元素，请与where方法同时使用。该方法只对b-loop类型的BQL对象有效',
        howUse: '参数:[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div>\n<input type="button" value="删除" onclick="deleteTest()" />\n<script>\n\tvar data=[{name:"name1",pw:"p1"},\n\t\t\t{name:"name2",pw:"p2"}];\n\tfunction deleteTest(){\n\t\tusers.delete(true);\n\t\t//若需要删除某个特点元素，请与where语句同时使用\n\t}\n</script>'
    }, {
        title: '.delete(index)',
        intro: '指定位置删除',
        test: true,
        func: '指定位置删除。如要删除满足特定要求元素，请与where方法同时使用。该方法只对b-loop类型的BQL对象有效',
        howUse: '参数:[int],[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div>\n<input type="button" value="删除第一个元素" onclick="deleteTest()" />\n<script>\n\tvar data=[{name:"name1",pw:"p1"},\n\t\t\t{name:"name2",pw:"p2"}];\n\tfunction deleteTest(){\n\t\tusers.delete(0,true);//删除第一个元素\n\t}\n</script>'
    }, {
        title: '.where()',
        intro: '条件判断',
        test: true,
        func: '以String形式对其他语句(含select、update、add、remove、delete、groupBy、orderBy)做一个条件删选，不满足条件的元素不会执行其他语句。对于多个条件，他们之间只满足and关系。若要使要其他，请参考.where(exp)。该方法只对b-loop类型的BQL对象有效',
        howUse: '参数:String(属性),String(值),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div>\n<input type="button" value="单个条件" onclick="whereTest()" />\n<input type="button" value="多个条件" onclick="whereManyTest()" />\n<div id="show"></div>\n<script>\n\tvar data=[{name:"same name",pw:"p1"},\n\t\t\t{name:"same name",pw:"p2"},\n\t\t\t{name:"name3",pw:"p3"}];\n\tfunction whereTest(){\n\t\tvar result=users.select("*").where("name","same name",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n\tfunction whereManyTest(){\n\t\tvar result=users.select("*").where("name,pw","same name,p1",true);//多个条件之间是and的关系\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n</script>'
    }, {
        title: '.where(JSON)',
        intro: '条件判断',
        test: true,
        func: '以JSON对其他语句做一个条件删选。效果与上一节类似。对于多个条件，他们之间只满足and关系。若要使要其他，请参考.where(exp)。',
        howUse: '参数:JSON,[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div>\n<input type="button" value="JSON格式条件" onclick="whereTest()" />\n<div id="show"></div>\n<script>\n\tvar data=[{name:"same name",pw:"p1"},\n\t\t\t{name:"same name",pw:"p2"},\n\t\t\t{name:"name3",pw:"p3"}];\n\tfunction whereTest(){\n\t\tvar result=users.select("*").where({\n\t\t\tname:"same name",\n\t\t\tpw:"p1"\n\t\t},true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n</script>'
    }, {
        title: '.where(exp)',
        intro: '条件判断',
        test: true,
        func: '以js布尔表达式形式对其他语句做一个条件删选。效果与上一节类似。对于多个条件，您可以自定义他们之间的与或非关系，遵循js语法。',
        howUse: '参数:String(布尔表达式),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>密码：{{each.pw}}</div>\n</div>\n<input type="button" value="普通布尔表达式" onclick="whereTest()" />\n<input type="button" value="带有index" onclick="whereIndexTest()" />\n<input type="button" value="index与其他条件" onclick="whereIndexAndOtherTest()" />\n<div id="show"></div>\n<script>\n\tvar data=[{name:"same name",pw:"p1",age:11,marry:true},\n\t\t\t{name:"same name",pw:"p2",age:12,marry:false},\n\t\t\t{name:"name3",pw:"p3",age:13,marry:false}];\n\tfunction whereTest(){\n\t\t//尝试按照js语法编写你自己的布尔表达式\n\t\t//如 "age>=12" "marry" "!marry"等，或将他们使用 && ||组合使用\n\t\tvar result=users.select("name,age").where("name==\'same name\'",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n\tfunction whereIndexTest(){\n\t\tvar result=users.select("name,age").where("$index==0",true);\n\t\t//选择第一条数据\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n\tfunction whereIndexAndOtherTest(){\n\t\tvar result=users.select("name,age").where("$i>0&&name==\'same name\'",true);\n\t\t//第一条数据被过滤 ,注：$i 与 $index 等价\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n</script>'
    }, {
        title: '.groupBy()',
        intro: '对数据分组',
        test: true,
        func: '对数据进行分组，参数只能是单个属性，可以单独使用，返回一个二维数组。但通常与聚合函数一起使用，详情请参考下一节。可以与where语句同时使用。',
        howUse: '参数:String(单个属性),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}</div>\n\t<div>年龄：{{each.age}}</div>\n</div>\n<input type="button" value="只是用groupBy" onclick="groupByTest()" />\n<input type="button" value="与where同时使用" onclick="groupByWhereTest()" />\n<div id="show"></div>\n<script>\n\tvar data=[{name:"n1",age:10},\n\t\t\t{name:"n2",age:10},\n\t\t\t{name:"n3",age:20},\n\t\t\t{name:"n4",age:20}];\n\tfunction groupByTest(){\n\t\tvar result=users.groupBy("age",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n\tfunction groupByWhereTest(){\n\t\tvar result=users.groupBy("age").where("name!=\'n2\'",true);\n\t\t//groupBy 和 where 先后顺序可以调换\n\t\t//也可以与select语句同时使用\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n</script>'
    }, {
        title: '.groupBy()|func',
        intro: '使用聚合函数',
        test: true,
        func: '对数据进行分组并对分组使用聚合函数。聚合函数包含count,count(distinct ),sum,avg,min,max,first,last。',
        howUse: '参数:String(属性),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}；年龄：{{each.age}}；性别：{{each.sex}}</div>\n</div>\n<input type="button" value="单独使用聚合函数" onclick="funcTest()" />\n<input type="button" value="与groupBy同时使用" onclick="groupByFuncTest()" />\n<div id="show"></div>\n<script>\n\tvar data=[{name:"n1",age:10,sex:"男"},\n\t\t\t{name:"n2",age:12,sex:"男"},\n\t\t\t{name:"n3",age:20,sex:"女"},\n\t\t\t{name:"n4",age:22,sex:"女"}];\n\tfunction funcTest(){\n\t\tvar result=users.select("count(age)",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n\tfunction groupByFuncTest(){\n\t\tvar result=users.select("count(age),sex").groupBy("sex",true);\n\t\t//由于篇幅有限，请读者自行使用一下 count,sum,avg,min,max,first,last,count(distinct) 函数\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n</script>'
    }, {
        title: '.orderBy()',
        intro: '对数据排序',
        test: true,
        func: '根据某属性对BQL数据进行排序，返回排序结果，默认是升序。排序不会影响原数据。',
        howUse: '参数:String(单个属性),[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}；年龄：{{each.age}}；性别：{{each.sex}}</div>\n</div>\n<input type="button" value="按年龄以默认顺序排序" onclick="orderByTest()" />\n<input type="button" value="与select一起使用" onclick="orderByWithSelect()" />\n<input type="button" value="与groupBy一起使用" onclick="orderByWithGroup()" />\n<div id="show"></div>\n<script>\n\tvar data=[{name:"n1",age:14,sex:"男"},\n\t\t\t{name:"n2",age:12,sex:"男"},\n\t\t\t{name:"n3",age:20,sex:"女"},\n\t\t\t{name:"n4",age:16,sex:"女"}];\n\tfunction orderByTest(){\n\t\tvar result=users.orderBy("age",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n\tfunction orderByWithSelect(){\n\t\tvar result=users.select("name").orderBy("age",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n\tfunction orderByWithGroup(){\n\t\tvar result=users.select("name").groupBy("sex").orderBy("age",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n</script>'
    }, {
        title: '.orderBy(order)',
        intro: '对数据排序',
        test: true,
        func: '根据某属性对BQL数据进行排序，返回排序结果。您可以选择升序或是排序。次序类型不区分大小写。',
        howUse: '参数:String(单个属性),[String(desc|asc)],[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}；年龄：{{each.age}}</div>\n</div>\n<input type="button" value="按年龄以降序排序" onclick="orderByTest()" />\n<div id="show"></div>\n<script>\n\tvar data=[{name:"n1",age:14},\n\t\t\t{name:"n2",age:12},\n\t\t\t{name:"n3",age:20},\n\t\t\t{name:"n4",age:16}];\n\tfunction orderByTest(){\n\t\tvar result=users.orderBy("age","desc",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n</script>'
    }, {
        title: '.orderBy(type)',
        intro: '对数据排序',
        test: true,
        func: '根据某属性对BQL数据进行排序，返回排序结果。您可以选择属性值的类型。值类型区分大小写，有以下几种类型(data,length,headLetter,Number),其中Number是缺省值。',
        howUse: '参数:String(单个属性),[String(desc|asc)],[String],[Boolean(run)];返回值:data|BQL',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}；身高：{{each.height}}；生日：{{each.birth}}</div>\n</div>\n<input type="button" value="按生日升序" onclick="orderByDateTest()" />\n<input type="button" value="按字符串长度升序" onclick="orderByLengthTest()" />\n<input type="button" value="按首字母降序" onclick="orderByHeadTest()" />\n<input type="button" value="按身高降序" onclick="orderByNumberTest()" />\n<div id="show"></div>\n<script>\n\tvar data=[{name:"aaa",height:170,birth:"1994-03-01"},\n\t\t\t{name:"dd",height:180,birth:"1994-02-01"},\n\t\t\t{name:"ccccc",height:176,birth:"1994/08/01"},\n\t\t\t{name:"bbbbbb",height:177,birth:"1994/07/01"}]; \n\tfunction orderByDateTest(){\n\t\tvar result=users.orderBy("birth","date",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n\tfunction orderByLengthTest(){\n\t\tvar result=users.orderBy("name","length",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n\tfunction orderByHeadTest(){\n\t\tvar result=users.orderBy("name","desc","headLetter",true);\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n\tfunction orderByNumberTest(){\n\t\tvar result=users.orderBy("height","desc","number",true);\n\t\t//number 是缺省值，不需要添加这个属性也可以\n\t\tJ.id("show").txt(J.toString(result));\n\t}\n</script>'
    }, {
        title: '.set()',
        intro: '设置新数据',
        test: true,
        func: '设置新数据。设置的是克隆版本，被设置数据的改变不会影响BQL数据。被设置数据的类型必须与原数据一样，不然会引发异常。',
        howUse: '参数:data;返回值:data',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}；年龄：{{each.age}}</div>\n</div>\n<input type="button" value="设置新数据" onclick="setTest()" />\n<script>\n\tvar data=[{name:"n1",age:14},\n\t\t\t{name:"n2",age:12}];\n\tfunction setTest(){\n\t\tvar newdata=[{name:"new1",age:12},\n\t\t\t{name:"new2",age:12},\n\t\t\t{name:"new3",age:12}];\n\t\tusers.set(newdata);\n\t\t//以下是为了证明设置的是newdata的克隆版本，newdata数据改变不会影响BQL\n\t\tnewdata[0].name="change";\n\t\tusers.refresh();\n\t}\n</script>'
    }, {
        title: '.get()',
        intro: '获取克隆数据',
        test: true,
        func: '获取的是BQL数据的克隆版本，它的数据改变不会影响BQL。',
        howUse: '返回值:data',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}；年龄：{{each.age}}</div>\n</div>\n<input type="button" value="获取数据" onclick="getTest()" />\n<div id="show"></div>\n<script>\n\tvar data=[{name:"n1",age:14},\n\t\t\t{name:"n2",age:12}];\n\tfunction getTest(){\n\t\tvar data=users.get();\n\t\t//以下是为了证明获取的是BQL数据的克隆版本，它的数据改变不会影响BQL\n\t\tdata[0].name="change";\n\t\tusers.refresh();\n\t\tJ.id("show").txt(J.toString(data));\n\t}\n</script>'
    }, {
        title: '.data()',
        intro: '获取原数据',
        test: true,
        func: '获取的是BQL数据原版，它的数据改变会影响BQL',
        howUse: '返回值:data',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}；年龄：{{each.age}}</div>\n</div>\n<input type="button" value="使用BQL数据" onclick="dataTest()" />\n<div id="show"></div>\n<script>\n\tvar data=[{name:"n1",age:14},\n\t\t\t{name:"n2",age:12}];\n\tfunction dataTest(){\n\t\tvar data=users.data();\n\t\t//以下是为了证明获取的是BQL数据原版，它的数据改变会影响BQL\n\t\tdata[0].name="change";\n\t\tusers.refresh();\n\t\tJ.id("show").txt(J.toString(data));\n\t}\n</script>'
    }, {
        title: '.clear()',
        intro: '清空数据',
        test: true,
        func: '清空BQL对象的数据。b-loop类型数据被设置为[],b-bind设置为{}或null',
        howUse: '返回值:data',
        code: '<div b-loop="users" b-init="data">\n\t<div>昵称：{{each.name}}；年龄：{{each.age}}</div>\n</div>\n<input type="button" value="清空BQL数据" onclick="clearTest()" />\n<script>\n\tvar data=[{name:"n1",age:14},\n\t\t\t{name:"n2",age:12}];\n\tfunction clearTest(){\n\t\tusers.clear();\n\t}\n</script>'
    }, {
        title: '.init()',
        intro: '绑定BQL元素',
        test: true,
        func: '使用代码初始化数据。未经初始化的BQL元素不可使用。这一节与上一章的 .init() 内容一模一样。放在这里只是为了强调它是BQL的方法',
        howUse: '对象:BQL;参数:data;返回值:与参数相同;',
        code: '<div b-bind="user">\n\t<div>昵称：{{user.nickname}}</div>\n\t<div>密码：{{user.pw}}</div>\n</div>\n<input type="button" onclick="init()" value="初始化user"/>\n<script>\n\tfunction init(){\n\t\tuser.init({nickname:"name1",pw:"p1"});\n\t}\n</script>'
    } ],

    JQL: [ {
        title: 'Jql()',
        intro: '生成JQL对象',
        test: true,
        func: '生成一个JQL对象，对该对象进行类SQL操作以操作原数据。',
        howUse: '参数:JSON|JSON Array|String|Number|Boolean;返回值:JQL;',
        code: '<input type="button" value="使用Jql查询数据" onclick="testJql()" />\n<div id="show"></div>\n<script>\nvar data=[{name:"name1",pw:"p"},\n\t\t{name:"name2",pw:"p"},\n\t\t{name:"name3",pw:"p3"},\n\t\t{name:"name3",pw:"p3"},];\nfunction testJql(){\n\tvar d=Jql(data).select("name").where("$i>1",true);\n\tJ.id("show").txt(J.toString(d));\n\t//Jql() 等价于 new JQL()\n}\n</script>'
    }, {
        title: '其他',
        intro: '与BQL一样',
        test: true,
        func: 'JQL不涉及到UI元素，只在js部分提供类SQL方式单纯的操作JSON或JSON数组，详细使用方法与BQL一样，请参见BQL的类SQL方法。',
        howUse: '.select(arg).where(arg).run();...',
        code: '<input type="button" value="使用Jql操作数据" onclick="testJql()" />\n<div id="show"></div>\n<script>\nvar data=[{name:"name1",pw:"p"},\n\t\t{name:"name2",pw:"p"},\n\t\t{name:"name3",pw:"p3"},\n\t\t{name:"name3",pw:"p3"},];\nfunction testJql(){\n\tJql(data).remove("name").where("pw==\'p\'",true);\n\tJ.id("show").txt(J.toString(data));\n\t//更多方法请读者自己尝试\n}\n</script>'
    } ]
};