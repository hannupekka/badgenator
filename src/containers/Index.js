// @flow
import styles from 'styles/containers/Index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Map } from 'immutable';
import cuid from 'cuid';
import Badge from 'components/Badge';
import ColorPicker from 'components/ColorPicker';
import * as DataActions from 'redux/modules/data';
import * as UiActions from 'redux/modules/ui';
import CSSModules from 'react-css-modules';

type Props = {
  data: Map<string, any>,
  ui: Map<string, any>,
  changeLogo: Function,
  setNames: Function
}

// eslint-disable-next-line
class Index extends Component {
  props: Props;

  bindNames: Function;
  names: HTMLInputElement;
  bindUrl: Function;
  url: HTMLInputElement;

  constructor(props: Object) {
    super(props);

    this.bindNames = (c) => (this.names = c);
    this.bindUrl = (c) => (this.url = c);
  }

  changeLogo = (): void => {
    const url = this.url.value;
    this.props.changeLogo(url);
  }

  maybeRenderBadges = (): ElementType => {
    const { data } = this.props;
    const names = data.get('names');

    if (names.size === 0) {
      return <div>Fill in data and generate badges with button above.</div>;
    }

    return names.map(name => (
      <Badge
        key={cuid()}
        headerText={name.get('headerText')}
        firstname={name.get('firstname')}
        lastname={name.get('lastname')}
        footerText={name.get('footerText')}
      />
    )).toJS();
  }

  maybeRenderPrintButton = (): ?ElementType => {
    const { data } = this.props;

    if (data.get('names').size === 0) {
      return null;
    }

    return (
      <button styleName="button" onClick={window.print}>
        <i className="fa fa-print" aria-hidden="true"></i>
        Print
      </button>
    );
  }

  setNames = (): void => {
    const { data } = this.props;

    const inputValue = this.names.value;

    if (inputValue.length === 0) {
      return;
    }

    const input = inputValue.split('\n');
    if (input.length === 0) {
      return;
    }

    const names = input.map(name => {
      const [headerText, firstname, lastname, footerText] = name.split(data.get('separator'));
      return {
        headerText,
        firstname,
        lastname,
        footerText
      };
    });

    if (names.length === 0) {
      return;
    }

    this.props.setNames(names);
  }

  render() {
    const { ui } = this.props;
    const {
      bindNames,
      bindUrl,
      changeLogo,
      maybeRenderBadges,
      maybeRenderPrintButton,
      setNames
    } = this;

    return (
      <div>
        <div styleName="top">
          <div styleName="options">
            <h2 styleName="title--top">Colors</h2>
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
            <h2 styleName="title--top">Preview</h2>
            <Badge
              headerText="Header text"
              firstname="First name"
              lastname="Last name"
              footerText="Footer text"
            />
            <div styleName="option__group">
              <h2 styleName="title--top">Other settings</h2>
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
          <h2 styleName="title--top">Names</h2>
          <textarea
            styleName="textarea"
            ref={bindNames}
            placeholder={'Header text;Firstname;Lastname;Footer text'}
          ></textarea>
          <div styleName="help">
            Separate fields with ; and each badge data on its own line.
          </div>
          <button
            styleName="button"
            onClick={setNames}
          >
            <i className="fa fa-refresh" aria-hidden="true"></i>
            Generate
          </button>
          {maybeRenderPrintButton()}
        </div>
        <div>
          <h2 styleName="title--top">Badges</h2>
          <div styleName="badges" className="cf">
            {maybeRenderBadges()}
          </div>
          {maybeRenderPrintButton()}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  data: state.data,
  ui: state.ui
});

const mapActions = {
  setNames: DataActions.setNames,
  changeLogo: UiActions.changeLogo
};

export default connect(
  mapState,
  mapActions
)(CSSModules(Index, styles));
