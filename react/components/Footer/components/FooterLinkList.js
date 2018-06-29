import React from 'react'
import PropTypes from 'prop-types'

import footerList from './footerList'

import footerStyles from '../footerStyles.css'

const FooterLinkItem = ({ url, title }) => (
  <a className={footerStyles['list-link']} href={url}>
    {title}
  </a>
)

FooterLinkItem.displayName = 'FooterLinkItem'

FooterLinkItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default footerList(FooterLinkItem)
