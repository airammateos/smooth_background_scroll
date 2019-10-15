/** 
 * @author  Airam Mateos
 * @date    2019-10-10
 * @project SmoothScroll
 * @version 1.0.0
 * 
 * @description  Javascript library which handles the background
 * image transition for a single page on scroll.
 * 
 * @usage Add script right before closing '</body>' tag and initialize SmoothScroll. 
 * In the initialization you have to pass the images, one for each '<section>'.
 * <script src='smoothScroll.js'></script>
 * <script>
 *   SmoothScroll.init([
 *     'img/164604.jpg',
 *     'img/164621.jpg',
 *     'img/164622.jpg',
 *     'img/164624.jpg',
 *     'img/164642.jpg',
 *     'img/164651.jpg'
 *   ]);
 * </script>
 */
!function(scope, fn) {
  scope.SmoothScroll = fn()
}(this, function() {
  'use strict';

  /**
   * Variables
   */
  let _images      = [];
  let _sections    = null;
  let _sectionsPos = null;
  let _scope       = null;
  let _libEnabled  = true;

  /**
   * Scope object setter
   * @param {obj} obj Dom element
   */
  function _setScope(obj) {
    _scope = obj;
  }

  /**
   * Scope object getter
   * @return {obj}
   */
  function _getScope() {
    return _scope;
  }

  /**
   * Get DOM sections
   * @return {Array}
   */
  function _getSections(force) {
    if (!_sections ||
        force
    ) {
      _sections = Array.from(
        document.getElementsByTagName('section')
      );
    }
    return _sections;
  }

  /**
   * Get all DOM sections top position
   * @return {Array}
   */
  function _setSectionsTopPosition() {
    var sections = _getSections(true);
    _sectionsPos = sections.map(function(section) {
      return section.offsetTop
    });
    console.log(_sectionsPos);
  }

  /**
   * Caches images, avoiding white flash between background replacements
   * @param {array} images 
   */
  function _initImages() {
    _images.forEach(function(img) {
      return new Image().src = img
    });
  }

  function _getElementBackground() {
    var elems = document.getElementsByClassName('bg-fixed-fix');
    if (elems) {
      elems = elems[0];
    }
    return elems;
  }

  /**
   * Change background image property
   * @param {int} idx 
   */
  function _changeBackground(idx) {
    var elem = _getElementBackground();
    elem.style.background           = "url('" + _images[idx] + "') center";
    elem.style.backgroundSize       = 'cover';
    elem.style.webkitBackgroundSize = 'cover';
    // -moz-background-size: cover;
    // -o-background-size: cover;
    elem.style.backgroundAttachment = 'fixed';
    elem.style.backgroundRepeat     = 'no-repeat';
    elem.style.position             = 'fixed';
  }

  /**
   * Get section index by current scroll position
   * @param {int} scroll Current Scroll position
   * @param {int} diff   Difference
   */
  function _getSectionIndex(scroll, diff) {
    diff = diff || 3;

    scroll += Math.floor(
      _scope.innerHeight / diff
    );

    // get max index by scroll
    var value = Math.max.apply(
      Math,
      _sectionsPos.map(function(pos) { return scroll >= pos ? pos : 0; })
    );

    return _sectionsPos.indexOf(value);
  }

  /**
   * Smooth scroll handler
   */
  function _handleSmoothScrolling() {
    if (!_libEnabled) {
      return;
    }

    var section = _getSectionIndex(
      window.pageYOffset
    );

    _changeBackground(section);
  }

  /**
   * Device orientation change event handler
   */
  function _onOrientationChange() {
    // After orientationchange, add a one-time resize event
    var afterOrientationChange = function() {
      _setSectionsTopPosition();
      _handleSmoothScrolling();
      // Remove the resize event listener after it has executed
      _getScope().removeEventListener('resize', afterOrientationChange);
    };
    _getScope().addEventListener('resize', afterOrientationChange);
    console.info('Changed device orientation. Recalculating...');
  }

  /**
   * Bind smooth scroll handler
   */
  function enable() {
    // bind events and handler
    _getScope().addEventListener('scroll', _handleSmoothScrolling, false);
    _getScope().addEventListener('touchmove', _handleSmoothScrolling, false);
    _getScope().addEventListener("orientationchange", _onOrientationChange, false);
    _libEnabled = true;
    console.info('Enabled smooth scrolling');

    // set background image on reload
    _handleSmoothScrolling();
  }

  /**
   * Unbind smooth scroll handler
   */
  function disable() {
    _getScope().removeEventListener('scroll', _handleSmoothScrolling, false);
    _getScope().removeEventListener('touchmove', _handleSmoothScrolling, false);
    _getScope().removeEventListener("orientationchange", _onOrientationChange, false);
    _libEnabled = false;
    console.info('Disabled smooth scrolling');
  }

  function _checkElements() {
    return (_images && 
           _images.length > 0 &&
           _sections &&
           _sections.length > 0);
  }

  /**
   * Initializing SmoothScroll
   * - Create image objects
   * - Get all sections top position on webpage
   * - Attach that handle scroll and everything connected to it
   *   to window scroll event and fire once document is ready to set initial state
   * @param {array} images 
   */
  function init(userImages) {
    _setScope(window);

    // set images
    _images = Object.assign(_images, userImages);
    _initImages();

    // Create initial array with sections top positions
    _getSections();

    /**
     * Check for elements
     */
    if (!_checkElements()) {
      console.info('Images nor Sections are defined in this page.');
    }

    _setSectionsTopPosition();
    enable();
  };

  return {
    init: init,
    enable: enable,
    disable: disable
  }
});