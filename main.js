function lazyLoad(){
    // 获取所有未加载的图片
    const lazyImageArray = document.querySelectorAll('img[data-src]');
    // 加载图片的方法
    const loadImage = function (image) {
        // 将data-src属性中的存放的图片地址设置到src属性中
        image.setAttribute('src', image.getAttribute('data-src'));
        // 图片加载完成后移除data-src属性
        image.onload = function() {
            console.log('图片加载完成');
            image.removeAttribute("data-src");
        }
    }
    // IntersectionObserver接口 (从属于Intersection Observer API) 提供了一种异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法。
    const intersectionObserver = new IntersectionObserver(function(items, observer) {
        items.forEach(function(item) {
            if(item.isIntersecting) {
                loadImage(item.target);
                // 停止监听特定目标元素
                observer.unobserve(item.target);
            }
        });
    });

    lazyImageArray.forEach(function(image){
        intersectionObserver.observe(image);
    })
}

lazyLoad();