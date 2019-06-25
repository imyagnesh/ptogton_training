import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'components';
import { ScrollView } from 'react-native';

export default class coursesPage extends PureComponent {
  static propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
  };

  renderAuthor = id => {
    const { authors } = this.props;

    const author = authors.find(x => x.id === id);
    if (author) {
      return `${author.firstName} ${author.lastName}`;
    }
    return '';
  };

  render() {
    const { courses } = this.props;

    return (
      <ScrollView>
        {courses.map(x => (
          <ListItem key={x.id} author={this.renderAuthor(x.authorId)} {...x} />
        ))}
      </ScrollView>
    );
  }
}
