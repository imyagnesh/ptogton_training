import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text } from 'react-native';

const TextBox = ({ field, form: { touched, errors, handleChange, handleBlur }, ...props }) => (
  <View>
    <TextInput
      onChangeText={handleChange(field.name)}
      onBlur={handleBlur(field.name)}
      {...field}
      {...props}
    />
    {touched[field.name] && errors[field.name] && (
      <Text className="error">{errors[field.name]}</Text>
    )}
  </View>
);

TextBox.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

export default TextBox;
