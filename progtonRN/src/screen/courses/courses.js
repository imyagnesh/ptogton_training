import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'components';
import { connect } from 'react-redux';
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import { LocaleConsumer } from '../../context/localeContext';

class coursesPage extends PureComponent {
  static propTypes = {
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    xyz: PropTypes.string.isRequired,
    changeLocale: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { changeLocale } = this.props;
    changeLocale();
  }

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
              <LocaleConsumer>
                {value => (
                  <ListItem
                    author={this.renderAuthor(x.authorId)}
                    value={value.locale === 'en'}
                    changeLocale={val => {
                      value.changeLocale(val);
                    }}
                    {...x}
                  />
                )}
              </LocaleConsumer>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    xyz: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: () => dispatch({ type: 'CHANGE_LOCALE', payload: 'ES' }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(coursesPage);
