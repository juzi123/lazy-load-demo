function lazyLoadUseIntersectionObserver(){
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

// lazyLoadUseIntersectionObserver();


document.addEventListener("DOMContentLoaded", function() {
    let lazyImages = [].slice.call(document.querySelectorAll("img[data-src]"));
    let active = false;
  
    const lazyLoad = function() {
      if (active === false) {
        active = true;
  
        setTimeout(function() {
          lazyImages.forEach(function(lazyImage) {
            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            //   lazyImage.src = lazyImage.dataset.src;
            //   lazyImage.srcset = lazyImage.dataset.srcset;
            //   lazyImage.classList.remove("lazy");
              lazyImage.setAttribute('src', lazyImage.getAttribute('data-src'));
              lazyImage.removeAttribute("data-src");
  
              lazyImages = lazyImages.filter(function(image) {
                return image !== lazyImage;
              });
  
              if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationchange", lazyLoad);
              }
            }
          });
  
          active = false;
        }, 200);
      }
    };
  
    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
  });


