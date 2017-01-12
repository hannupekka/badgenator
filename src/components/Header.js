// @flow
import styles from 'styles/components/Header';
import React from 'react';
import { pure } from 'recompose';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

const Header: Component<{}> = (): ElementType => {
  return (
    <header styleName="header">
      <h1 styleName="title">Badgenator</h1>
    </header>
  );
};

export default pure(CSSModules(Header, styles));
