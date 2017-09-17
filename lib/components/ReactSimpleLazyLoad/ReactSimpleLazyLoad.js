'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReactSimpleLazyLoad = require('./ReactSimpleLazyLoad.css');

var _ReactSimpleLazyLoad2 = _interopRequireDefault(_ReactSimpleLazyLoad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('styles', _ReactSimpleLazyLoad2.default);

var ReactSimpleLazyLoad = function (_Component) {
  (0, _inherits3.default)(ReactSimpleLazyLoad, _Component);

  function ReactSimpleLazyLoad(props) {
    (0, _classCallCheck3.default)(this, ReactSimpleLazyLoad);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReactSimpleLazyLoad.__proto__ || (0, _getPrototypeOf2.default)(ReactSimpleLazyLoad)).call(this, props));

    _this.init = function () {
      var pItem = _this._pItem;
      var timer = void 0;
      var vm = _this;
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
    };

    _this.state = {
      imageLoaded: false,
      imageLoading: false,
      imageState: '',
      pItemClassName: _ReactSimpleLazyLoad2.default.progressive + ' ' + _ReactSimpleLazyLoad2.default.replace,
      itemPreviewClassName: props.className + ' ' + _ReactSimpleLazyLoad2.default.preview,
      itemAppendClassName: props.className + ' ' + _ReactSimpleLazyLoad2.default.reveal
    };
    return _this;
  }

  (0, _createClass3.default)(ReactSimpleLazyLoad, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.init();
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
          rest = (0, _objectWithoutProperties3.default)(_props, ['full', 'tiny', 'className', 'alt']);

      var kelas = className;
      if (this.state.imageState === 'append') {
        kelas += this.state.itemAppendClassName;
      }
      return _react2.default.createElement(
        'div',
        {
          id: this.props.imageId,
          className: this.state.pItemClassName,
          ref: function ref(_ref) {
            return _this2._pItem = _ref;
          } },
        this.state.imageState !== 'revealed' && _react2.default.createElement('img', (0, _extends3.default)({
          src: tiny,
          alt: alt || '',
          className: this.state.itemPreviewClassName
        }, rest)),
        this.state.imageState !== '' && _react2.default.createElement('img', (0, _extends3.default)({
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
}(_react.Component);

ReactSimpleLazyLoad.propTypes = {
  className: _propTypes2.default.string
};
ReactSimpleLazyLoad.defaultProps = {
  className: ''
};
exports.default = ReactSimpleLazyLoad;
module.exports = exports['default'];