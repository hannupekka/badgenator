// @flow
import styles from 'styles/containers/Index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Map } from 'immutable';
import Badge from 'components/Badge';
import ColorPicker from 'components/ColorPicker';
import * as UiActions from 'redux/modules/ui';
import CSSModules from 'react-css-modules';

type Props = {
  ui: Map<string, any>,
  changeLogo: Function
}

// eslint-disable-next-line
class Index extends Component {
  props: Props;

  bindUrl: Function;
  url: HTMLInputElement;

  constructor(props: Object) {
    super(props);

    this.bindUrl = (c) => (this.url = c);
  }

  changeLogo = (): void => {
    const url = this.url.value;
    this.props.changeLogo(url);
  }

  render() {
    const { ui } = this.props;
    const { bindUrl, changeLogo } = this;

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
            <div styleName="option__group">
              <div styleName="option__label">
                Logo URL
              </div>
              <input
                type="text"
                styleName="input"
                value={ui.get('logoUrl')}
                ref={bindUrl}
                onChange={changeLogo}
              />
            </div>
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
  changeLogo: UiActions.changeLogo
};

export default connect(
  mapState,
  mapActions
)(CSSModules(Index, styles));
