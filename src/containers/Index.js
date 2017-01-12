// @flow
import styles from 'styles/containers/Index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Badge from 'components/Badge';
import CSSModules from 'react-css-modules';

type Props = {
}

class Index extends Component {
  props: Props;

  render() {
    return (
      <div>
        <div styleName="top">
          <div styleName="options">
            <div styleName="option__group">
              <div styleName="option__label">Header background color</div>
            </div>
            <div styleName="option__group">
              <div styleName="option__label">Header text color</div>
            </div>
            <div styleName="option__group">
              <div styleName="option__label">Name color</div>
            </div>
            <div styleName="option__group">
              <div styleName="option__label">Footer background color</div>
            </div>
            <div styleName="option__group">
              <div styleName="option__label">Footer text color</div>
            </div>
          </div>
          <div styleName="preview">
            <Badge
              headerText="Header text"
              firstname="First name"
              lastname="Last name"
              footerText="Footer text"
            />
          </div>
        </div>
        <div styleName="data">
          <textarea styleName="textarea"></textarea>
        </div>
        <div styleName="output">
          output
        </div>
      </div>
    );
  }
}

Index.propTypes = {
};

const mapState = () => ({
});

const mapActions = {
};

export default connect(
  mapState,
  mapActions
)(CSSModules(Index, styles));
