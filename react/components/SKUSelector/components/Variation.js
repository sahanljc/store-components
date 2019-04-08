import PropTypes from 'prop-types'
import React from 'react'

import SelectorItem from './SelectorItem'
import { stripUrl, isColor } from '../utils'
import { variationShape } from '../utils/proptypes'

import styles from '../styles.css'

const Variation = ({ variation, onSelectItem, maxSkuPrice, isSelected }) => {
  const displayImage = isColor(variation.name)

  return (
    <div className={`${styles.skuSelectorSubcontainer} flex flex-column mb7`}>
      <div className={`${styles.skuSelectorNameContainer} ma1`}>
        <span
          className={`${
            styles.skuSelectorName
          } c-muted-2 db t-small overflow-hidden mb3`}
        >
          {variation.name}
        </span>
        <div className="inline-flex flex-wrap ml2">
          {variation.options.map(skuItem => {
            if (!skuItem.images.length) return null
            const [skuImage] = skuItem.images
            const [seller] = skuItem.sellers
            return (
              <SelectorItem
                isSelected={isSelected(skuItem)}
                key={skuItem.itemId}
                isAvailable={seller.commertialOffer.AvailableQuantity > 0}
                maxPrice={maxSkuPrice}
                skuId={skuItem.itemId}
                price={seller.commertialOffer.Price}
                onClick={() => onSelectItem(skuItem.itemId)}
                isImage={displayImage}
              >
                {displayImage ? (
                  <img
                    src={stripUrl(skuImage.imageUrl)}
                    alt={skuImage.imageLabel}
                  />
                ) : (
                  <span className="c-on-base t-body">
                    {skuItem[variation.name]}
                  </span>
                )}
              </SelectorItem>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Variation.propTypes = {
  /** Variation Object */
  variation: variationShape,
  /** On Select item behavior */
  onSelectItem: PropTypes.func,
  /** Max price of SKU */
  maxSkuPrice: PropTypes.number,
  /** Function to verify if this Variation is selected */
  isSelected: PropTypes.func,
}

export default Variation
