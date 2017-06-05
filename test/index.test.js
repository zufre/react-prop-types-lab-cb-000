import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Product from '../src/components/Product';

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
  beforeEach(() => {
    spy = sinon.spy();
    console.error = spy;
  });

  afterEach(() => {
    spy.reset();
  });

  describe('`name` prop', () => {
    it('should be required', () => {
      shallow(<Product {...ALL_PROPS_VALID} name={undefined} />);
      expect(isRequiredPropTypeError(spy, 'name'), ERRORS.PROP_IS_REQUIRED).to.be.true;
    });

    it('should have the right propType', () => {
      shallow(<Product {...ALL_PROPS_VALID} />);
      expect(spy.called, ERRORS.NOT_RIGHT_TYPE).to.be.false;
      shallow(<Product {...ALL_PROPS_VALID} name={5} />);
      expect(isInvalidPropTypeError(spy, 'name'), ERRORS.NOT_RIGHT_TYPE).to.be.true;
    });
  });

  describe('`producer` prop', () => {
    it('should be optional', () => {
      shallow(<Product {...ALL_PROPS_VALID} producer={undefined} />);
      expect(spy.called, ERRORS.PROP_IS_OPTIONAL).to.be.false;
    });

    it('should have the right propType', () => {
      shallow(<Product {...ALL_PROPS_VALID} producer="foo" />);
      expect(spy.called, ERRORS.NOT_RIGHT_TYPE).to.be.false;
      shallow(<Product {...ALL_PROPS_VALID} producer={5} />);
      expect(isInvalidPropTypeError(spy, 'producer'), ERRORS.NOT_RIGHT_TYPE).to.be.true;
    });
  });

  describe('`hasWatermark` prop', () => {
    it('should have a default value', () => {
      expect(Product.defaultProps.hasWatermark).to.equal(false, 'This prop does not have a default value, or not the right one.');
    });

    it('should be optional', () => {
      shallow(<Product {...ALL_PROPS_VALID} hasWatermark={undefined} />);
      expect(spy.called, ERRORS.PROP_IS_OPTIONAL).to.be.false;
    });

    it('should have the right propType', () => {
      shallow(<Product {...ALL_PROPS_VALID} hasWatermark={false} />);
      expect(spy.called, ERRORS.NOT_RIGHT_TYPE).to.be.false;
      shallow(<Product {...ALL_PROPS_VALID} hasWatermark="foo" />);
      expect(isInvalidPropTypeError(spy, 'hasWatermark'), ERRORS.NOT_RIGHT_TYPE).to.be.true;
    });
  });

  describe('`color` prop', () => {
    it('should be required', () => {
      shallow(<Product {...ALL_PROPS_VALID} color={undefined} />);
      expect(isRequiredPropTypeError(spy, 'color'), ERRORS.PROP_IS_REQUIRED).to.be.true;
    });

    it('should only allow the right values', () => {
      shallow(<Product {...ALL_PROPS_VALID} color={'white'} />);
      expect(spy.called, 'The `color` propType is not accepting a valid value.').to.be.false;
      shallow(<Product {...ALL_PROPS_VALID} color={'somethingelse'} />);
      expect(spy.callCount).to.equal(1, 'The `color` propType is accepting an invalid value.');
      shallow(<Product {...ALL_PROPS_VALID} color={5} />);
      expect(spy.callCount).to.equal(2, 'The `color` propType is accepting an invalid value.');
    });
  });

  describe('`weight` prop', () => {
    it('should be required', () => {
      shallow(<Product {...ALL_PROPS_VALID} weight={undefined} />);
      expect(spy.called, 'The `weight` prop validator does not validate the value as being required.').to.be.true;
    });

    it('should be a number', () => {
      shallow(<Product {...ALL_PROPS_VALID} />);
      expect(spy.called, 'The `weight` prop validator does not accept a valid number.').to.be.false;
      shallow(<Product {...ALL_PROPS_VALID} weight="notanumber" />);
      expect(spy.called, 'The `weight` prop validator is accepting types other than a number.').to.be.true;
    });

    it('should range between 80 and 300', () => {
      shallow(<Product {...ALL_PROPS_VALID} />);
      expect(spy.called, 'The `weight` prop validator does not check for the weight ranging between 80 and 300.').to.be.false;
      shallow(<Product {...ALL_PROPS_VALID} weight={10} />);
      expect(spy.called, 'The `weight` prop validator does not check for the weight ranging between 80 and 300.').to.be.true;
      shallow(<Product {...ALL_PROPS_VALID} weight={500} />);
      expect(spy.called, 'The `weight` prop validator does not check for the weight ranging between 80 and 300.').to.be.true;
    });
  });
});
