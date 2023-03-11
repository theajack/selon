/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-11 10:45:40
 * @Description: Coding something
 */

export function sortByAttr (a, type, b) {
    const c = this.length;
    let d, current;
    for (let i = 1; i < c; i++) {
        d = i - 1;
        current = this[i];
        while (d >= 0 && _compareValue(this[d][a], current[a], type) ) {
            this[d + 1] = this[d];
            d--;
        }
        this[d + 1] = current;
    }
    if (type == false || b == false) {
        this.reverse();
    }
    return this;
};
function _compareValue (a, b, type) {
    if (_getSortValue(a, type) > _getSortValue(b, type)) {
        return true;
    }
    return false;
};
function _getSortValue (value, type) {
    if (type == undefined || typeof type == 'boolean') {
        return value;
    } else {
        let res = null;
        switch (type) {
            case 'date':
                if (value instanceof Date) {
                    res = value;
                } else {
                    let arr;
                    if (value.includes('-')) {
                        arr = value.split('-');
                    } else {
                        arr = value.split('/');
                    }
                    res = new Date(arr[0], arr[1], arr[2]);
                } break;
            case 'length':res = value.length; break;
            case 'headLetter':res = value.toLowerCase().charCodeAt(0); break;
            case 'number':res = value; break;
            default:res = value; break;
        }
        return res;
    }
};

export function avg (arr) {
    return sum(arr) / arr.length;
};

export function sum (arr) {
    let v = 0;
    arr.forEach(i => {
        v += i;
    });
    return v;
}


export function clone (obj) {
    // todo
    return JSON.parse(JSON.stringify(obj));
};