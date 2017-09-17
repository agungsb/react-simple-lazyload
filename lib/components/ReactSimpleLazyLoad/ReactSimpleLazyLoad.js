'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReactSimpleLazyLoad = require('./ReactSimpleLazyLoad.css');

var _ReactSimpleLazyLoad2 = _interopRequireDefault(_ReactSimpleLazyLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactSimpleLazyLoad = function (_React$Component) {
  _inherits(ReactSimpleLazyLoad, _React$Component);

  function ReactSimpleLazyLoad(props) {
    _classCallCheck(this, ReactSimpleLazyLoad);

    var _this = _possibleConstructorReturn(this, (ReactSimpleLazyLoad.__proto__ || Object.getPrototypeOf(ReactSimpleLazyLoad)).call(this, props));

    _this.state = {
      imageLoaded: false,
      imageLoading: false,
      imageState: '',
      pItemClassName: _ReactSimpleLazyLoad2.default.progressive + ' ' + _ReactSimpleLazyLoad2.default.replace,
      itemPreviewClassName: props.className + ' ' + _ReactSimpleLazyLoad2.default.preview,
      itemAppendClassName: props.className + ' ' + _ReactSimpleLazyLoad2.default.reveal
    };
    _this.init = _this._init.bind(_this);
    return _this;
  }

  _createClass(ReactSimpleLazyLoad, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
    }
  }, {
    key: '_init',
    value: function _init() {
      var pItem = this._pItem;
      var timer = void 0;
      var vm = this;
      window.addEventListener('scroll', scroller, false);
      window.addEventListener('resize', scroller, false);
      inView();
      function scroller(e) {
        if (!vm.state.imageLoaded) {
          if (!vm.state.imageLoading) {
            // console.log('loadImage');
            timer = timer || setTimeout(function () {
              timer = null;
              requestAnimationFrame(inView);
              clearTimeout(timer);
            });
          }
        }
      }
      function inView() {
        var wT = window.pageYOffset,
            wB = wT + window.innerHeight,
            cRect,
            pT,
            pB;
        cRect = pItem.getBoundingClientRect();
        pT = wT + cRect.top;
        pB = pT + cRect.height;
        if (wT < pB && wB > pT) {
          vm.setState({
            imageLoading: true,
            imageState: 'append',
            pItemClassName: _ReactSimpleLazyLoad2.default.progressive
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          full = _props.full,
          tiny = _props.tiny,
          className = _props.className,
          alt = _props.alt,
          rest = _objectWithoutProperties(_props, ['full', 'tiny', 'className', 'alt']);

      var kelas = className;
      if (this.state.imageState === 'append') {
        kelas += this.state.itemAppendClassName;
      }
      return _react2.default.createElement(
        'div',
        {
          className: this.state.pItemClassName,
          ref: function ref(_ref) {
            return _this2._pItem = _ref;
          } },
        this.state.imageState !== 'revealed' && _react2.default.createElement('img', _extends({
          src: tiny,
          alt: alt || '',
          className: this.state.itemPreviewClassName
        }, rest)),
        this.state.imageState !== '' && _react2.default.createElement('img', _extends({
          src: full,
          onLoad: function onLoad() {
            var st = setTimeout(function () {
              _this2.setState({
                imageLoaded: true,
                imageLoading: false,
                imageState: 'revealed'
              });
              clearTimeout(st);
            }, 300);
          },
          alt: alt || '',
          className: kelas
        }, rest))
      );
    }
  }]);

  return ReactSimpleLazyLoad;
}(_react2.default.Component);

ReactSimpleLazyLoad.defaultProps = {
  className: ''
};


ReactSimpleLazyLoad.propTypes = {
  className: _propTypes2.default.string,
  full: _propTypes2.default.string.isRequired,
  tiny: _propTypes2.default.string.isRequired,
  style: _propTypes2.default.object
};

ReactSimpleLazyLoad.defaultProps = {
  className: '',
  style: {}
};

exports.default = ReactSimpleLazyLoad;