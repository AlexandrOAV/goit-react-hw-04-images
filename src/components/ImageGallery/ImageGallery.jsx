import { ImageGalleryItem } from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem'
import css from './ImageGallery.module.css'
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types';

export const ImageGallery = ( {hits, alt, onClick}) => {
    const selectItem = id => {
        let selectCart = hits.find(cart => cart.id === id);
        if (selectCart) {
            onClick(selectCart)
        }
    }

    return (
       hits && <ul className={css.ImageGallery}   >
            {hits.map(image => 
                <ImageGalleryItem
                    key={nanoid(10)}
                    id={image.id}
                    srcImage={image.webformatURL}
                    altImage={alt}
                    onClick={selectItem}
                 />   
           )}     
</ul>
    )
}
ImageGallery.propTypes = {
    hits: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};