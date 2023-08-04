import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ srcImage, altImage, onClick, id }) => {
    return (
<li className={css.ImageGalleryItem} onClick={()=>onClick(id)} >
            <img className={css.ImageGalleryItem_image}
                src={srcImage}
                alt={altImage}
            />
</li> )
}
ImageGalleryItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    srcImage: PropTypes.string.isRequired,
    altImage: PropTypes.string.isRequired,
    id:PropTypes.number.isRequired
};