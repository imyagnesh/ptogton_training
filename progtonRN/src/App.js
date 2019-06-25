import React, { Component } from 'react';
import { Button, SafeAreaView, Modal, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';
import { TextBox } from 'components';
import Courses from './screen/courses/courses';
import Close from './assets/icons/close.svg';
import Form from './Form';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  length: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  watchHref: Yup.string().required('Required'),
});

const formData = [
  {
    name: 'title',
    component: TextBox,
    placeholder: 'Enter Title',
  },
  {
    name: 'length',
    component: TextBox,
    placeholder: 'Enter length',
  },
  {
    name: 'category',
    component: TextBox,
    placeholder: 'Enter category',
  },
  {
    name: 'watchHref',
    component: TextBox,
    placeholder: 'Enter watchHref',
  },
];

export default class App extends Component {
  state = {
    open: false,
    form: {
      title: '',
      length: '',
      category: '',
      watchHref: '',
      authorId: '',
    },
  };

  toggleModal = () => {
    this.setState(state => {
      return { open: !state.open };
    });
  };

  onSubmit = values => {
    console.warn('values', values);
  };

  render() {
    const { open, form } = this.state;
    return (
      <SafeAreaView>
        <Button title="Add Course" onPress={this.toggleModal} />
        <Courses />
        <Modal animated visible={open}>
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={this.toggleModal}>
              <Close width={24} height={24} />
            </TouchableWithoutFeedback>
            <Form
              initialValues={form}
              onSubmit={this.onSubmit}
              validationSchema={validationSchema}
              formData={formData}
            />
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
  }
}
