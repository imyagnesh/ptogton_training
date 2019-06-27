import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  Text,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import * as Yup from 'yup';
import { TextBox, Select } from 'components';
import Courses from './screen/courses/courses';
import Close from './assets/icons/close.svg';
import Form from './Form';
import { LocaleProvider } from './context/localeContext';
import * as types from './constants/actionTypes';

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
class App extends Component {
  static propTypes = {
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired,
    authorsLoading: PropTypes.bool.isRequired,
    coursesLoading: PropTypes.bool.isRequired,
    authorsError: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    coursesError: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    updateCourse: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
  };

  static defaultProps = {
    authorsError: null,
    coursesError: null,
  };

  state = {
    open: false,
    form: initialValues,
    formData: null,
    locale: 'en',
    changeLocale: val => this.changeLocale(val),
  };

  constructor(props) {
    super(props);
    const { loadAuthors, loadCourses } = props;
    loadAuthors();
    loadCourses();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { authors } = nextProps;

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
    return {
      ...prevState,
      formData,
    };
  }

  changeLocale = val => {
    this.setState({ locale: val ? 'en' : 'es' });
  };

  toggleModal = () => {
    this.setState(state => {
      return { open: !state.open };
    });
  };

  onSubmit = async (values, actions) => {
    try {
      if (values.id) {
        const { updateCourse } = this.props;
        updateCourse(values);
      } else {
        const { saveCourse } = this.props;
        saveCourse(values);
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
    const { open, form, formData, locale, changeLocale } = this.state;
    const {
      courses,
      authors,
      authorsLoading,
      coursesLoading,
      authorsError,
      coursesError,
    } = this.props;

    return (
      <LocaleProvider value={{ locale, changeLocale }}>
        <SafeAreaView>
          {(authorsLoading || coursesLoading) && <ActivityIndicator animating size="large" />}
          {!!authorsError && <Text>{authorsError.message}</Text>}
          {!!coursesError && <Text>{coursesError.message}</Text>}
          <Button title="Add Course" onPress={this.onAddCourse} />
          {!!courses && !!authors && (
            <Courses courses={courses} authors={authors} onEdit={this.onEdit} />
          )}
          <Modal animated visible={open} onDismiss={() => {}}>
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
      </LocaleProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    authorsLoading: !!state.loading[`${types.FETCH}_${types.AUTHORS}`],
    coursesLoading: !!state.loading[`${types.FETCH}_${types.COURSES}`],
    authorsError: state.error[`${types.FETCH}_${types.AUTHORS}`],
    coursesError: state.error[`${types.FETCH}_${types.COURSES}`],
    authors: state.authors,
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAuthors: () => dispatch({ type: `${types.FETCH}_${types.AUTHORS}_${types.REQUEST}` }),
    loadCourses: () => dispatch({ type: `${types.FETCH}_${types.COURSES}_${types.REQUEST}` }),
    saveCourse: payload =>
      dispatch({ type: `${types.SAVE}_${types.COURSES}_${types.REQUEST}`, payload }),
    updateCourse: payload =>
      dispatch({ type: `${types.UPDATE}_${types.COURSES}_${types.REQUEST}`, payload }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
