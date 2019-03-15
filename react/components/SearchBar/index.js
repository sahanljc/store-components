import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchBar from './components/SearchBar'
import { injectIntl, intlShape } from 'react-intl'

const SEARCH_DELAY_TIME = 500

/** Canonical search bar that uses the autocomplete endpoint to search for a specific product*/
const SearchBarContainer = (
  { intl, compactMode, hasIconLeft, iconClasses, autoFocus },
  { navigate }
) => {
  const [shouldSearch, setShouldSearch] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleClearSearchResults = () => {
    setShouldSearch(false)
  }

  const handleClearInput = () => {
    setInputValue('')
    handleClearSearchResults()
  }

  const handleGoToSearchPage = () => {
    const search = inputValue
    setInputValue('')
    navigate({
      page: 'store.search',
      params: { term: search },
      query: 'map=ft',
      fallbackToWindowLocation: false,
    })
  }

  const handleEnterPress = event => {
    if (event.key === 'Enter') {
      handleGoToSearchPage()
    }
  }

  const handleMakeSearch = () => {
    handleClearSearchResults()
    setTimeout(() => {
      setShouldSearch(true)
    }, SEARCH_DELAY_TIME)
  }

  const handleInputChange = event => {
    const value = event.target.value
    setInputValue(value)
    value.length < 2 ? handleClearSearchResults() : handleMakeSearch()
  }

  const placeholder = intl.formatMessage({
    id: 'search.placeholder',
  })
  const emptyPlaceholder = intl.formatMessage({
    id: 'search.noMatches',
  })

  return (
    <SearchBar
      autoFocus={autoFocus}
      placeholder={placeholder}
      emptyPlaceholder={emptyPlaceholder}
      shouldSearch={shouldSearch}
      inputValue={inputValue}
      onClearInput={handleClearInput}
      onGoToSearchPage={handleGoToSearchPage}
      onEnterPress={handleEnterPress}
      onMakeSearch={handleMakeSearch}
      onInputChange={handleInputChange}
      compactMode={compactMode}
      hasIconLeft={hasIconLeft}
      iconClasses={iconClasses}
    />
  )
}

SearchBarContainer.contextTypes = {
  navigate: PropTypes.func,
}

SearchBarContainer.propTypes = {
  /* Internationalization */
  intl: intlShape.isRequired,
  /** Indentify when use the compact version of the component */
  compactMode: PropTypes.bool,
  /** Identify if the search icon is on left or right position */
  hasIconLeft: PropTypes.bool,
  /** Custom classes for the search icon */
  iconClasses: PropTypes.string,
  /** Identify if the search input should autofocus or not */
  autoFocus: PropTypes.bool,
}

export default injectIntl(SearchBarContainer)
