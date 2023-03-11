/* <style>
  [s-bind]{
    display:none;
  }
  [s-loop]{
    display:none;
  }
</style>*/

// 添加了 在s-loop$index
// ${}$
// s-bind="name;data"

/* $each $eachIndex $ei  d{js表达式}d f{return的js语句}f
$(variable){
}$*/

// 一般元素的s-callback
import J from 'jetterjs';
import { selon } from 'selon';

function wrapInputVal (input) {
    const v = input.val();
    return (input.attr('type') === 'number') ? v : `"${v}"`;
}

export function SelonView (obj, loop) {
    if (typeof loop === 'undefined') loop = obj.hasAttr('s-loop');
    let _varName = obj.attr(_bind);// loop 的话 是each
    let _obj = null;
    let _str = _bqlInitHtml(obj, loop);
    let _element = obj;
    let _bql_callback = null;
    if (_element.attr(_callback) != '') {
        _bql_callback = new Function('obj', 'data', _element.attr(_callback));
    }
    let _loop = loop;
    let _single = null;
    let _funs = new Array();
    let _need_refresh = false;
    const get = {
        varName: function () {
            return _varName;
        }, element: function () {
            return _element;
        }, obj: function () {
            return _obj;
        }, str: function () {
            return _str;
        }, loop: function () {
            return _loop;
        }, funs: function () {
            return _funs;
        }, single: function () {
            return _single;
        }, needRefresh: function () {
            return _need_refresh;
        }
    };
    const set = {
        varName: function (val) {
            _varName = val;
        }, element: function (val) {
            _element = val;
        }, obj: function (val) {
            _obj = val;
        }, str: function (val) {
            _str = val;
        }, loop: function (val) {
            _loop = val;
        }, funs: function (val) {
            _funs = val;
        }
    };

    this.run = function () {
        let res;
        if (_single === false) {
            res = _obj.run();
        } else {
            res = _obj.get();
        }
        if (_need_refresh) {
            this.refresh();
            _need_refresh = false;
        }
        return res;
    };
    this.refresh = function () {
        _bqlRefresh(get);
        if (_bql_callback != undefined) {
            _bql_callback.call(_element, _element, _obj.get());
        }
    };
    this.init = function (data) {
        _need_refresh = true;
        if (data == undefined) {
            data = [];
        }
        _obj = selon(data);
        if (data.constructor == Object) {
            this.add = function (attr, value) {
                _obj.add(attr, value);
                _need_refresh = true;
                return this.run();
            };
            this.remove = function (attr) {
                _obj.remove(attr);
                _need_refresh = true;
                return this.run();
            };
            this.select = function (attr) {
                return _obj.select(attr);
            };
            this.update = function (attr, value) {
                _obj.update(attr, value);
                _need_refresh = true;
                return this.run();
            };
            _single = true;
        } else if (data.constructor == Array) {
            this.add = function (attr, value, run) {
                _obj.add(attr, value, run);
                _need_refresh = true;
                return _bqlCheckRefresh.call(this, value, run);
            };
            this.remove = function (attr, run) {
                _obj.remove(attr, run);
                _need_refresh = true;
                return _bqlCheckRefresh.call(this, attr, run);
            };
            this.update = function (attr, value, run) {
                _obj.update(attr, value, run);
                _need_refresh = true;
                return _bqlCheckRefresh.call(this, value, run);
            };
            this.delete = function (index, run) {
                _obj.delete(index, run);
                _need_refresh = true;
                return _bqlCheckRefresh.call(this, index, run);
            };
            this.insert = function (attr, value, index, run) {
                _obj.insert(attr, value, index, run);
                _need_refresh = true;
                return _bqlCheckRefresh.call(this, value, index, run);
            };
            this.select = function (attr, run) {
                return _bqlCheckResRefresh.call(this, get, _obj.select(attr, run), [ attr, run ]);
            };
            this.where = function (attr, value, run) {
                return _bqlCheckResRefresh.call(this, get, _obj.where(attr, value, run), [ value, run ]);
            };
            this.orderBy = function (attr, order, type, run) {
                return _bqlCheckResRefresh.call(this, get, _obj.orderBy(attr, order, type, run), [ order, type, run ]);
            };
            this.groupBy = function (attr, run) {
                return _bqlCheckResRefresh.call(this, get, _obj.groupBy(attr, run), [ run ]);
            };
            _single = false;
        }
        this.set = function (data, ref) {
            _obj.set(data);
            if (ref == undefined || ref === true) {
                _need_refresh = true;
                this.run();
            }
            return data;
        };
        this.get = function () {
            return _obj.get();
        };
        this.data = function () {
            return _obj.data();
        };
        this.clear = function () {
            _obj.clear();
            _need_refresh = true;
            this.run();
            return null;
        };
        _need_refresh = true;// 初始化
        this.run();

        _element.findAttr(_callback).each(function (item) {
            const fun = new Function(item.attr(_callback));
            fun.call(item);
        });

        return this.get();
    };
    _bqlInit.call(this, get, set);
};
// @ts-ignore
SelonView.init = function (element, data) {
    if (element == undefined) {
        const list = J.attr(_bind);
        list.each(function (item) {
            _bqlCheckBindInit(item);
            (new Function('obj', 'window.' + item.attr(_bind) + '=new SelonView(obj)'))(item);
        });
        const lista = J.attr(_loop);
        lista.each(function (item) {
            _bqlCheckBindInit(item, true);
            (new Function('obj', 'window.' + item.attr(_loop) + '=new SelonView(obj,true)'))(item);
        });
    } else {
        let bool = '';
        let attr = '';
        if (element.hasAttr(_bind)) {
            _bqlCheckBindInit(element);
            attr = element.attr(_bind);
        } else if (element.hasAttr(_loop)) {
            _bqlCheckBindInit(element, true);
            attr = element.attr(_loop);
            bool = ',true';
        } else {
            throw new Error('对象没有s-bind或s-loop属性，不可初始化');
        }
        (new Function('obj', 'window.' + attr + '=new SelonView(obj' + bool + ')'))(element);
        if (!element.hasAttr(_init)) {
            if (data != undefined) {
                (new Function('d', attr + '.init(d)'))(data);
            }
        }
        return window[attr];
    }
};

J.ready(function () {
    SelonView.init();
});
const _bind = 's-bind', // 单值
    _loop = 's-loop', // 数组
    _update = 's-update', // input值改变 是否更新数据 默认为false oninput 更新数据
    _refresh = 's-refresh', // onchange 刷新页面
    _callback = 's-callback', // onchange 刷新页面 的回调函数
    _init = 's-init', // 初始值 默认为null
    _each = 's-each', // 下文中引用的变量名 默认为each
    _each_def = 'each',
    _s = '{{',
    _e = '}}',
    _bind_str = _s + 'bind' + _e,
    _reg = new RegExp('(' + _s + ')((.|\\n)*?)(' + _e + ')', 'g'),
    //   _fun_reg = new RegExp('(\\$(.*?){)((.|\\n)*?)(}\\$)', 'g'),
    _all_reg = new RegExp('(' + _s + ')((.|\\n)*?)(' + _e + ')|(\\$(.*?){)((.|\\n)*?)(}\\$)', 'g'),
    _undefined = '无',
    _index = 's-index', // 哪一个数据
    _attr = 's-attr';// 那一个属性
function _funsResult (get, data, i) {
    const result = [];
    get.funs().each(function (item) {
        const res = J.checkArg(item(data, i, i), _undefined);
        result.append(res);
    });
    let str = get.str().replaceAll(_bind_str, result);
    if (i != undefined) {
        str = str.replaceAll(_index + '="i"', _index + '=' + i);
    }
    return str;
}

function _bqlRefresh (get, run) {
    const obj = get.obj();
    if (run === true && obj.run != undefined) {
        obj.run();
    }
    let html = '';
    const d = obj.get();
    if (d == null) {
        html = get.str().replaceAll(_bind_str, 'undefined');
    } else {
        if (get.loop()) {
            if (d != null && d.constructor == Array) {
                d.each(function (dataItem, i) {
                    html += _funsResult(get, dataItem, i);
                });
            }
        } else {
            html = _funsResult(get, d);
        }
    }
    const element = get.element();
    element.html(html);
    _bqlInitEvent(element, get.single());
    return d;
}
function _bqlInitEvent (element, single) {
    const refresh = element.attr(_refresh);
    if (element.attr(_update) == 'true') {
        [ 'input', 'textarea' ].each(function (tag) {
            element.findTag(tag).each(function (item) {
                if (item.hasAttr(_attr)) {
                    let name;
                    if (single === true) {
                        const a = item.attr(_attr);
                        item.removeAttr(_attr);
                        name = element.attr(_bind);
                        item.on('input', function () {
                            (new Function(`${name}.data()${a}=${wrapInputVal(this)};`))();
                        }, true);
                    } else if (single == false) {
                        const i = item.attr(_index);
                        const a = item.attr(_attr);
                        item.removeAttr(_index);
                        item.removeAttr(_attr);
                        name = element.attr(_loop);
                        item.on('input', function () {
                            (new Function(`${name}.data()[${i}]${a}=${wrapInputVal(this)};`))();
                        }, true);
                    } else {
                        name = element.attr(_bind);
                        item.removeAttr(_attr);
                        item.on('input', function () {
                            (new Function(`${name}.set(${wrapInputVal(this)},false);`))();
                        }, true);
                    }
                    if (refresh == 'true') {
                        item.on('change', function () {
                            (new Function(name + '.refresh();'))();
                        }, true);
                    }
                }
            });
        });
    }
}
function _bqlInit (get, set) {
    const str = get.str();
    const element = get.element();
    const funs = new Array();
    if (get.loop()) {
        set.varName((element.hasAttr(_each)) ? element.attr(_each) : _each_def);
    }
    if (_all_reg.test(str)) {
        str.match(_all_reg).each(function (item) {
            let content = '';
            if (item.has('${') || item.has('$(')) {
                if (item.substring(0, 2) == '${') {
                    content = '(function()' + item.substring(1, item.length - 1).trim() + ')()';
                } else {
                    // content="(function()"+item.substring(1,item.length-1).trim()+")()";
                    const vname = item.substring(2, item.indexOf(')'));
                    let html = item.substring(item.indexOf('{') + 1, item.length - 2);
                    html = html.replaceAll('\'', '\\\'');
                    if (html.has('d{')) {
                        html = html.replaceAll('d{', '\'+(').replaceAll('}d', ')+\'').replaceAll('\n', '');
                    }
                    if (html.has('f{')) {
                        html = html.replaceAll('f{', '\'+(function(window){').replaceAll('}f', '})()+\'').replaceAll('\n', '');
                    }
                    content = '(function(window){var _r=\'\';' +
                vname + '.each(function($each,$eachIndex){\
                  var $ei=$eachIndex;\
                  _r+=\'' + html + '\';\
                });return _r;})()';// 拼接方式有待改进 以解决单双引号问题
                }
            } else {
                content = item.substring(_s.length, item.length - _e.length).trim();
            }
            funs.append(new Function(get.varName(), '$index', '$i', 'return ' + content));
        });
        set.str(str.replaceAll(_all_reg, _bind_str));
        set.funs(funs);
    }
    element.empty();
    if (element.hasAttr(_init)) {
        this.init((new Function('return ' + element.attr(_init)))());
    }
    if (element.css('display') == 'none') {
        element.css('display', 'block');
    }
}
function _bqlCheckRefresh () {
    if (_checkArg.apply(null, arguments)) {
        return this.run();
    }
    return this;
}
function _bqlCheckResRefresh (get, res, args) {
    if (_checkArg.apply(null, args)) {
        if (get.needRefresh()) {
            this.run();
        }
        return res;
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
//
function _bqlInitHtml (element, loop) {// 为oninput 给input (value) textArea (里面的内容)
    if (element.attr(_update) == 'true') {
        [ 'input', 'textarea' ].each(function (tag) {
            const items = element.findTag(tag);
            if (items != undefined) {
                items.each(function (item) {
                    let val;
                    if (tag == 'input') {
                        val = item.attr('value').trim();
                    } else {
                        val = item.html().trim();
                    }
                    item.attr('value', val);
                    const arr = val.match(_reg);
                    if (arr != null) {
                        if (arr[0] == val) {// 只允许 value="{{item.attr}}"
                            const attr = arr[0].substring(arr[0].indexOf('.'), arr[0].length - _e.length);
                            item.attr(_attr, attr);
                            if (loop) {
                                item.attr(_index, 'i');
                            }
                        }
                    }
                });
            };
        });
    }
    return element.html();
};
function _bqlCheckBindInit (obj, loop) {
    let type = '';
    if (loop === true) {
        type = _loop;
    } else {
        type = _bind;
    }
    const name = obj.attr(type);
    if (name.has(';')) {
        obj.attr(type, name.split(';')[0]);
        obj.attr(_init, name.split(';')[1]);
    }
}

window.SelonView = SelonView;