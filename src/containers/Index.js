// @flow
import styles from 'styles/containers/Index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import type { Map } from 'immutable';
import cuid from 'cuid';
import Badge from 'components/Badge';
import ColorPicker from 'components/ColorPicker';
import LogoPicker from 'containers/LogoPicker';
import * as DataActions from 'redux/modules/data';
import * as UiActions from 'redux/modules/ui';
import CSSModules from 'react-css-modules';

const LOCAL_STORAGE_SAVE_PATH = 'badgenator_settings';
const DEFAULT_WIDTH = 8.6;
const DEFAULT_HEIGHT = 5.9;

type Props = {
  data: Map<string, any>,
  ui: Map<string, any>,
  loadConfig: Function,
  setNames: Function
}

// eslint-disable-next-line
class Index extends Component {
  props: Props;

  bindHeight: Function;
  height: HTMLInputElement;
  bindNames: Function;
  names: HTMLInputElement;
  bindWidth: Function;
  width: HTMLInputElement;

  constructor(props: Object) {
    super(props);

    this.bindHeight = (c) => (this.height = c);
    this.bindNames = (c) => (this.names = c);
    this.bindWidth = (c) => (this.width = c);
  }

  componentDidMount = (): void => {
    if (!localStorage || !localStorage.getItem(LOCAL_STORAGE_SAVE_PATH)) {
      return;
    }

    const storedConfig = localStorage.getItem(LOCAL_STORAGE_SAVE_PATH);
    if (!storedConfig) {
      return;
    }

    const config = fromJS(JSON.parse(storedConfig));

    // Set names.
    this.names.value = config.get('names');

    // Load UI config.
    this.props.loadConfig(config.get('ui'));
  }

  deleteConfig = (): void => {
    localStorage.removeItem(LOCAL_STORAGE_SAVE_PATH);
    this.forceUpdate();
  }

  maybeRenderBadges = (): ElementType => {
    const { data } = this.props;
    const names = data.get('names');

    if (names.size === 0) {
      return <div>Fill in data and generate badges with button above.</div>;
    }

    const height = this.height.value;
    const width = this.width.value;

    return names.map(name => (
      <Badge
        key={cuid()}
        headerText={name.get('headerText')}
        firstname={name.get('firstname')}
        lastname={name.get('lastname')}
        footerText={name.get('footerText')}
        height={height}
        width={width}
      />
    )).toJS();
  }

  maybeRenderDeleteConfigButton = (): ?ElementType => {
    if (!localStorage || !localStorage.getItem(LOCAL_STORAGE_SAVE_PATH)) {
      return null;
    }

    const { deleteConfig } = this;

    return (
      <button
        styleName="button"
        onClick={deleteConfig}
      >
        <i className="fa fa-trash" aria-hidden="true"></i>
        Delete saved configuration
      </button>
    );
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

  maybeRenderSaveConfigButton = (): ?ElementType => {
    if (!localStorage) {
      return null;
    }

    const { saveConfig } = this;

    return (
      <button
        styleName="button"
        onClick={saveConfig}
      >
        <i className="fa fa-save" aria-hidden="true"></i>
        Save configuration
      </button>
    );
  }

  saveConfig = (): void => {
    const { ui } = this.props;
    const config = JSON.stringify({
      names: this.names.value.trim(),
      ui: ui.toJS()
    });

    localStorage.setItem(LOCAL_STORAGE_SAVE_PATH, config);
    this.forceUpdate();
  }

  parseNames = (): Array<string> => {
    const namesValue = this.names.value.trim();

    if (namesValue.length === 0) {
      return [];
    }

    const names = namesValue.split('\n');
    if (names.length === 0) {
      return [];
    }

    return names;
  }

  setNames = (): void => {
    const { parseNames } = this;
    const { data } = this.props;

    const names = parseNames().map(name => {
      const [headerText, firstname, lastname, footerText] = name.split(data.get('separator'));
      return {
        headerText,
        firstname,
        lastname,
        footerText
      };
    });

    this.props.setNames(names);
  }

  render() {
    const { ui } = this.props;
    const {
      bindHeight,
      bindNames,
      bindWidth,
      maybeRenderBadges,
      maybeRenderDeleteConfigButton,
      maybeRenderPrintButton,
      maybeRenderSaveConfigButton,
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
              <LogoPicker />
            </div>
          </div>
        </div>
        <div styleName="actions">
          {maybeRenderSaveConfigButton()}
          {maybeRenderDeleteConfigButton()}
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
          <div styleName="dimensions">
            <span styleName="option__label">Width (cm)</span>
            <input
              type="number"
              min="0"
              step="any"
              styleName="input--inline"
              ref={bindWidth}
              placeholder={DEFAULT_WIDTH}
            />
            <span styleName="option__label">Height (cm)</span>
            <input
              type="number"
              min="0"
              step="any"
              styleName="input--inline"
              ref={bindHeight}
              placeholder={DEFAULT_HEIGHT}
            />
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
        <div styleName="bottom">
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
  loadConfig: UiActions.loadConfig,
  setNames: DataActions.setNames
};

export default connect(
  mapState,
  mapActions
)(CSSModules(Index, styles));
