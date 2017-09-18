Lazyload your image element to improve performance.
 
## Installation

```
$ npm install --save react-simple-lazyload
```

## Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactSimpleLazyLoad as Image } from 'react-simple-lazyload';

const App = () => {
  return (
    <div className="whatever-container">
        <Image 
          alt="Tiger"
          full="tiger.jpg" 
          tiny="tiger_tiny.jpg" 
          className="whatever-image" 
          style={{ width: '100%' }}
          onError={event => {
            event.currentTarget.src = 'tiger_fail.jpg';
          }}/>
    </div>
  );
};

ReactDOM.render(<App />, document.body);
```

## How It Works

You should aware that your component will only show the original image when it's visible in viewport, before that a placeholder will be displayed. Once the component is visible in the viewport, your component will perform its magic.

## Props

### full

Type: String Default: undefined IsRequired: true

The source of your original image.

### tiny

Type: String Default: undefined IsRequired: true

The source of your placeholder image.

### style

Type: Object Default: undefined IsRequired: false

Pass custom styles as props.

### usecssmodules
Type: Bool, Default: false IsRequired: false

Set to true if you are using CSS modules.

### alt, onError, etc.

Type: Any Default: undefined IsRequired: false

The rest of `image's` element attributes.

## Component Styles

You can find the styles in `lib/components/ReactSimpleLazyLoad/ReactSimpleLazyLoad.css` and insert it to your project. Or if you are already using `CSS Modules`, you can pass `usecssmodules` props to the component.


## License

MIT
