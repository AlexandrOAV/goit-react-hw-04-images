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
  

  // componentDidUpdate(_, prevState) {
  //   const { textSerch, page } = this.state;
  //   if (prevState.textSerch !== this.state.textSerch|| prevState.page !== page) {
  //   this.addData(textSerch, page)
  //   }
  // }  
  useEffect(() => {
    addData(textSerch, page)
  }, [textSerch, page])
  
  async function addData(textSearch, page) {
    try {
      setIsLoading(true);
      const newData = await getImage(textSearch, page);
      console.log(newData)
      // this.setState(prevState => (
      //   { hits: page === 1 ? newData.hits : [...prevState.hits, ...newData.hits],
      //    totalHits: newData.totalHits }));
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
    


  const clickInLoadMore = () => setPage(prevState => prevState.page + 1);
  
  const openModal = () => setShowModal(true)

  const closeModal = () => setShowModal(false);

  const handleImageClick = (selectCart) => {
    setSelectCart(selectCart);
    setShowModal(true);
  };

 
  const showButton = hits.length > 0 && hits.length < totalHits;
  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />
      <Searchbar onSubmit={this.hendleSerchSubmit} />
      {isLoading && <Loader />}
      <ImageGallery
        hits={hits}
        alt={`image ${textSerch}`}
        onClick={this.handleImageClick} />
      {showButton && <Button totalHits={this.state.totalHits} onClick={this.clickInLoadMore} />}
      {showModal && <Modal src={selectCart.largeImageURL} alt={`Big image ${textSerch}`} onClose={this.closeModal} />}
    </div>
  )
}


// export class App extends Component {
// state = {
//   textSerch: '',
//   hits:[],
//   page: 1,
//   isLoading: false, 
//   totalHits: 0,
//   showModal: false,
//   selectCart:null,
//   }
  
//   componentDidUpdate(_, prevState) {
//     const { textSerch, page } = this.state;
//     if (prevState.textSerch !== this.state.textSerch|| prevState.page !== page) {
//     this.addData(textSerch, page)
//     }
//   }  
      
  
//   addData = async (textSearch, page) => {
//     try {
//     this.setState({isLoading:true})
//     const newData = await getImage(textSearch, page);
//       this.setState(prevState => (
//         { hits: page === 1 ? newData.hits : [...prevState.hits, ...newData.hits],
//          totalHits: newData.totalHits }));
//     } catch (error) {
//        toast.error(`API NOT FAUND: ${error.message}`)
//     } finally { this.setState({isLoading:false})}
   
//   } 

//   hendleSerchSubmit = (imageSerch) => {
//     if (this.state.textSerch !== imageSerch) {
//       this.setState({textSerch:imageSerch, page:1})
//     }
    
//   }

//   clickInLoadMore = () => {
//     this.setState(prevState =>({page: prevState.page + 1}))
//   }
  
//   openModal = () => {
//    this.setState({showModal:true})
//   }

//   closeModal = () => {
//     this.setState({showModal:false})
//   }

//   handleImageClick = (selectCart) => {
//     this.setState({ selectCart, showModal:true });
//   };

//   render() {
//     const { hits, textSerch, isLoading, totalHits, showModal, selectCart } = this.state;
//     const showButton = hits.length > 0 && hits.length < totalHits;
//        return (
//          <div>
//           <ToastContainer position="top-center" autoClose={2000}/>
//            <Searchbar onSubmit={this.hendleSerchSubmit} />
//            {isLoading&&<Loader/>}
//            <ImageGallery
//              hits={hits}
//              alt={`image ${textSerch}`}
//              onClick={this.handleImageClick} />
//            {showButton && <Button totalHits={this.state.totalHits} onClick={this.clickInLoadMore} />}
//            {showModal && <Modal src={selectCart.largeImageURL} alt={`Big image ${textSerch}`} onClose={this.closeModal}  />}
//          </div>
//   );
//   }
// };
