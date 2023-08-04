import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import {getImage} from 'recuest/recuestApi';
import { Button } from './Button/Button';
import { Loader } from './Searchbar/Loader/Loader';
import { Modal } from './Modal/Modal';
import { useState, useEffect } from 'react';



export const App = () => {
  const [textSerch, setTextSerch] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectCart, setSelectCart] = useState(null);
  

  
  useEffect(() => {
    if (textSerch === '') {
      return
    };
    addData(textSerch, page)
  }, [textSerch, page])
  async function addData(textSearch, page) {
    try {
      setIsLoading(true);
      const newData = await getImage(textSearch, page);
      setHits(prevHits => page === 1 ? newData.hits : [...prevHits, ...newData.hits]);
      setTotalHits(newData.totalHits);
    } catch (error) {
      toast.error(`API NOT FAUND: ${error.message}`)
    } finally { setIsLoading(false) }
  }

  function hendleSerchSubmit(imageSerch) {
    if (textSerch !== imageSerch) {
      setTextSerch(imageSerch)
      setPage(1)
    }
  }
    


  const clickInLoadMore = () => setPage(prevState => prevState + 1);
  
  const closeModal = () => setShowModal(false);

  const handleImageClick = (selectCart) => {
    setSelectCart(selectCart);
    setShowModal(true);
  };

 
  const showButton = hits.length > 0 && hits.length < totalHits;
  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      <Searchbar onSubmit={hendleSerchSubmit} />
      {isLoading && <Loader />}
      <ImageGallery
        hits={hits}
        alt={`image ${textSerch}`}
        onClick={handleImageClick} />
      {showButton &&
        <Button
          totalHits={totalHits}
          onClick={clickInLoadMore} />}
      {showModal &&
        <Modal
          src={selectCart.largeImageURL}
          alt={`Big image ${textSerch}`}
          onClose={closeModal}
        />}
    </div>
  )
}


