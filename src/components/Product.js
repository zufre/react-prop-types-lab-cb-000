import React from 'react';
import PropTypes from 'prop-types';

export default class Product extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <ul>
          <li>{this.props.producer}</li>
          <li>{this.props.hasWatermark}</li>
          <li>{this.props.color}</li>
          <li>{this.props.weight}</li>
        </ul>
      </div>
    )
  }
}
Product.defaultProps = {
  hasWatermark: false
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  producer: PropTypes.string,
  hasWatermark: PropTypes.bool,
  color: PropTypes.oneOf(['white','eggshell-white','salmon']).isRequired,
  weight: (props, propName, componentName) => {
    if (props[propName] === undefined) {
      return new Error('A weight value is required')
    }else if (isNaN(props[propName])) {
      return new Error('The weight is not a number')
    }else if (props[propName] < 80 || props[propName] > 300) {
      return new Error('Value has to be between 80 and 300')
    }
  }
}
