/* 
 * 解析URL
 * @query  ?id='123abdc'&name='bdcd'
 * @result  {id:'123abdc',name:'bdcd'}
 */
const urlParse = (query) => {
    let obj = {};
    const reg = /[?&][^?&]+=[^?&]+/g;
    const arr = query.match(reg);
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
};

/*
 * 深拷贝
 * @obj   Object、Array
 */
const deepClone = obj => {
    let cloneObj = Array.isArray(obj) ? [] : {};
    //如果obj不存在或者不是对象，跳出函数
    if (!obj || typeof obj !== 'object') {
        return;
    }
    //遍历obj
    for (key in obj) {
        //如果遍历到obj的原型上，跳出本次遍历
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        //如果遍历到的value不存在，或者不是对象，简单复制
        if (!obj[key] || typeof obj[key] !== 'object') {
            cloneObj[key] = obj[key];
            continue;
        }
        //遍历到的value是对象，递归复制
        cloneObj[key] = arguments.callee(obj[key]);
    }
    return cloneObj;
}

/* 
 * 比较对象与数组中对象是否相等
 * @arrObj [{a:1,b:2}]
 * @obj {a:1,b:2}
 */
const handleCompare = (arrObj, obj) => {
    let result = false;
    arrObj.forEach((item) => {
        let midObj = { ...item, ...obj };
        if (JSON.stringify(item) == JSON.stringify(midObj)) {
            result = true;
        }
    });
    return result;
};

/*
 * 对数组内的对象排序
 *  @arr [{a:1,b:'嘿嘿'}]
 */
const newSort = arr => {
    const compiler = (x, y) => {
        let valuesX = Object.values(x);
        let valuesY = Object.values(y);
        if (valuesX.length < valuesY.length) {
            for (let i = 0; i < valuesX.length; i++) {
                if (valuesX[i] == valuesY[i]) {
                    let newValuesX = valuesX.slice(i + 1);
                    let newValuesY = valuexY.slice(i + 1);
                    compiler(newValuesX, newValuesY);
                }
                return valuesX[i] < valuesY[i] ? -1 : 1;
            }
            return 0;
        }
    }
    return arr.sort((item1, item2) => {
        compiler(item1, item2)
    });
}

/* 
 * 去除重复数组
 * 
 */
const quern = arr => {
    let arrStr = [];
    for (let i = 0; i < arr.length; i++) {
        arrStr.push(JSON.stringify(arr[i]));
    }
    let setArr = new Set(arrStr);
    let newArr = [...setArr];
    console.log(newArr);
    let quernArr = [];
    for (let j = 0; j < newArr.length; j++) {
        quernArr.push(JSON.parse(newArr[j]));
    }
    return quernArr;
}

/* 
 * 得到一个字符串重复最多的字符
 */
const maxStr = str => {
    let strArr = [...new Set(str.split(""))];
    let strArrN = [];
    for (let i = 0; i < strArr.length; i++) {
        strArrN[i] = str.split(strArr[i]).length - 1;
    }
    return { maxN: Math.max.apply(null, strArrN), maxStr: strArr[strArrN.indexOf(Math.max(...strArrN))] };
}