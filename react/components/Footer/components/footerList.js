import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'
import classNames from 'classnames'

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component'
}

import footerStyles from '../footerStyles.css'

export default function footerList(WrappedComponent) {
  class FooterList extends Component {
    static displayName = `FooterList(${getDisplayName(WrappedComponent)})`

    static propTypes = {
      titleId: PropTypes.string,
      list: PropTypes.array,
      intl: intlShape.isRequired,
      alignRight: PropTypes.bool,
      horizontal: PropTypes.bool,
    }

    static defaultProps = {
      alignRight: false,
      horizontal: false,
    }

    formatMessage(id) {
      return this.props.intl.formatMessage({ id })
    }

    render() {
      const { list, titleId, alignRight, horizontal, ...otherProps } = this.props

      if (!list || list.length === 0) return null

      const listContainerClasses = classNames(`${footerStyles['list-container']}`, {
        [`${footerStyles['list-container--right-aligned']}`]: alignRight,
        [`${footerStyles['list-container--horizontal']}`]: horizontal,
      })

      const listClasses = classNames(`${footerStyles.list}`, {
        [`${footerStyles['list--horizontal']}`]: horizontal,
      })

      const listItemClasses = classNames(`${footerStyles['list-item']}`, {
        [footerStyles['list-item--horizontal']]: horizontal,
      })

      return (
        <div className={listContainerClasses}>
          {titleId && <h4 className={footerStyles['list-title']}>
            {this.formatMessage(titleId)}
          </h4>}
          <ul className={listClasses}>
            {list.map((item, index) => (
              <li key={index} className={listItemClasses}>
                <WrappedComponent {...otherProps} {...item} />
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }

  return injectIntl(FooterList)
}
