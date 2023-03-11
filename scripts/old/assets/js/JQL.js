(function () {
  function _checkString (arg) {
    if (arg.constructor == String) {
      return arg.split(',');
    }
    return arg;
  }
  // JQL
  const TYPE = {
    update: 'update',
    select: 'select',
    delete: 'delete',
    insert: 'insert',
    add: 'add',
    remove: 'remove',
    clear: 'clear',
    groupBy: 'groupBy',
    desc: 'desc',
    asc: 'asc',
    all: '*'
  };
  const FUN = {
    sum: 'sum',
    count: 'count',
    avg: 'avg',
    distinct: 'distinct',
    first: 'first',
    last: 'last',
    max: 'max',
    min: 'min'
  };
  function _jqlSetAttrAndValue (data, set) {
    const attra = [];
    const valuea = [];
    for (const attr in data) {
      attra.push(attr);
      valuea.push(data[attr]);
    }
    set.attr(attra);
    set.value(valuea);
  } function _jqlSelect (get, set, arg, run) {
    if (arg == undefined || arg.constructor == Boolean) {
      if (run === true || arg === true) {
        return _jqlCheckReturn(get.data(), get);
      }
      arg = TYPE.all;
    }
    if (get.canQuery()) {
      set.type(TYPE.select);
      set.attr(_checkString(arg));
      return _jqlCheckRun.call(this, run);
    }
    return this;
  };
  function _jqlUpdate (get, set, data, value, run) {
    return _addAndUpdateCom.call(this, get, set, data, value, run, TYPE.update);
  };
  function _jqlAdd (get, set, data, value, run) {
    return _addAndUpdateCom.call(this, get, set, data, value, run, TYPE.add);
  }
  function _addAndUpdateCom (get, set, data, value, run, type) {
    if (get.canQuery()) {
      set.type(type);
      if (data.constructor == Object) {
        _jqlSetAttrAndValue(data, set);
        run = value;
      } else {
        set.attr(_checkString(data));
        set.value(_checkString(value));
      }
      return _jqlCheckRun.call(this, value, run);
    }
    return this;
  }
  function _jqlRemove (get, set, arg, run) {
    set.type(TYPE.remove);
    if (arg != undefined && arg.constructor != Boolean) {
      set.attr(_checkString(arg));
      return _jqlCheckRun.call(this, run);
    } else {
      set.attr(TYPE.all);
      if (arg.constructor == Boolean) {
        return _jqlCheckRun.call(this, run);
      }
    }
    return this;
  }
  function _jqlDelete (get, set, index, run) {
    set.type(TYPE.delete);
    if (index != undefined && index.constructor == Number) {
      set.index(index);
      return _jqlCheckRun.call(this, run);
    }
    return _jqlCheckRun.call(this, index);
  }
  function _jqlInsert (get, set, a1, a2, a3, a4) {// (arg,value,i,run)
    set.type(TYPE.insert);
    if (a1.constructor == Object || a1.constructor == Array) {
      set.attr(a1);
      if (a2 != undefined) {
        if (a2.constructor == Number) {
          set.index(a2);
          return _jqlCheckRun.call(this, a3);
        } else {
          return _jqlCheckRun.call(this, a2);
        }
      }
    } else {
      set.attr(_checkString(a1));
      set.value(_checkString(a2));
      if (a3 != undefined) {
        if (a3.constructor == Number) {
          set.index(a3);
          return _jqlCheckRun.call(this, a4);
        } else {
          return _jqlCheckRun.call(this, a3);
        }
      }
    }
    return this;
  }
  function _jqlSetCondAttrAndValue (data, set) {
    const attra = [];
    const valuea = [];
    for (const attr in data) {
      attra.push(attr);
      valuea.push(data[attr]);
    }
    set.condAttr(attra);
    set.condValue(valuea);
  }
  
  function _jqlWhere (get, set, attr, value, run) {
    if (get.type() === '' && get.groupAttr === '') {
      _throw('where:使用where之前必须使用select、update、add、remove、insert、delete、groupBy方法之一');
    } else {
      if (attr.constructor == Object) {
        _jqlSetCondAttrAndValue(attr, set);
        run = value;
      } else {
        if (value != undefined && value.constructor == String) {
          set.condAttr(_checkString(attr));
          set.condValue(_checkString(value));
        } else {// 复杂模式 bool表达式
          set.condAttr(attr);
          run = value;
        }
      }
      set.cond(true);
      return _jqlCheckRun.call(this, value, run);
    }
  }
  function _jqlCheckWhere (index, get, realI) {
    if (get.cond()) {
      const data = get.data()[index];
      const attr = get.condAttr();
      if (get.condValue().length > 0) {
        for (var i = 0; i < attr.length; i++) {
          if (data[attr[i]] != get.condValue()[i]) {
            return false;
          }
        }
      } else {// bool表达式
        const attrs = _getObjectAttr(data);
        eval('var ' + attrs);
        let $index = index;
        const $i = index;
        if (realI != undefined) {
          $index = realI;
        }
        for (var i = 0; i < attrs.length; i++) {
          if (attr.has(attrs[i])) {
            const item = data[attrs[i]];
            if (item == undefined) {
              _throw('where:' + attrs[i] + '属性不存在');
            } else {
              eval(attrs[i] + '=' + J.toString(item));
            }
          }
        }
        return eval(attr);
      }
    }
    return true;
  }
  function _getObjectAttr (obj) {
    const arr = [];
    for (attr in obj) {
      arr.push(attr);
    }
    return arr;
  }
  
  function _jqlGroupBy (get, set, attr, run) {
    if (attr == undefined || attr.constructor != String) {
      _throw('groupBy属性参数必须非空且为字符串');
    } else {
      set.groupAttr(attr);
      return _jqlCheckRun.call(this, run);
    }
  };
  function _throw (str) {
    str = J.checkArg(str, '未知异常');
    throw new Error(str);
  }
  function _jqlOrderBy (get, set, attr, order, orderType, run) {
    if (attr == undefined || attr.constructor != String) {
      _throw('orderBy属性参数必须非空且为字符串');
    } else {
      set.orderAttr(attr);
      if (order != undefined) {
        if (order.constructor == String) {
          order = order.toLowerCase();
          if (order == 'desc' || order == 'asc') {
            set.order(order);
            if (orderType != undefined && orderType.constructor == String) {
              set.orderType(orderType);
            }
          } else {
            set.orderType(order);
          }
          return _jqlCheckRun.call(this, order, orderType, run);
        }
        return _jqlCheckRun.call(this, order);
      }
      return this;
    }
  };
  function _getRunGroupBySelect (obj, sel, as) {
    if (sel) {
      if (as[0] == TYPE.all || as[0] == '' || as.length == 0) {
        return obj;
      }
      const d = {};
      if (as != TYPE.all && as.length > 0) {
        as.each(function (a) {
          d[a] = obj[a];
        });
      }
      return d;
    }
    return obj;
  }
  function _checkSelectAttr (attr) {
    for (let i = 0; i < attr.length; i++) {
      if (attr[i].has('(')) {
        return false;
      }
    }
    return true;
  }
  function _jqlCheckReturn (res, get) {
    if (get.single()) {
      return J.clone(res[0]);
    }
    return J.clone(res);
  }
  function _checkRunOrderBy (get, res) {
    const attr = get.orderAttr();
    if (attr != '') {
      if (get.order() == 'desc') {
        res.sortByAttr(attr, get.orderType(), false);
      } else {
        res.sortByAttr(attr, get.orderType());
      }
    }
    return res;
  }
  
  function _checkRunGroupBy (get, data) {
    // avg count count(DISTINCT ) first last max min
    // 实现函数
    const attr = get.groupAttr();
    const as = get.attr();
    const gres = [];
    const vs = [];
    const norSel = _checkSelectAttr(as);
    if (attr != '') {
      data.each(function (item) {
        if (item.hasOwnProperty(attr)) {
          const index = vs.index(item[attr]);
          if (index == -1) {
            vs.push(item[attr]);
            gres.push([_getRunGroupBySelect(item, norSel, as)]);
          } else {
            gres[index].push(_getRunGroupBySelect(item, norSel, as));
          }
        } else {
          _throw('groupBy：元素中没有' + attr + '属性');
        }
      });
      if (!norSel) {// 含有聚集函数
        const funs = get.groupFuns();
        if (funs.length > 0) {
          const funRes = [];
          gres.each(function (items) {
            const newobj = {};
            const names = [];
            funs.each(function (fun) {
              if (fun.fun == undefined) {
                if (fun.attr != attr) {
                  _throw(fun.attr + ' 没有groupBy');
                } else {
                  newobj[attr] = items[0][attr];
                }
              } else {
                if (fun.name == TYPE.all) {
                  if (fun.fun != FUN.count) {
                    _throw('* 不能用于' + fun.fun + '方法');
                  }
                  fun.name = FUN.count;
                }
                if (!names.has(fun.name)) {
                  names.push(fun.name);
                } else {
                  _throw(fun.name + '列名不能相同');
                }
                if (fun.name == fun.attr) {
                  fun.name = fun.fun;
                }
                newobj[fun.name] = _checkGroupFunc(fun, items);
              }
            });
            
            funRes.push(newobj);
          });
          return funRes;
        }
      }
      return gres;
    } else {
      _throw('groupBy属性参数必须非空且为字符串');
    }
  }
  function _checkGroupFunc (fun, items) {
    switch (fun.fun) {
      case FUN.sum:{
        return _getGroupAttrArr(items, fun.attr).sum();
      };break;
      case FUN.count:{
        if (fun.attr.has(FUN.distinct + ' ')) {// count(distinct name)
          const attr = fun.attr.split(' ')[1];
          const arr = [];
          items.each(function (item) {
            if (!arr.has(item[attr])) {
              arr.push(item[attr]);
            }
          });
          return arr.length;
        } else {
          return items.length;
        }
      };break;
      case FUN.avg:{
        return _getGroupAttrArr(items, fun.attr).avg();
      };break;
      case FUN.first:{
        return items.first()[fun.attr];
      };break;
      case FUN.last:{
        return items.last()[fun.attr];
      };break;
      case FUN.max:{
        return _getGroupAttrArr(items, fun.attr).max();
      };break;
      case FUN.min:{
        return _getGroupAttrArr(items, fun.attr).min();
      };break;
      default:{
        return items[0][fun.attr];
      };break;
    }
  }
  function _getGroupAttrArr (arr, attr) {
    const res = [];
    arr.each(function (item) {
      res.push(item[attr]);
    });
    return res;
  }
  function _geneGroupFuns (attr) {
    if (attr.timeOf(' ') > 2) {
      _throw('参数错误：select 参数空格不能多于2个');
    } else {
      const res = {};
      if (attr.has('(') && attr.has(')')) {
        let arr = attr.split(')');
        if (arr[1] != '') {
          res.name = arr[1].substring(1);
        }
        attr = arr[0];
        arr = attr.split('(');
        res.attr = arr[1].toLowerCase();
        if (arr[1].has(' ')) {
          arr[1] = arr[1].split(' ')[1];
        }
        if (!res.hasOwnProperty('name')) {
          res.name = arr[1];
        }
        res.fun = arr[0].toLowerCase();
      } else {
        if (attr.has(' ')) {
          res.name = attr.split(' ')[1];
          res.attr = attr.split(' ')[0];
        } else {
          res.attr = res.name = attr;
        }
      }
      return res;
    }
  }
  function _selectCount (get, attr, data) {
    if (attr.length > 1) {
      _throw('使用count函数时select最多只能选择一列');
    }
    const obj = _geneGroupFuns(attr[0]);
    let sum = 0;
    let result;
    if (get.cond() === true) {
      result = [];
      for (let i = 0; i < data.length; i++) {
        if (_jqlCheckWhere(i, get)) {
          result.push(data[i]);
        }
      }
    } else {
      result = data;
    }
    if (obj.attr.has(FUN.distinct)) {
      const at = obj.attr.split(' ')[1];
      const vs = [];
      result.each(function (item) {
        if (!vs.has(item[at])) {
          vs.push(item[at]);
          sum++;
        }
      });
    } else {
      if (obj.attr != TYPE.all && obj.attr != '' && !result[0].hasOwnProperty(obj.attr)) {
        _throw('select:' + obj.attr + '属性不存在');
      }
      sum = result.length;
    }
    if (obj.name == TYPE.all || obj.name == '' || obj.name == obj.attr) {
      obj.name = FUN.count;
    }
    const r = {};
    r[obj.name] = sum;
    return r;
  }
  function _jqlFuncWithoutGroup (get) {
    const fun = _geneGroupFuns(get.attr()[0]);
    if (fun.name == fun.attr || fun.name == '*') {// 默认别名是函数名
      fun.name = fun.fun;
    }
    if (fun.attr.has(' ') && fun.attr.split(' ')[1] == fun.name) {// distinct
      fun.name = fun.fun;
    }
    const newobj = {};
    newobj[fun.name] = _checkGroupFunc(fun, get.data());
    return newobj;
  }
  function _jqlRun (get, set) {
    const data = get.data();
    const attr = get.attr();
    const value = get.value();
    const cond = get.cond();
    switch (get.type()) {
      case TYPE.select:{
        let result = [];
        let dist = false;
        const distArr = [];
        const sum = 0;
        let nror = false;// needRemoveOrderAttr  为了完成orderBy的order属性不在select属性里
        if (get.groupAttr() == '') {// 没使用groupBy
          if (attr.length == 1 && attr[0].has('(')) {// 有使用聚合函数
            result = _jqlFuncWithoutGroup(get);
          } else {
            if (get.orderAttr() != '' && !attr.has(get.orderAttr())) {
              attr.push(get.orderAttr());
              nror = true;
            }
            for (var i = 0; i < data.length; i++) {
              if (_jqlCheckWhere(i, get)) {
                var r = {};
                if (attr == TYPE.all) {
                  r = J.clone(data[i]);
                  result.push(r);
                } else {
                  if (attr[0].has(FUN.count)) {// count 函数
                    result = _selectCount(get, attr, data);
                    break;
                  } else {
                    attr.each(function (a, j) {
                      let name = a;// 别名
                      if (a.has(FUN.count)) {
                        _throw('使用count函数时select最多只能选择一列');
                      }
                      if (a.has(' ')) {// 别名
                        const arr = a.split(' ');
                        if (arr.length > 3) {
                          _throw('select参数格式错误');
                        } else if (arr.length == 3) {
                          if (arr[0] != FUN.distinct || j != 0) {
                            _throw('distinct必须放在第一个参数前');
                          }
                          dist = true;
                          name = arr[2];
                          a = arr[1];
                        } else {
                          if (arr[0] == FUN.distinct) {
                            if (j != 0) {
                              _throw('distinct必须放在第一个参数前');
                            }
                            dist = true;
                            name = a = arr[1];
                          } else {
                            name = arr[1];
                            a = arr[0];
                          }
                        }
                      }
                      if (a in data[i]) {
                        if (name in r) {
                          _throw('select:[' + name + ']列名不能重复');
                        }
                        r[name] = data[i][a];
                      } else {
                        if (a.has('(')) {// 没有groupBy的聚合函数
                          _throw('select:没有与groupBy配合使用的聚合函数,一次只允许使用一个');
                        } else {
                          _throw('select参数错误,对象不包含' + a + '属性');
                        }
                      }
                    });
                    
                    if (dist) {
                      const str = J.toString(r);
                      if (!distArr.has(str)) {
                        distArr.push(str);
                        result.push(r);
                      }
                    } else {
                      result.push(r);
                    }
                  }
                }
              }
            }
            _checkRunOrderBy(get, result);// 对select结果order
            if (nror) {
              result = Jql(result).remove(get.orderAttr(), true);
            }
          }
        } else {// 使用groupBy
          if (get.cond() == true) {// 与where共用
            for (var i = 0; i < data.length; i++) {
              if (_jqlCheckWhere(i, get)) {
                result.push(J.clone(data[i]));
              }
            }
          } else {
            result = J.clone(data);
          }
          const funs = [];
          attr.each(function (a) {
            if (a.has(FUN.distinct)) {
              _throw('groupBy与distinct不能共用');
            }
            funs.push(_geneGroupFuns(a));
          });
          
          if (funs.length > 0) {
            set.groupFuns(funs);
          }
          result = _checkRunOrderBy(get, result);
          result = _checkRunGroupBy(get, result);
        }
        _jqlReset(set);
        return _jqlCheckReturn(result, get);
      };break;
      
      case TYPE.update:{
        for (var i = 0; i < data.length; i++) {
          if (_jqlCheckWhere(i, get)) {
            attr.each(function (item, j) {
              if (data[i].hasOwnProperty(item)) {
                data[i][item] = value[j];
              } else {
                _throw('属性不存在，若要添加新属性，请使用add方法');
              }
            });
          }
        }
        _jqlReset(set);
        return _jqlCheckReturn(data, get);
      };break;
      
      case TYPE.add:{
        for (var i = 0; i < data.length; i++) {
          if (_jqlCheckWhere(i, get)) {
            attr.each(function (item, j) {
              if (!data[i].hasOwnProperty(item)) {
                data[i][item] = value[j];
              } else {
                _throw('属性已存在，若要更新属性，请使用update方法');
              }
            });
          }
        }
        _jqlReset(set);
        return _jqlCheckReturn(data, get);
      };break;
      
      case TYPE.remove:{
        for (var i = 0; i < data.length; i++) {
          if (_jqlCheckWhere(i, get)) {
            if (attr == TYPE.all) {
              data[i] = {};
            } else {
              for (let j = 0; j < attr.length; j++) {
                delete data[i][attr[j]];
              }
            }
          }
        }
        _jqlReset(set);
        return _jqlCheckReturn(data, get);
      };break;
      
      case TYPE.insert:{
        const obj = _jqlGeneInsertData(attr, value);
        if (get.index() >= 0) {
          if (get.index() >= data.length) {// 若index超过长度，设置成最后一位
            set.index(data.length - 1);
          }
          if (obj.constructor == Array) {
            data.insertArray(obj, get.index());
          } else {
            data.insert(obj, get.index());
          }
        } else {
          if (obj.constructor == Array) {
            data.appendArray(obj);
          } else {
            data.append(obj);
          }
        }
        _jqlReset(set);
        return J.clone(data);
      };break;
      
      case TYPE.delete:{
        if (get.index() >= 0) {
          if (_jqlCheckWhere(get.index(), get)) {
            data.removeByIndex(get.index());
          }
        } else {
          let realI = 0;
          for (var i = 0; i < data.length; i++) {
            if (_jqlCheckWhere(i, get, realI)) {
              data.removeByIndex(i);
              i--;
            }
            realI++;
          }
        }
        _jqlReset(set);
        return J.clone(data);
      };break;
      
      default:{
        let res;
        if (get.cond() === true) {
          res = [];
          for (var i = 0; i < data.length; i++) {
            if (_jqlCheckWhere(i, get)) {
              res.push(J.clone(data[i]));
            }
          }
        } else {
          res = J.clone(data);
        }
        if (get.orderAttr() != '') {// 没有sele的order
          res = _checkRunOrderBy(get, res);
        }
        if (get.groupAttr() != '') {// 没有sele的group
          res = _checkRunGroupBy(get, res);
        }
        _jqlReset(set);
        return res;
      };break;
    }
  }
  function _jqlGeneInsertData (attr, value) {
    if (attr.constructor == Object || attr.constructor == Array && attr[0].constructor == Object) {
      return attr;
    } else {
      let n = 0;
      for (var i = 0; i < value.length; i++) {
        if (value[i].has(';')) {
          n = value[i].timeOf(';') + 1;
          break;
        }
      }
      if (n == 0) {
        var obj = {};
        for (var i = 0; i < attr.length; i++) {
          obj[attr[i]] = value[i];
        }
        return obj;
      } else {
        const values = [];
        for (var i = 0; i < value.length; i++) {
          if (value[i].has(';')) {
            values.push(value[i].split(';'));
          } else {
            var arr = [];
            for (var j = 0; j < n; j++) {
              arr.push(value[i]);
            }
            values.push(arr);
          }
        }
        var arr = [];
        for (var i = 0; i < n; i++) {
          var obj = {};
          for (var j = 0; j < attr.length; j++) {
            obj[attr[j]] = values[j][i];
          }
          arr.push(obj);
        }
        return arr;
      }
    }
  };
  
  function _jqlInitData (data, set) {
    if (data != null) {
      if (data.constructor != Object && data.constructor != Array) {
        set.canQuery(false);
      }
    }
  }
  function _jqlCheckRun () {
    if (_checkArg.apply(null, arguments) && this.run != undefined) {
      return this.run();
    }
    return this;
  }
  function _checkArg () {
    if (arguments.length == 1) {
      return (arguments[0] === true);
    } else {
      for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] === true) {
          return true;
        }
      }
      return false;
    }
  }
  function _jqlReset (set) {
    set.attr([]);
    set.value([]);
    
    set.cond(false);
    set.condAttr([]);
    set.condValue([]);
    
    set.index(-1);
    
    set.sort('');
    set.type('');
    
    set.order('');
    set.orderAttr('');
    set.orderType('number');
    
    set.groupAttr('');
    set.groupFuns([]);
  };
  Jql = function (data) {
    return new JQL(data);
  };
  JQL = function (data) {
    let _canQuery = true;
    let _data;
    let _single = false;
    if (data.constructor == Object) {
      _data = [data];
      _single = true;
    } else {
      _data = data;
    }
    
    let _attr = [];
    let _value = [];
    
    let _cond = false;
    let _cond_attr = [];
    let _cond_value = [];
    
    let _index = -1;
    
    let _sort = '';
    let _type = '';
    
    let _order = '';
    let _order_attr = '';
    let _order_type = 'number';
    
    let _group_attr = '';
    let _group_funs = [];
    
    const set = {
      canQuery: function (val) {
        _canQuery = val;
      }, data: function (val) {
        _data = val;
      }, attr: function (val) {
        _attr = val;
      }, value: function (val) {
        _value = val;
      }, cond: function (val) {
        _cond = val;
      }, condAttr: function (val) {
        _cond_attr = val;
      }, condValue: function (val) {
        _cond_value = val;
      }, index: function (val) {
        _index = val;
      }, sort: function (val) {
        _sort = val;
      }, type: function (val) {
        _type = val;
      }, order: function (val) {
        _order = val;
      }, orderAttr: function (val) {
        _order_attr = val;
      }, orderType: function (val) {
        _order_type = val;
      }, groupAttr: function (val) {
        _group_attr = val;
      }, groupFuns: function (val) {
        _group_funs = val;
      }
    };
    const get = {
      canQuery: function () {
        return _canQuery;
      }, data: function () {
        return _data;
      }, attr: function () {
        return _attr;
      }, value: function () {
        return _value;
      }, cond: function () {
        return _cond;
      }, condAttr: function () {
        return _cond_attr;
      }, condValue: function () {
        return _cond_value;
      }, index: function () {
        return _index;
      }, sort: function () {
        return _sort;
      }, type: function () {
        return _type;
      }, single: function () {
        return _single;
      }, order: function () {
        return _order;
      }, orderAttr: function () {
        return _order_attr;
      }, orderType: function () {
        return _order_type;
      }, groupAttr: function () {
        return _group_attr;
      }, groupFuns: function () {
        return _group_funs;
      }
    };
    _jqlInitData(data, set);
    if (data.constructor == Object) {
      this.add = function (attr, value) {
        _jqlAdd.call(this, get, set, attr, value);
        return _jqlRun.call(this, get, set);
      };
      this.remove = function (attr) {
        _jqlRemove.call(this, get, set, attr, true);
        return _jqlRun.call(this, get, set);
      };
      this.select = function (attr) {
        _jqlSelect.call(this, get, set, attr, true);
        return _jqlRun.call(this, get, set);
      };
      this.update = function (attr, value) {
        _jqlUpdate.call(this, get, set, attr, value, true);
        return _jqlRun.call(this, get, set);
      };
    } else if (data.constructor == Array) {
      this.add = function (attr, value, run) {
        return _jqlAdd.call(this, get, set, attr, value, run);
      };
      this.remove = function (attr, run) {
        return _jqlRemove.call(this, get, set, attr, run);
      };
      this.insert = function (attr, value, index, run) {
        return _jqlInsert.call(this, get, set, attr, value, index, run);
      };
      this.delete = function (index, run) {
        return _jqlDelete.call(this, get, set, index, run);
      };
      this.select = function (attr, run) {
        return _jqlSelect.call(this, get, set, attr, run);
      };
      this.update = function (attr, value, run) {
        return _jqlUpdate.call(this, get, set, attr, value, run);
      };
      this.run = function () {
        return _jqlRun.call(this, get, set);
      };
      this.where = function (attr, value, run) {
        return _jqlWhere.call(this, get, set, attr, value, run);
      };
      this.orderBy = function (attr, order, type, run) {
        return _jqlOrderBy.call(this, get, set, attr, order, type, run);
      };
      this.groupBy = function (attr, run) {
        return _jqlGroupBy.call(this, get, set, attr, run);
      };
    }
    this.set = function (data) {
      let datac = J.clone(data);
      if (datac.constructor == Object) {
        datac = [datac];
      }
      if (_data.constructor != datac.constructor) {
        _throw('数据类型不同，无法执行set');
      } else {
        _data = datac;
        return data;
      }
    };
    this.get = function () {
      if (_single) {
        return J.clone(_data[0]);
      }
      return J.clone(_data);
    };
    this.data = function () {
      if (_single) {
        return _data[0];
      }
      return _data;
    };
    this.clear = function () {
      if (_data.constructor == Array) {
        _data = [];
      } else if (_data.constructor == Object) {
        _data = {};
      } else {
        _data = null;
      }
      return _data;
    };
  };

})();
let Jql;
let JQL;

