// 动画函数

function animate(obj, target,callback) {
    // 当我们不断点击定时器时会开启多个定时器叠加在一起
    // 解决的方案就是只让一个定时器执行
    // 所以当执行一个定时器时先清除之前的定时器，只保留一个定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        let step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(obj.offsetLeft == target){
            // 停止动画 本质是停止定时器
            clearInterval(obj.timer);
            if(callback){
                // 调用函数
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    },30);
}