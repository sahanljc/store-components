import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Vimeo from './Vimeo'

class Video extends Component {
  static getThumbUrl(url, thumbWidth) {
    if (url.search('vimeo') !== -1) { return Vimeo.getThumbUrl(url, thumbWidth) }
  }

  static slideIsVideo(url) {
    return url.search('vimeo') !== -1 ? true : url.search('youtube') !== -1 ? true : false;
  }

  render() {
    const { url } = this.props

    if (url.search('vimeo') !== -1) { return <Vimeo {...this.props} /> }
  }
}

Video.propsTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setThumb: PropTypes.func,
  thumbWidth: PropTypes.number,
  className: PropTypes.string,
  play: PropTypes.bool,
}

export default Video
