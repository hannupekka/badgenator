// @flow
import styles from 'styles/components/Badge';
import React from 'react';
import { pure } from 'recompose';
import { connect } from 'react-redux';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

type Props = {
  headerText: ?string,
  firstname: ?string,
  lastname: ?string,
  footerText: ?string,
  width?: string,
  height?: string,
  ui: Map<string, any>,
}

const Badge: Component<Props> = (props: Props): ElementType => {
  const { ui } = props;
  const {
    footerBackground,
    footerText,
    headerBackground,
    headerText,
    logoFile,
    logoText,
    logoType,
    nameBackground,
    nameText,
    logoUrl
  } = ui.toJS();


  const maybeRenderLogoFromURL = (): ?ElementType => {
    if (!logoUrl) {
      return null;
    }

    return (
      <div
        styleName="header__logo"
        style={{
          backgroundImage: `url(${logoUrl})`
        }}
      >
      </div>
    );
  };

  const maybeRenderLogoFromFile = (): ?ElementType => {
    if (!logoFile) {
      return null;
    }

    return (
      <div
        styleName="header__logo"
        style={{
          backgroundImage: `url(${logoFile})`
        }}
      >
      </div>
    );
  };

  const maybeRenderLogoText = (): ?ElementType => {
    if (!logoText) {
      return null;
    }

    return (
      <div
        styleName="header__logo--text"
        style={{
          color: headerText
        }}
      >
        {logoText}
      </div>
    );
  };

  const maybeRenderLogo = (): ?ElementType => {
    switch (logoType) {
      default:
      case 0:
        return maybeRenderLogoFromURL();
      case 1:
        return maybeRenderLogoFromFile();
      case 2:
        return maybeRenderLogoText();
    }
  };

  return (
    <div
      styleName="badge"
      style={{
        width: props.width ? `${props.width}cm` : '8.6cm',
        height: props.height ? `${props.height}cm` : '5.9cm'
      }}
    >
      <div
        styleName="header"
        style={{
          backgroundColor: headerBackground
        }}
      >
        {maybeRenderLogo()}
        <div
          styleName={logoUrl ? 'header__text' : 'header__text--no-logo'}
          style={{
            color: headerText
          }}
        >{props.headerText}</div>
      </div>
      <div
        styleName="name"
        style={{
          backgroundColor: nameBackground,
          color: nameText
        }}
      >
        <span styleName="name--first">{props.firstname}</span>
        <span styleName="name--last">{props.lastname}</span>
      </div>
      <div
        styleName={logoUrl ? 'footer' : 'footer--no-logo'}
        style={{
          backgroundColor: footerBackground
        }}
      >
        <span
          style={{
            color: footerText
          }}
        >{props.footerText}</span>
      </div>
    </div>
  );
};

const mapState = state => ({
  ui: state.ui
});

export default connect(
  mapState,
  null,
)(pure(CSSModules(Badge, styles)));
