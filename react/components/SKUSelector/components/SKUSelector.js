import PropTypes from 'prop-types'
import React from 'react'

import Variation from './Variation'
import { variationShape } from '../utils/proptypes'

import styles from '../styles.css'

/** Renders the main and the secondary variation, if it exists. */
const SKUSelector = ({
  onSelectSKU,
  mainVariation,
  secondaryVariation,
  maxSkuPrice,
  alwaysShowSecondary,
}) => {
  if (!mainVariation) return null

  const shouldShowSecondary =
    (alwaysShowSecondary || mainVariation.value) && secondaryVariation.name

  return (
    <div className={styles.skuSelectorContainer}>
      <Variation
        variation={mainVariation}
        onSelectItem={skuId => onSelectSKU(true, skuId)}
        isSelected={sku => sku[mainVariation.name] === mainVariation.value}
        maxSkuPrice={maxSkuPrice}
      />
      {shouldShowSecondary && (
        <Variation
          variation={secondaryVariation}
          onSelectItem={skuId => onSelectSKU(false, skuId)}
          isSelected={sku => sku.itemId === secondaryVariation.value}
          maxSkuPrice={maxSkuPrice}
        />
      )}
    </div>
  )
}

SKUSelector.propTypes = {
  /** Function to go to the product page of a given sku */
  onSelectSKU: PropTypes.func.isRequired,
  /** Name and list of options of the main variation */
  mainVariation: variationShape,
  /** Name and list of options of the secondary variation */
  secondaryVariation: variationShape,
  /** Max price find on the sku list */
  maxSkuPrice: PropTypes.number.isRequired,
  /** If true, show secondary options (if present), even when main variation is not picked yet */
  shouldShowSecondary: PropTypes.bool,
  alwaysShowSecondary: PropTypes.bool,
}

export default SKUSelector
