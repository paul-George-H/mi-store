window.addEventListener('load', function () {
    // 1.获取元素
    let prev = document.querySelector('.prev');
    let next = document.querySelector('.next');
    let banner = document.querySelector('.banner');
    let bannerWidth = banner.offsetWidth;
    // 2.鼠标经过banner 就显示隐藏的左右按钮
    banner.addEventListener('mouseenter', function () {
        prev.style.display = 'block';
        next.style.display = 'block';
        // 鼠标经过banner 就停止定时器 让轮播图停止
        clearInterval(timer);
        timer = null;
    })
    banner.addEventListener('mouseleave', function () {
        prev.style.display = 'none';
        next.style.display = 'none';
        // 鼠标离开banner 就开启定时器 让轮播图运行
        timer = setInterval(function () {
            // 自动调用事件
            next.click();
        }, 3000)
    })
    // 3.动态生成小圆圈 有几张图片，我就生成几个小圆圈
    let img_list = document.querySelector('.img-list');
    let pointer = document.querySelector('.pointer');
    for (let i = 0; i < img_list.children.length; i++) {
        // 创建一个小li
        let li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做
        li.setAttribute('index', i);
        // 把小li插入ol(pointer)
        pointer.appendChild(li);
        // 4.小圆圈的排他思想，我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            // 干掉所有人 把所以小li 清除current 类名
            for (let i = 0; i < pointer.children.length; i++) {
                pointer.children[i].className = '';
            }
            // 留下我自己 当前的小li 设置current 类名
            this.className = 'current';
            // 5.点击小圆圈，移动图片 当然移动的是ul(img_list)
            // ul(img_list)的移动距离就是小圆圈的索引号乘以图片的宽度，注意是负值
            // 当我们点击了某个小li就拿到当前小li的索引号
            let index = this.getAttribute('index');
            animate(img_list, -index * bannerWidth);

            // 使点击事件与小圆圈切换轮播图的顺序同步
            // 当我们点击某个小li 就要把这个li 的索引号给num
            num = index;
            // 当我们点击某个小li 就要把这个li 的索引号给circle
            circle = index;
        })
    }
    // 把ol里面的第一个小li类名设置为 current
    pointer.children[0].className = 'current';
    // 6.克隆第一张图片（li）放到ul(img_list)最后面
    // cloneNode(ture)为深复制，连子元素也复制出来，false则相反
    let first = img_list.children[0].cloneNode(true);
    // appendchildren将元素插入父元素最后一个
    img_list.appendChild(first);
    // 7.点击右侧按钮，图片滚动一张
    let num = 0;
    // 控制小圆圈的播放
    let circle = 0;
    // 右侧按钮
    next.addEventListener('click', function () {
        // 如果走到最后复制的一张图片，此时我们的ul（img_list）要快速复原
        if (num == img_list.children.length - 1) {
            img_list.style.left = 0;
            num = 0;
        }
        num++;
        animate(img_list, -num * bannerWidth);
        // 8.点击右侧按钮，小圆圈跟着一起变化 可以再声明一个变量控制小圆圈的播放
        circle++
        // 如果circle == 4 说明走到了最后我们克隆的这张照片 我们就复原
        if (circle == pointer.children.length) {
            circle = 0;
        }
        circleChange();
    })
    // 左侧按钮
    prev.addEventListener('click', function () {
        // 如果走到第一张图片，此时我们的ul（img_list）要跳转到第四张图片
        if (num == 0) {
            num = img_list.children.length - 1;
            img_list.style.left = -num * bannerWidth + 'px';
        }
        num--;
        animate(img_list, -num * bannerWidth);
        // 9.点击右侧按钮，小圆圈跟着一起变化 可以再声明一个变量控制小圆圈的播放
        circle--;
        // 如果 circle < 0 说明现在处于第一张图片 则小圆圈要改为第四个小圆圈
        if (circle < 0) {
            circle = pointer.children.length - 1;
        }
        circleChange();
    })
    function circleChange() {
        // 排他思想 先清除其他小圆圈的 curr类名
        for (let i = 0; i < pointer.children.length; i++) {
            pointer.children[i].className = '';
        }
        // 留下当前小圆圈的的curr类名
        pointer.children[circle].className = 'current';
    }
    // 10.自动播放轮播图
    timer = setInterval(function () {
        // 自动调用事件
        next.click();
    }, 5000)
    // 搜索框显示搜索相关信息
    let search_inp = this.document.querySelector('.search-inp')
    let search_box = this.document.querySelector('.search-box')
    search_inp.addEventListener('focus', function () {
        search_box.style.display = 'block';
    })
    search_inp.addEventListener('blur', function () {
        search_box.style.display = 'none';
    })

    const goodsList = [
        {
            id: '4001172',
            name: '称心如意手摇咖啡磨豆机咖啡豆研磨机',
            price: '289.00',
            picture: 'https://yanxuan-item.nosdn.127.net/84a59ff9c58a77032564e61f716846d6.jpg',
        },
        {
            id: '4001594',
            name: '日式黑陶功夫茶组双侧把茶具礼盒装',
            price: '288.00',
            picture: 'https://yanxuan-item.nosdn.127.net/3346b7b92f9563c7a7e24c7ead883f18.jpg',
        },
        {
            id: '4001009',
            name: '竹制干泡茶盘正方形沥水茶台品茶盘',
            price: '109.00',
            picture: 'https://yanxuan-item.nosdn.127.net/2d942d6bc94f1e230763e1a5a3b379e1.png',
        },
        {
            id: '4001874',
            name: '古法温酒汝瓷酒具套装白酒杯莲花温酒器',
            price: '488.00',
            picture: 'https://yanxuan-item.nosdn.127.net/44e51622800e4fceb6bee8e616da85fd.png',
        },
        {
            id: '4001649',
            name: '大师监制龙泉青瓷茶叶罐',
            price: '139.00',
            picture: 'https://yanxuan-item.nosdn.127.net/4356c9fc150753775fe56b465314f1eb.png',
        },
        {
            id: '3997185',
            name: '与众不同的口感汝瓷白酒杯套组1壶4杯',
            price: '108.00',
            picture: 'https://yanxuan-item.nosdn.127.net/8e21c794dfd3a4e8573273ddae50bce2.jpg',
        },
        {
            id: '3997403',
            name: '手工吹制更厚实白酒杯壶套装6壶6杯',
            price: '99.00',
            picture: 'https://yanxuan-item.nosdn.127.net/af2371a65f60bce152a61fc22745ff3f.jpg',
        },
        {
            id: '3998274',
            name: '德国百年工艺高端水晶玻璃红酒杯2支装',
            price: '139.00',
            picture: 'https://yanxuan-item.nosdn.127.net/8896b897b3ec6639bbd1134d66b9715c.jpg',
        },
    ]
    // 1.声明一个字符串
    let str = ''
    // 2.便利数据
    goodsList.forEach(item => {
        // console.log(item);
        const { name, price, picture } = item
        str += `
          <div class="item">
            <img src="${picture}" alt="">
            <p class="name">${name}</p>
            <p class="price">${[price]}</p>
          </div>
          `
    })
    document.querySelector('.goods-info').innerHTML = str
})