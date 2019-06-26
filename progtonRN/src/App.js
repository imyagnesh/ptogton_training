import React, { Component } from 'react';
import { Button, SafeAreaView, Modal, TouchableWithoutFeedback, Text } from 'react-native';
import * as Yup from 'yup';
import Config from 'react-native-config';
import { TextBox, Select } from 'components';
import Courses from './screen/courses/courses';
import Close from './assets/icons/close.svg';
import Form from './Form';
import { API } from './utils';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  length: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  watchHref: Yup.string().required('Required'),
});

const initialValues = {
  title: '',
  length: '',
  category: '',
  watchHref: '',
  authorId: '',
};
export default class App extends Component {
  state = {
    open: false,
    form: initialValues,
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
        API({ url: `${Config.API_URL}courses` }),
        API({ url: `${Config.API_URL}authors` }),
      ]);
      this.setState({ courses: res[0], authors: res[1] });
    } catch (error) {
      this.setState({ error });
    }
  };

  toggleModal = () => {
    this.setState(state => {
      return { open: !state.open };
    });
  };

  onSubmit = async (values, actions) => {
    try {
      let url = 'http://localhost:3004/courses';
      if (values.id) {
        url = `http://localhost:3004/courses/${values.id}`;
      }

      const course = await API({ url, method: values.id ? 'PUT' : 'POST', body: values });
      if (values.id) {
        this.setState(state => {
          const { courses } = this.state;
          const index = courses.findIndex(x => x.id === values.id);
          return {
            courses: [...state.courses.slice(0, index), course, ...state.courses.slice(index + 1)],
          };
        });
      } else {
        this.setState(state => {
          return { courses: [...state.courses, course] };
        });
      }
      this.toggleModal();
      actions.resetForm();
    } catch (error) {
      actions.setErrors({ general: error.message });
    } finally {
      actions.setSubmitting(false);
    }
  };

  onEdit = form => {
    this.setState({ form });
    this.toggleModal();
  };

  onAddCourse = () => {
    this.setState({ form: initialValues });
    this.toggleModal();
  };

  render() {
    const { open, form, courses, authors, error, formData } = this.state;
    if (error) {
      return <Text>{error.message}</Text>;
    }
    return (
      <SafeAreaView>
        <Button title="Add Course" onPress={this.onAddCourse} />
        <Courses courses={courses} authors={authors} onEdit={this.onEdit} />
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
