import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'components';
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native';

export default class coursesPage extends PureComponent {
  static propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
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
    const { courses, onEdit } = this.props;

    return (
      <ScrollView>
        {courses.map(x => (
          <TouchableWithoutFeedback key={x.id} onPress={() => onEdit(x)}>
            <View>
              <ListItem author={this.renderAuthor(x.authorId)} {...x} />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    );
  }
}
