import React from 'react';
import PropTypes from 'prop-types';
import { Picker, View, Text } from 'react-native';

const TextBox = ({
  field: { value, name },
  form: { touched, errors, setFieldValue },
  items,
  placeholder,
  ...props
}) => (
  <View>
    <Picker
      selectedValue={value}
      style={{ height: 50, width: 100 }}
      onValueChange={itemValue => setFieldValue(name, itemValue)}
      {...props}
    >
      {placeholder && <Picker.Item label={placeholder} value="" />}
      {items.map(x => (
        <Picker.Item key={x.value} label={x.label} value={x.value} />
      ))}
    </Picker>
    {touched[name] && errors[name] && <Text className="error">{errors[name]}</Text>}
  </View>
);

TextBox.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
};

TextBox.defaultProps = {
  placeholder: '',
};

export default TextBox;
