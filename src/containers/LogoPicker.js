// @flow
import styles from 'styles/containers/LogoPicker';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Map } from 'immutable';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dropzone from 'react-dropzone';
import BlobUtil from 'blob-util';
import * as UiActions from 'redux/modules/ui';
import CSSModules from 'react-css-modules';

const TABLIST_STYLE = {
  margin: '0 0 1rem'
};

const TAB_STYLE = {
  borderRadius: '2px 2px 0 0'
};

type Props = {
  ui: Map<string, any>,
  changeLogoFile: Function,
  changeLogoText: Function,
  changeLogoType: Function,
  changeLogoUrl: Function,
}

// eslint-disable-next-line
class LogoPicker extends Component {
  props: Props;

  onChangeLogoFile = (files): void => {
    if (files.length === 0) {
      return;
    }

    const file = files[0];

    if (!file.preview) {
      return;
    }

    BlobUtil.blobToBase64String(file).then(base64 => {
      const image = `data:${file.type};base64,${base64}`;
      this.props.changeLogoFile(image);
    });
  }

  onChangeLogoText = (event: InputEvent): void => {
    const text = event.target.value;
    this.props.changeLogoText(text);
  }

  onChangeLogoUrl = (event: InputEvent): void => {
    const url = event.target.value;
    this.props.changeLogoUrl(url);
  }

  onTabSelect = (index: number) => {
    this.props.changeLogoType(index);
  }

  render() {
    const { ui } = this.props;
    const {
      onTabSelect,
      onChangeLogoFile,
      onChangeLogoText,
      onChangeLogoUrl
    } = this;

    return (
      <div>
        <div styleName="title">Logo</div>
        <Tabs onSelect={onTabSelect} selectedIndex={ui.get('logoType')}>
          <TabList style={TABLIST_STYLE}>
            <Tab style={TAB_STYLE}>URL</Tab>
            <Tab style={TAB_STYLE}>Upload</Tab>
            <Tab style={TAB_STYLE}>Text</Tab>
          </TabList>
          <TabPanel>
            <input
              type="text"
              styleName="input"
              value={ui.get('logoUrl')}
              placeholder="URL to logo"
              onChange={onChangeLogoUrl}
            />
          </TabPanel>
          <TabPanel>
            <Dropzone
              onDrop={onChangeLogoFile}
              styleName="dropzone"
              multiple={false}
              accept="image/*"
            >
              <div>
                Try dropping logo here, or click to select file to upload.
              </div>
            </Dropzone>
          </TabPanel>
          <TabPanel>
            <input
              type="text"
              styleName="input"
              value={ui.get('logoText')}
              placeholder="Text to show as logo"
              onChange={onChangeLogoText}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

const mapState = state => ({
  ui: state.ui
});

const mapActions = {
  changeLogoFile: UiActions.changeLogoFile,
  changeLogoText: UiActions.changeLogoText,
  changeLogoType: UiActions.changeLogoType,
  changeLogoUrl: UiActions.changeLogoUrl,
};

export default connect(
  mapState,
  mapActions
)(CSSModules(LogoPicker, styles));
