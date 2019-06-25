/* eslint-disable no-restricted-syntax */
import React, { memo } from 'react';
import { View, Text, ViewPropTypes } from 'react-native';
import cs from '../commonStyles';

const renderObject = props => {
  const data = [];
  for (const [key, value] of Object.entries(props)) {
    data.push(
      <Text key={key} style={[cs.title, { color: '#000' }]}>
        {value}
      </Text>,
    );
  }
  return data;
};

const index = ({ id, authorId, ...props }) => {
  return <View style={[cs.container, cs.shadow]}>{renderObject(props)}</View>;
};

index.propTypes = {};

index.defaultProps = {};

export default memo(index);
