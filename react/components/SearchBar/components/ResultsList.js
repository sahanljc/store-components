import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import autocomplete from '../queries/autocomplete.gql'
import { Spinner } from 'vtex.styleguide'
import { Link } from 'render'

import styles from '../../../customStyles.css'
// import styles from './customStyles.css'

const listClassNames = (styles) =>
  `${styles.list} z-max absolute w-100 mt3 border-box bw1 br2 b--solid outline-0 near-black b--light-gray bg-white f5 pv4 ph6`

const listItemClassNames = (styles) =>
  `${styles.item} dim pointer flex justify-start mt1 pa1 near-black f5 pv4 ph6`

function getImageUrl(image) {
  return (image.match(/http:(.*?)"/g) || [''])[0]
}

/** List of search results to be displayed*/
class ResultsList extends Component {
  getLinkProps(element) {
    let page = 'store/product'
    let params = { slug: element.slug }
    let query = ''
    const terms = element.slug.split('/')
    if (element.criteria) {
      page = 'store/search'
      params = { term: terms[0] }
      query = `map=c,ft&rest=${terms.slice(1).join(',')}`
    }
    return { page, params, query }
  }

  renderSpinner() {
    return (
      <div className="w-100 flex justify-center">
        <div className="w3 ma0">
          <Spinner />
        </div>
      </div>
    )
  }

  render() {
    console.log('>>>>>>>>>>>>> STYLES STYLES STYLES STYLES STYLES STYLES ', styles)
    const { data, emptyPlaceholder, inputValue } = this.props
    const items = data.autocomplete ? data.autocomplete.itemsReturned : []
    if (data.loading) {
      return (
        <ol className={listClassNames(styles)}>
          {this.renderSpinner()}
        </ol>
      )
    }

    if (!items.length) {
      return (
        <ol className={listClassNames(styles)}>
          <li className={listItemClassNames(styles)}>{emptyPlaceholder}</li>
        </ol>
      )
    }

    return (
      <ol className={listClassNames(styles)}>
        Resultados!!!!!!
        <Link
          onClick={() => { this.props.closeMenu() }}
          page="store/search"
          params={{ term: inputValue }}
          query="map=ft"
          className="clear-link dim">
          <li className={`${listItemClassNames(styles)}`}>
            {inputValue}
          </li>
        </Link>
        {items.map((item, index) => {
          return (
            <Link
              onClick={() => { this.props.closeMenu() }}
              key={item.name + index}
              {...this.getLinkProps(item)}
              className="clear-link dim">
              <li className={listItemClassNames(styles)}>
                {item.thumb && (
                  <div className="mr4">
                    <img className={styles['item-image']} src={getImageUrl(item.thumb)} />
                  </div>
                )}
                <div className="flex justify-start items-center">{item.name}</div>
              </li>
            </Link>
          )
        })}
      </ol>
    )
  }
}

const itemProps = PropTypes.shape({
  /** Image of the product*/
  thumb: PropTypes.string,
  /** Name of the product*/
  name: PropTypes.string,
  /** Link to the product*/
  href: PropTypes.string,
  /** Slug of the product*/
  slug: PropTypes.string,
  /** Criteria of the product*/
  criteria: PropTypes.string,
})

ResultsList.propTypes = {
  /** Graphql data response. */
  data: PropTypes.shape({
    autocomplete: PropTypes.shape({
      itemsReturned: PropTypes.arrayOf(itemProps),
    }),
    loading: PropTypes.bool.isRequired,
  }),
  /** Message that will be displayed when there is no result ot be shown */
  emptyPlaceholder: PropTypes.string.isRequired,
  /** Downshift specific prop*/
  highlightedIndex: PropTypes.number,
  /** Search query*/
  inputValue: PropTypes.string.isRequired,
  /** Closes the options box. */
  closeMenu: PropTypes.func,
}

const ResultsListWithData = graphql(autocomplete)(ResultsList)

export default ResultsListWithData
