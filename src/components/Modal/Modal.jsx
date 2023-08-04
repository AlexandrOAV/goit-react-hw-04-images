import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css'

export const Modal = ({ onClose, alt, src }) => {

    
    function clickBackDrop({ currentTarget, target }) {
        if (currentTarget === target) {
            onClose();
        }
    }   
    useEffect(() => {
        const clickKeyEscape = (e) => {
          if (e.code === 'Escape') {
        onClose();
            }
    }
        window.addEventListener('keydown', clickKeyEscape)
        return ()=> { window.removeEventListener('keydown', clickKeyEscape)}
    }, [onClose])


        return (
            <div className={css.Overlay} onClick={clickBackDrop}>
                <div className={css.Modal}>
                     <img src={src} alt={alt} />
                </div>
            </div>
        )
}
    
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
