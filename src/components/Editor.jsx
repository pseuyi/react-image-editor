import React from 'react';
import PropTypes from 'prop-types';

class Editor extends React.PureComponent {
  state = {
    image: null,
  }
  setRef = (canvas) => { this.canvas = canvas }
  get ctx() { return this.canvas.getContext('2d')}

  componentDidMount() {
    this.loadImage();
  }

  loadImage = () => {
    this.image = new Image();
    this.image.src = this.props.src;
    console.log(this.image)
    this.image.onload = this.onLoadSuccess();
    // this.image.onerror = this.onLoadError()
  }

  onLoadSuccess = () => {
    console.log(this.image)
    this.setState({ image: { loaded: true }})
    this.drawImage(0, 0);
  }

  drawImage = (x, y) => {
    this.ctx.drawImage(this.image, x, y);
  }

  moveImage = () => {

  }

  render () {
    return (
      <canvas ref={this.setRef} {...this.props} />
    )
  }
}

Editor.defaultProps = {
  height: 200,
  width: 200,
}

export default Editor;
