import React from 'react';
import { shallow } from 'enzyme';
import { Stack } from '@mui/material';
import Loader from './Loader';

describe('<Loader />', () => {
  it('renders a Stack component with a direction of row', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.find(Stack).prop('direction')).toEqual('row');
  });

  it('renders a Stack component with justifyContent set to center', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.find(Stack).prop('justifyContent')).toEqual('center');
  });

  it('renders a Stack component with alignItems set to center', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.find(Stack).prop('alignItems')).toEqual('center');
  });

  it('renders an InfinitySpin component with a color prop set to gray', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper.find(InfinitySpin).prop('color')).toEqual('gray');
  });
});
