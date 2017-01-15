// @flow
import styles from 'styles/containers/Index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Map } from 'immutable';
import Badge from 'components/Badge';
import ColorPicker from 'components/ColorPicker';
import CSSModules from 'react-css-modules';

type Props = {
  ui: Map<string, any>
}

// eslint-disable-next-line
class Index extends Component {
  props: Props;

  render() {
    const { ui } = this.props;

    return (
      <div>
        <div styleName="top">
          <div styleName="options">
            <ColorPicker
              color={ui.get('headerBackground')}
              colorName="headerBackground"
            >
              Header background color
            </ColorPicker>
            <ColorPicker
              color={ui.get('headerText')}
              colorName="headerText"
            >
              Header text color
            </ColorPicker>
            <ColorPicker
              color={ui.get('nameBackground')}
              colorName="nameBackground"
            >
              Name background color
            </ColorPicker>
            <ColorPicker
              color={ui.get('nameText')}
              colorName="nameText"
            >
              Name text color
            </ColorPicker>
            <ColorPicker
              color={ui.get('footerBackground')}
              colorName="footerBackground"
            >
              Footer background color
            </ColorPicker>
            <ColorPicker
              color={ui.get('footerText')}
              colorName="footerText"
            >
              Footer text color
            </ColorPicker>
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

const mapState = state => ({
  ui: state.ui
});

const mapActions = {
};

export default connect(
  mapState,
  mapActions
)(CSSModules(Index, styles));
