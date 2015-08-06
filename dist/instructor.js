(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Fit element
// ===========
//
// A small library for fitting an element in the available space in the screen,
// in relation to another.

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = fitElement;
var directionClassNames = ['top', 'right', 'bottom', 'left'];

// Applies appropriate values to the first element's styles based on the
// direction passed.
function applyOffsetsToStyle(element1, element2, direction) {
  var _element1$classList;

  (_element1$classList = element1.classList).remove.apply(_element1$classList, directionClassNames);
  element1.classList.add(direction);

  switch (direction) {
    case 'top':
      element1.style.top = '' + element2.offsetTop + 'px';
      element1.style.left = '' + (element2.offsetLeft + element2.offsetWidth / 2) + 'px';
      break;
    case 'right':
      element1.style.top = '' + element2.offsetTop + 'px';
      element1.style.left = '' + (element2.offsetLeft + element2.offsetWidth) + 'px';
      break;
    case 'bottom':
      element1.style.top = '' + (element2.offsetTop + element2.offsetHeight) + 'px';
      element1.style.left = '' + (element2.offsetLeft + element2.offsetWidth / 2) + 'px';
      break;
    case 'left':
      element1.style.top = '' + element2.offsetTop + 'px';
      element1.style.left = '' + element2.offsetLeft + 'px';
      break;
  }
}

// Picks the best direction for showing element 1, given the available
// screen space in relation to element2.
function findAvailableDirectionsFor(element1, element2) {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var pixelsToRight = windowWidth - (element2.offsetLeft + element2.offsetWidth);
  var pixelsToBottom = windowHeight - (element2.offsetTop + element2.offsetHeight);
  var directions = [];
  if (element1.offsetWidth < element2.offsetLeft) directions.push('left');
  if (element1.offsetHeight < element2.offsetTop) directions.push('top');
  if (element1.offsetWidth < pixelsToRight) directions.push('right');
  if (element1.offsetWidth < pixelsToRight) directions.push('right');
  if (element1.offsetHeight < pixelsToBottom) directions.push('bottom');
  return directions;
}

function fitElement(element, relatedElement, direction) {
  var directions = findAvailableDirectionsFor(element, relatedElement);
  applyOffsetsToStyle(element, relatedElement, directions[0]);
}

module.exports = exports['default'];

},{}],2:[function(require,module,exports){
// Instructor
// ==========

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fitElement = require('./fit-element');

var _fitElement2 = _interopRequireDefault(_fitElement);

// The selector that elements need to carry in order to get the overlay. The
// value should be a unique key for the instructions object. See
// ./mock-instructions.js.
var selector = '[data-instructable]';

var overlayTemplate = function overlayTemplate() {
  var attributes = arguments[0] === undefined ? {} : arguments[0];

  return ('\n    <svg class="background-image">\n      <mask id="overlay-mask">\n          <rect fill="white" width="100%" height="100%"/>\n          <rect\n            y="' + attributes.top + '"\n            x="' + attributes.left + '"\n            height="' + attributes.height + '"\n            width="' + attributes.width + '"\n            fill="black"\n          />\n      </mask>\n      <rect mask="url(#overlay-mask)"\n      width="100%"\n      height="100%"\n      class="overlay-mask"\n      />\n    </svg>\n    <div class="instructable-wrapper">\n      <h1 class="heading">' + attributes.title + '</h1>\n      <div class="body-wrapper">' + attributes.body + '</div>\n      <menu class="menu">\n        <button class="more-button">More helpers</button>\n        <button class="exit-button">Exit</button>\n      </menu>\n    </div>\n  ').trim();
};

var Instructor = (function () {
  function Instructor(rootEl) {
    var options = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Instructor);

    this.rootEl = rootEl;
    this.instructables = this.findAllInstructables();
    this.instructions = options.instructions;
    this.index = 0;
    this._makeOverlayElement();
  }

  _createClass(Instructor, [{
    key: '_makeOverlayElement',
    value: function _makeOverlayElement() {
      this.overlayElement = document.createElement('div');
      this.overlayElement.classList.add('instructable-overlay');
      this.overlayElement.addEventListener('click', this._clickedOverlay.bind(this));
      window.addEventListener('resize', this.removeOverlay.bind(this), false);
    }
  }, {
    key: '_clickedOverlay',
    value: function _clickedOverlay(event) {
      event.stopPropagation();
      if (event.target.classList && event.target.classList.contains('more-button')) {
        this.showNextInstructable();
      } else {
        this.removeOverlay();
      }
    }
  }, {
    key: 'findAllInstructables',
    value: function findAllInstructables() {
      return [].slice.apply(this.rootEl.querySelectorAll(selector));
    }
  }, {
    key: 'showNextInstructable',
    value: function showNextInstructable() {
      var node = this.instructables[this.index];
      if (node) this.show(node);
      if (this.index >= this.instructables.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    }
  }, {
    key: 'show',
    value: function show(node) {
      var _this = this;

      var attributes = this.instructions[node.dataset.instructable];
      if (!attributes) {
        throw new Error('Instructor: No instructions found for ' + node.classList);
      }
      if (!this.overlayElement.parentNode) {
        this.rootEl.appendChild(this.overlayElement);
      }
      attributes.top = node.offsetTop;
      attributes.left = node.offsetLeft;
      attributes.width = node.offsetWidth;
      attributes.height = node.offsetHeight;
      this.overlayElement.innerHTML = overlayTemplate(attributes);
      setTimeout(function () {
        return _this.overlayElement.classList.add('visible');
      }, 1);
      var wrapperEl = this.overlayElement.querySelector('.instructable-wrapper');
      (0, _fitElement2['default'])(wrapperEl, node, 'left');
    }
  }, {
    key: 'removeOverlay',
    value: function removeOverlay() {
      var _this2 = this;

      if (!this.overlayElement.classList.contains('visible')) return false;
      if (this.overlayElement.parentNode) {
        this.overlayElement.classList.remove('visible');
        setTimeout(function () {
          _this2.overlayElement.parentNode.removeChild(_this2.overlayElement);
        }, 350);
      }
    }
  }]);

  return Instructor;
})();

exports['default'] = Instructor;

if (typeof exports !== 'undefined') window.Instructor = Instructor;
module.exports = exports['default'];

},{"./fit-element":1}]},{},[2]);
