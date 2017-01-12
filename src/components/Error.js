// @flow
import styles from 'styles/components/Error';
import React from 'react';
import { pure } from 'recompose';
import type { Component } from 'recompose';
import CSSModules from 'react-css-modules';

type Props = {
  message: string
}

const Error: Component<Props> = (props: Props): ElementType => {
  return (
    <div styleName="error">
      {props.message}
    </div>
  );
};

export default pure(CSSModules(Error, styles));
