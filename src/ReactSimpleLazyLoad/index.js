import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ReactSimpleLazyLoad.css';
console.log('styles', styles);

class ReactSimpleLazyLoad extends Component {
  static propTypes = {
    className: PropTypes.string
  }
  static defaultProps = {
    className: ''
  }
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      imageLoading: false,
      imageState: '',
      pItemClassName: `${styles.progressive} ${styles.replace}`,
      itemPreviewClassName: `${props.className} ${styles.preview}`,
      itemAppendClassName: `${props.className} ${styles.reveal}`
    }
  }
  componentDidMount() {
    this.init();
  }
  init = () => {
    const pItem = this._pItem;
    let timer;
    const vm = this;
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', scroller, false);
    inView();
    function scroller(e) {
      if (!vm.state.imageLoaded) {
        if (!vm.state.imageLoading) {
          // console.log('loadImage');
          timer = timer || setTimeout(() => {
            timer = null;
            requestAnimationFrame(inView);
            clearTimeout(timer);
          });
        }
      }
    }
    function inView() {
      var wT = window.pageYOffset, wB = wT + window.innerHeight, cRect, pT, pB;
      cRect = pItem.getBoundingClientRect();
      pT = wT + cRect.top;
      pB = pT + cRect.height;
      if (wT < pB && wB > pT) {
        vm.setState({
          imageLoading: true,
          imageState: 'append',
          pItemClassName: styles.progressive
        });
      }
    }
  }
  render() {
    const { full, tiny, className, alt, ...rest } = this.props;
    let kelas = className;
    if (this.state.imageState === 'append') {
      kelas += this.state.itemAppendClassName;
    }
    return (
      <div
        id={this.props.imageId}
        className={this.state.pItemClassName}
        ref={ref => (this._pItem = ref)}>
        {this.state.imageState !== 'revealed' &&
          <img
            src={tiny}
            alt={alt || ''}
            className={this.state.itemPreviewClassName}
            {...rest} />
        }
        {this.state.imageState !== '' &&
          <img
            src={full}
            onLoad={() => {
              const st = setTimeout(() => {
                this.setState({
                  imageLoaded: true,
                  imageLoading: false,
                  imageState: 'revealed'
                });
                clearTimeout(st);
              }, 300);
            }}
            alt={alt || ''}
            className={kelas}
            {...rest} />
        }
      </div>
    )
  }
}

export default ReactSimpleLazyLoad;
