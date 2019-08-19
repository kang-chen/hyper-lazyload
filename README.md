# Hyper Lazyload

Simple lazy loading of images with minimal markup changes. Currently dependency free.

### Installing

In your project directory:

```
npm install hyper-lazyload
```

### Usage (Module)

In your project HTML file make a container to hold images and assign an ID:

``` 
    <body>
        <div id="lazy-load">
        </div>
    </body>
```

In your project JS file:

```
import lazyload from 'hyper-lazyload'

/**
 * Initialize the lazyloading on a container
 * @param {images} Array<string> of your images
 * @param {chunk} [c=3] any number, defaults to 3
 * @param {containerId} string for the id of your container, defaults to 'lazy-load'
 * @param {throttleDuration} any int number, sets the duration of the scroll throttling * defaults to an integer of 1000
 */

lazyload.init(
    ['/image1.jpg', '/image2.jpg'],
    3,
    'lazy-load',
    1000
)

```

### Usage (Standalone)

```npm run build```

To generate standalone file `hyperlazyload.min.js`

You can either upload to CDN or include it inline in your html with `<script></script>` tags. We can then initialize it on the window object with `window.HyperLazyload.default.init();`. Refer to module usage for argument list.

## Running the tests

`npm run test`

## Notes

This is more like a proof of concept now as there is now native lazy loading in [Chrome!](https://addyosmani.com/blog/lazy-loading/)

## License

MIT