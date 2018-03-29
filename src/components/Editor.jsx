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
  componentDidUpdate(prevProps, prevState) {
    const rotateChange = prevProps.rotate != this.props.rotate;
    if(rotateChange) this.draw(0, 0);
  }

  loadImage = () => {
    this.image = new Image();
    this.image.src = this.props.src;
    this.image.onload = this.onLoadSuccess();
    // this.image.onerror = this.onLoadError()
  }

  onLoadSuccess = () => {
    this.setState({ image: { loaded: true }})
    this.draw(0, 0);
  }

  draw = (x, y) => {
    this.clear();
    this.rotate(this.props.rotate)
    this.ctx.drawImage(this.image, x, y);
  }

  move = () => {
  }

  rotate = (deg) => {
    this.ctx.rotate(deg * Math.PI / 180);
  }

  clear = () => {
    this.ctx.clearRect(0, 0, this.props.width, this.props.height);
  }
  render () {
    return (
      <canvas ref={this.setRef} {...this.props} />
    )
  }
}

Editor.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  rotate: PropTypes.number,
}

Editor.defaultProps = {
  height: 200,
  width: 200,
}

export default Editor;
