# Smooth Background Scroll
Smooth background image transition on scroll.

![version](https://img.shields.io/badge/version-1.0.0-orange)
![last commit](https://img.shields.io/github/last-commit/airammateos/smooth_background_scroll?color=red)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
![watchers](https://img.shields.io/github/watchers/airammateos/smooth_background_scroll?color=blue)
![stars](https://img.shields.io/github/stars/airammateos/smooth_background_scroll?color=green)

[![Github](https://img.shields.io/github/followers/airammateos?label=Follow&style=social)](https://github.com/airammateos)
[![Twitter Follow](https://img.shields.io/twitter/follow/airammateos.svg?style=social)](https://twitter.com/airammateos) 
[![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Smooth%20Scroll%20library%0Ahttps%3A//github.com/airammateos/smooth_background_scroll)

## Third party
We use third party libraries and images:
* [Polyfill](https://polyfill.io)
* [Images](https://wallpaperplay.com/)

## Usage
Add script right before closing `</body>` tag and initialize SmoothScroll:
```html
  <script src="https://polyfill.io/v3/polyfill.min.js?features=Object.assign%2CArray.from"></script>
  <script src='smoothScroll.js'></script>
  <script>
    SmoothScroll.init([
      'img/164604.jpg',
      'img/164621.jpg',
      'img/164622.jpg',
      'img/164624.jpg',
      'img/164642.jpg',
      'img/164651.jpg'
    ]);
  </script>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/) and those of the used libraries and images.