/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';
import { Formik, Field } from 'formik';

const Form = ({ formData, ...props }) => {
  return (
    <Formik {...props}>
      {({ handleSubmit }) => {
        return (
          <View style={{ flex: 1 }}>
            <Text>Add Course</Text>
            {formData.map(x => (
              <Field key={x.name} {...x} />
            ))}
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        );
      }}
    </Formik>
  );
};

Form.propTypes = {
  formData: PropTypes.array.isRequired,
};

export default Form;
