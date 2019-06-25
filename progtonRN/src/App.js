import React, { Component } from 'react';
import { Button, SafeAreaView, Modal, TouchableWithoutFeedback, Text } from 'react-native';
import * as Yup from 'yup';
import Config from 'react-native-config';
import { TextBox, Select } from 'components';
import Courses from './screen/courses/courses';
import Close from './assets/icons/close.svg';
import Form from './Form';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  length: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  watchHref: Yup.string().required('Required'),
});

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
    courses: [],
    authors: [],
    error: false,
    formData: null,
  };

  async componentDidMount() {
    await this.fetchData();

    const { authors } = this.state;

    const items = authors.map(x => ({ label: `${x.firstName} ${x.lastName}`, value: x.id }));

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
      {
        name: 'authorId',
        component: Select,
        items,
        placeholder: 'Select Author',
      },
    ];

    this.setState({ formData });
  }

  fetchData = async () => {
    try {
      const res = await Promise.all([
        fetch(`${Config.API_URL}courses`),
        fetch(`${Config.API_URL}authors`),
      ]);
      const data = await Promise.all([res[0].json(), res[1].json()]);
      this.setState({ courses: data[0], authors: data[1] });
    } catch (error) {
      this.setState({ error });
    }
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
    const { open, form, courses, authors, error, formData } = this.state;
    if (error) {
      return <Text>{error.message}</Text>;
    }
    return (
      <SafeAreaView>
        <Button title="Add Course" onPress={this.toggleModal} />
        <Courses courses={courses} authors={authors} />
        <Modal animated visible={open}>
          <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={this.toggleModal}>
              <Close width={24} height={24} />
            </TouchableWithoutFeedback>
            {formData && (
              <Form
                initialValues={form}
                onSubmit={this.onSubmit}
                validationSchema={validationSchema}
                formData={formData}
              />
            )}
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
  }
}
