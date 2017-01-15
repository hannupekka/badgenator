// @flow
import styles from 'styles/components/ColorPicker';
import React, { Component } from 'react';
import { pure } from 'recompose';
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';
import * as uiActions from 'redux/modules/ui';
import CSSModules from 'react-css-modules';

type Props = {
  children?: ElementType,
  color: string,
  colorName: string,
  changeColor: Function
}

type State = {
  isVisible: boolean
}

class ColorPicker extends Component {
  props: Props;
  state: State;

  constructor(props): void {
    super(props);

    this.state = {
      isVisible: false
    };
  }

  hideColorPicker = (): void => {
    this.setState({ isVisible: false });
  }

  showColorPicker = (): void => {
    this.setState({ isVisible: true });
  }

  onChangeColor = ({ hex }: { hex: string }): void => {
    const { colorName, changeColor } = this.props;
    changeColor(colorName, hex);
  }

  maybeRenderColorPicker = (): ?ElementType => {
    const { color } = this.props;
    const { isVisible } = this.state;
    const { hideColorPicker, onChangeColor } = this;

    if (!isVisible) {
      return null;
    }

    return (
      <div styleName="picker__wrapper">
        <div styleName="picker__cover" onClick={hideColorPicker} />
        <ChromePicker
          color={color}
          onChange={onChangeColor}
        />
      </div>
    );
  }

  render(): ElementType {
    const { children, color } = this.props;
    const { maybeRenderColorPicker, showColorPicker } = this;

    return (
      <div styleName="wrapper">
        <div
          onClick={showColorPicker}
          styleName="color"
          style={{
            backgroundColor: color
          }}
        />
        <div styleName="title">{children}</div>
        {maybeRenderColorPicker()}
      </div>
    );
  }
}

const mapActions = {
  changeColor: uiActions.changeColor
};

export default connect(
  null,
  mapActions
)(pure(CSSModules(ColorPicker, styles)));
