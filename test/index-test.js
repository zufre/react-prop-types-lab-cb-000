import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Product from '../components/Product';

const ALL_PROPS_VALID = {
  name: 'Some product',
  producer: 'foo',
  hasWatermark: true,
  color: 'white',
  weight: 90,
};

let spy;

const ERRORS = {
  PROP_IS_REQUIRED: 'This prop should be required.',
  PROP_IS_OPTIONAL: 'This prop should be optional.',
  NOT_RIGHT_TYPE: 'This prop is not checking for the right type.',
};

function isInvalidPropTypeError(spy, propName) {
  if (!spy.called) {
    return false;
  }

  return spy.lastCall.args.find(arg => arg.includes(`Invalid prop \`${propName}\``)) !== undefined;
}

function isRequiredPropTypeError(spy, propName) {
  if (!spy.called) {
    return false;
  }

  return spy.lastCall.args.find(arg => arg.includes(`The prop \`${propName}\` is marked as required`)) !== undefined;
}

describe('<Product />', () => {
  beforeEach(function () {
    spy = sinon.spy();
    console.error = spy;
  });

  afterEach(function () {
    spy.reset();
  });

  describe('`name` prop', function () {
    it('should be required', function () {
      shallow(<Product {...ALL_PROPS_VALID} name={undefined} />);
      expect(isRequiredPropTypeError(spy, 'name')).toBeTruthy(ERRORS.PROP_IS_REQUIRED);
    });

    it('should have the right propType', function () {
      shallow(<Product {...ALL_PROPS_VALID} />);
      expect(spy.called).toBeFalsy(ERRORS.NOT_RIGHT_TYPE);
      shallow(<Product {...ALL_PROPS_VALID} name={5} />);
      expect(isInvalidPropTypeError(spy, 'name')).toBeTruthy(ERRORS.NOT_RIGHT_TYPE);
    });
  });

  describe('`producer` prop', function () {
    it('should be optional', function () {
      shallow(<Product {...ALL_PROPS_VALID} producer={undefined} />);
      expect(spy.called).toBeFalsy(ERRORS.PROP_IS_OPTIONAL);
    });

    it('should have the right propType', function () {
      shallow(<Product {...ALL_PROPS_VALID} producer="foo" />);
      expect(spy.called).toBeFalsy(ERRORS.NOT_RIGHT_TYPE);
      shallow(<Product {...ALL_PROPS_VALID} producer={5} />);
      expect(isInvalidPropTypeError(spy, 'producer')).toBeTruthy(ERRORS.NOT_RIGHT_TYPE);
    });
  });

  describe('`hasWatermark` prop', function () {
    it('should have a default value', function () {
      expect(Product.defaultProps.hasWatermark).toEqual(false, 'This prop does not have a default value, or not the right one.');
    });

    it('should be optional', function () {
      shallow(<Product {...ALL_PROPS_VALID} hasWatermark={undefined} />);
      expect(spy.called).toBeFalsy(ERRORS.PROP_IS_OPTIONAL);
    });

    it('should have the right propType', function () {
      shallow(<Product {...ALL_PROPS_VALID} hasWatermark={false} />);
      expect(spy.called).toBeFalsy(ERRORS.NOT_RIGHT_TYPE);
      shallow(<Product {...ALL_PROPS_VALID} hasWatermark="foo" />);
      expect(isInvalidPropTypeError(spy, 'hasWatermark')).toBeTruthy(ERRORS.NOT_RIGHT_TYPE);
    });
  });

  describe('`color` prop', function () {
    it('should be required', function () {
      shallow(<Product {...ALL_PROPS_VALID} color={undefined} />);
      expect(isRequiredPropTypeError(spy, 'color')).toBeTruthy(ERRORS.PROP_IS_REQUIRED);
    });

    it('should only allow the right values', function () {
      shallow(<Product {...ALL_PROPS_VALID} color={'white'} />);
      expect(spy.called).toBeFalsy('The `color` propType is not accepting a valid value.');
      shallow(<Product {...ALL_PROPS_VALID} color={'somethingelse'} />);
      expect(spy.callCount).toEqual(1, 'The `color` propType is accepting an invalid value.');
      shallow(<Product {...ALL_PROPS_VALID} color={5} />);
      expect(spy.callCount).toEqual(2, 'The `color` propType is accepting an invalid value.');
    });
  });

  describe('`weight` prop', function () {
    it('should be required', function () {
      shallow(<Product {...ALL_PROPS_VALID} weight={undefined} />);
      expect(spy.called).toBeTruthy('The `weight` prop validator does not validate the value as being required.');
    });

    it('should be a number', function () {
      shallow(<Product {...ALL_PROPS_VALID} />);
      expect(spy.called).toBeFalsy('The `weight` prop validator does not accept a valid number.');
      shallow(<Product {...ALL_PROPS_VALID} weight="notanumber" />);
      expect(spy.called).toBeTruthy('The `weight` prop validator is accepting types other than a number.');
    });

    it('should range between 80 and 300', function () {
      shallow(<Product {...ALL_PROPS_VALID} />);
      expect(spy.called).toBeFalsy('The `weight` prop validator does not check for the weight ranging between 80 and 300.');
      shallow(<Product {...ALL_PROPS_VALID} weight={10} />);
      expect(spy.called).toBeTruthy('The `weight` prop validator does not check for the weight ranging between 80 and 300.');
      shallow(<Product {...ALL_PROPS_VALID} weight={500} />);
      expect(spy.called).toBeTruthy('The `weight` prop validator does not check for the weight ranging between 80 and 300.');
    });
  });
});
