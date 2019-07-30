const mainModule = (function () {
    
    let loadingImages = false;
    let lazyLoadContainer = null;
    const fetchArr = [];
    let chunk = null;

    function loadMultipleImages(srcArr, num) {
            
        const promises = [];

        loadingImages = true;
        
        for(var i=0; i < num; i++) {
            const src = srcArr.shift();
            promises.push(new Promise((resolve, reject) => {
                const img = new Image();
                img.addEventListener("load", () => {
                    loadingImages = false;
                    resolve(img);
                });
                img.addEventListener("error", err => {
                    loadingImages = false;
                    reject(err)
                });

                img.src = src;
            }));
        }

        Promise.all(promises).then(function(images) {
            images.forEach(function(img) {
            document.getElementById('lazy-load').appendChild(img);
            })
        });
    }

    const imageElementHeight = 250;

    function throttleUnderscore(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
        previous = options.leading === false ? 0 : Date.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
        };
        return function() {
        var now = Date.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
            clearTimeout(timeout);
            timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
        };
    };
        

    function handleLoadImages(event) {
        console.log('handleLoadImages', event);
        const offsettop = event.target.scrollTop;

        if (offsettop >= lazyLoadContainer.offsetHeight - imageElementHeight && 
            fetchArr.length >= chunk &&
            loadingImages === false) {
                console.log('load multiple');
                loadMultipleImages(fetchArr, chunk);
            }
    }

    return {
        init: function(f = [], c=3, cId='lazy-load') {
            
            if (f.length === 0) {
                for (let i=0; i < 100; i++) {
                    fetchArr[i] = "http://placehold.it/300x250?text=Image+" + i;
                }
            } else {
                fetchArr = f;
            }

            chunk = c;

            lazyLoadContainer = document.getElementById(cId);

            lazyLoadContainer.style.width = '450px';
            lazyLoadContainer.style.height = '600px';
            lazyLoadContainer.style.overflowY = 'scroll';

            lazyLoadContainer.addEventListener('scroll', throttleUnderscore(handleLoadImages, 1000));
        }    
    }
})();

module.exports = mainModule;
