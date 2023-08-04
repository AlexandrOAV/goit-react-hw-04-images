import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ srcImage, altImage, onClick, id }) => {
    return (
<li className={css.ImageGalleryItem} onClick={()=>onClick(id)} >
            <img className={css.ImageGalleryItem_image}
                src={srcImage}
                alt={altImage}
            />
</li> )
}