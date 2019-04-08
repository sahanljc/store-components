import React, { Component } from 'react'
import { withRuntimeContext, Link } from 'vtex.render-runtime'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './styles.css'
import Placeholder from './Placeholder'
import LogoVTEX from './LogoVTEX'

/**
 * Logo of the store
 */
class Logo extends Component {
  static propTypes = {
    /** URL of the logo */
    url: PropTypes.string,
    /** Title to be displayed as alt text */
    title: PropTypes.string.isRequired,
    /** Logo's color */
    color: PropTypes.string,
    /** Logo's width */
    width: PropTypes.number,
    /** Logo's height */
    height: PropTypes.number,
    /** Set label visibility */
    /** TODO: Remove this prop, as it doesn't make sense anymore
     * (previously, the placeholder was a VTEX logo. This prop
     * would switch between the logo with and without a VTEX label.
     * Now the placeholder without label is generic, so the
     * semantics of this prop are lost)
     */
    showLabel: PropTypes.bool,
    /** Render Runtime */
    runtime: PropTypes.object,
  }

  static defaultProps = {
    color: '#F71963',
    showLabel: true,
  }

  getUrl(url, runtime) {
    return url.replace(/{{account}}/g, runtime.account)
  }

  render() {
    const { href, isMobile } = this.props

    const logoClassNames = classNames('store-logo', styles.logoContainer, {
      [styles.sizeDesktop]: !isMobile,
      [styles.sizeMobile]: isMobile,
    })

    const logo = (
      <div className={`${logoClassNames} pv4 ph6`}>
        {this.renderLogoImage()}
      </div>
    )

    if (href) {
      return <Link to={href}>{logo}</Link>
    }

    return logo
  }

  renderLogoImage() {
    const { width, height, color, showLabel, url, title, runtime } = this.props

    if (url) {
      return <img src={this.getUrl(url, runtime)} alt={title} />
    }

    if (!showLabel) {
      /** TODO: Find out if this is even used and remove this. */
      return (
        <LogoVTEX width={width} height={height} color={color} title={title} />
      )
    }

    return <Placeholder width={width} height={height} title={title} />
  }
}

export default withRuntimeContext(Logo)
