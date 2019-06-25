import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import Config from 'react-native-config';
import { ListItem } from 'components';
import { Text, ScrollView } from 'react-native';

export default class coursesPage extends PureComponent {
  static propTypes = {};

  state = { courses: [], authors: [], error: false };

  componentDidMount() {
    this.fetchData();
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

  renderAuthor = id => {
    const { authors } = this.state;

    const author = authors.find(x => x.id === id);
    if (author) {
      return `${author.firstName} ${author.lastName}`;
    }
    return '';
  };

  render() {
    const { courses, error } = this.state;

    if (error) {
      return <Text>{error.message}</Text>;
    }
    return (
      <ScrollView>
        {courses.map(x => (
          <ListItem key={x.id} author={this.renderAuthor(x.authorId)} {...x} />
        ))}
      </ScrollView>
    );
  }
}
