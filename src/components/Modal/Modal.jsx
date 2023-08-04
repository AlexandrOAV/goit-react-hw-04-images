import { Component } from 'react';
import css from './Modal.module.css'
export class Modal extends Component {
    
    componentDidMount() {
        window.addEventListener('keydown', this.clickKeyEscape)
    }
  
    componentWillUnmount() {
        window.removeEventListener('keydown', this.clickKeyEscape)
    }

      clickKeyEscape = (e) => {
          if (e.code === 'Escape') {
         this.props.onClose();
            }
    }
    
    clickBackDrop = ({currentTarget, target}) => {
        if (currentTarget === target) {
            this.props.onClose()
        }
    }

    render() {
        const {alt, src} = this.props
        return (
            <div className={css.Overlay} onClick={this.clickBackDrop}>
                <div className={css.Modal}>
                     <img src={src} alt={alt} />
                </div>
            </div>
        )
    }
}