import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import * as ReactShare from 'react-share'
import { IconSocial } from 'vtex.dreamstore-icons'

import { 
  SOCIAL_TO_ENUM,
  SOCIAL_ENUM_TO_COMPONENT,
  SOCIAL_COLORS,
  SOCIAL_ENUM_TO_ID
} from '../constants/social'

export default class SocialButton extends Component {
  static propTypes = {
    /** Share URL */
    url: PropTypes.string.isRequired,
    /** Message to be shared */
    message: PropTypes.string,
    /** Social Network Enum */
    socialEnum: PropTypes.string.isRequired,
    /** Button size in pixels */
    size: PropTypes.number,
    /** Classes to be applied to social button */
    buttonClass: PropTypes.string,
    /** Classes to be applied to icon of the button */
    iconClass: PropTypes.string
  }

  static defaultProps = {
    size: 32,
    buttonClass: 'mh1 pointer outline-0 dim'
  }

  render() {
    const { url, message, size, socialEnum, buttonClass, iconClass } = this.props
    const socialComponentName = SOCIAL_ENUM_TO_COMPONENT[socialEnum]
    const desiredNetwork = SOCIAL_ENUM_TO_ID[socialEnum]
    const socialColor = SOCIAL_COLORS[socialEnum]
    const SocialComponent = ReactShare[`${socialComponentName}ShareButton`]
    const additionalProps = message && resolveMessageProp(message, socialEnum)

    return (
      <SocialComponent
        url={url}
        className={classNames('vtex-share__social-button', buttonClass)}
        {...additionalProps}
      >
        <span className="white">
          <IconSocial
            size={size}
            shape="circle"
            background={socialColor}
            network={desiredNetwork}
            className={classNames('vtex-share__social-icon', iconClass)}
          />
        </span>
        
      </SocialComponent>
    )
  }
}

function resolveMessageProp(message, socialEnum) {
  const titlePropMessage = [
    SOCIAL_TO_ENUM.whatsapp,
    SOCIAL_TO_ENUM.twitter,
    SOCIAL_TO_ENUM.telegram,
  ]

  return titlePropMessage.includes(socialEnum)
    ? { title: message }
    : socialEnum === SOCIAL_TO_ENUM.facebook
      ? { quote: message }
      : { body: message }
}
