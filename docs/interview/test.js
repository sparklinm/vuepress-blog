function debounce (fn, duration, first) {

    let timer = null;

    return function (...args) {
        if (first) {
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, duration);
            first = false;
            return;
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, duration);
    };
}



function Parent (params) {

}


function Child (params) {

    Parent.call(this);

    this.name = 'child';
}


Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;





// 19:18
// Dong
// 实现一个Mac类用来储存和校验mac地址，mac地址格式aa-bb-cc-dd-ee-ff,16进制数共12位，
// 每两位中间有分隔符，满足以下使用方法:
// const mac = new Mac('-'); // 初始化时传入分隔符

// mac.set('11-22-33-44-55-66'); // 如果格式错误返回false
// mac == '11-22-33-44-55-66'; // 返回true

class Mac {
    constructor (divide) {
        this.divide = divide;
    }
    set (str) {
        const arr = str.split(this.divide);

        if (arr.length !== 6) {
            return false;
        }

        const isRight = arr.every(item => {
            if (item.length > 3) {
                return false;
            }

            const nums = item.split('');


            return nums.every(num => {
                let n = Number(num);

                // console.log(num);

                n = Number.parseInt(num, 16);

                // console.log(n);


                if (n >= 16 || n < 0 || Number.isFinite(n)) {
                    return false;
                }

                return true;
            });
        });

        if (isRight) {
            this.str = str;
        }

    }
    valueOf () {
        return this.str;
    }
}


const reg = /^([0-9A-F][0-9A-F]-){5}([0-9A-F][0-9A-F]){1}$/i;

new RegExp();

console.log(reg.test('1F-22-33-44-55-66'));
console.log(/([0-9A-F][0-9A-F]-)/g.test('11-'));


const mac = new Mac('-'); // 初始化时传入分隔符

mac.set('111-22-33-44-55-66'); // 如果格式错误返回false
console.log(mac == '111-22-33-44-55-66');