import React from 'react';
import {View} from 'react-native';
import { scale } from '../../Themes/Scaling';

const Vertical = ({space = 0}: VerticalProps) => {
  return <View style={{paddingVertical: scale(space)}} />;
};
export interface VerticalProps {
  space?: number;
}
export default Vertical;
