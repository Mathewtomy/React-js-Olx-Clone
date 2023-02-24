import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Heart from '../../assets/Heart';
import {data,Fresh} from './Data';
import './Post.css';
import BarLoading from "../Loading/BarLoading";
import PostCards from "../PostCards/PostCards";
import NewPostCards from "../PostCards/NewPostcards";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

//const status = [ ...new Set(data.map((item) => item.Status))];
import { slice } from 'lodash'
function Posts() {
  let [posts, setPosts] = useState([]); //for showing all posts in Descending order of date
  let [posts2, setPosts2] = useState(data); //for showing all posts in Ascending order of date
  let [loading, setLoading] = useState(false);
  let [loading2,setLoading2] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false)
  const [index, setIndex] = useState(4)
  const initialPosts = slice(posts2, 0, index)
  const [current, setCurrent] = useState(4);

  const length = posts2.length;
  
  const loadMore = () => {
    setIndex(index + 4)
    console.log(index)
    if (index >= posts2.length) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
    }
  }


  useEffect(() => {

    setTimeout(() => {
      setPosts(data);
    }, 500);

}, [])

const nextSlide = () => {
  setCurrent(current === length - 4 ? 0 : current + 4);
};

const prevSlide = () => {
  setCurrent(current === 0 ? length - 4 : current - 4);
};

// if (!Array.isArray(posts2) || posts2.length <= 0) {
//   return null;
// }

  let quickMenuCards = posts.map((product, index) => {
    return(<div className="quick-menu-cards" key={index}> <PostCards product={product} index={index} current={current} /> </div>);
  });

  let freshRecomendationCards = initialPosts.map((product, index) => { if(product.Status==="Fresh") {
    return (<div className="fresh-recomendation-card" key={index}> <NewPostCards product={product} index={index} /> </div>);}
    return null 
});
  return (
    <div className="postParentDiv">
    {posts && (
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <Link to="./viewmore">
            {" "}
            <span>View more</span>{" "}
          </Link>
        </div>
        
        <div className="cards">
        <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
          {" "}
          {loading ? <BarLoading /> : quickMenuCards}
          <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
        </div>
    
      </div>
    )}
    

   <div className="recommendations">
      <div className="heading">
        <span>Fresh recommendations</span>
      </div>
      <div className="fresh-recomendation-cards cards">{loading2 ? <BarLoading/> : freshRecomendationCards}</div>

    
    </div> 
    <div>
    <li class="TA_b7">
              <button type="button" data-aut-id="btnLoadMore" class="rui-39-wj rui-3evoE rui-1JPTg"
                  onClick={() => loadMore()}
              >
                
                <span>load more</span></button>
                </li>
       </div>
  </div>
);
}


export default Posts;
