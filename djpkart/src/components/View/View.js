

import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../contextStore/PostContext";
import {data,userDetails} from '../Posts/Data';
import NewPostCards from "../PostCards/NewPostcards";
import { useHistory } from "react-router";
import "./View.css";

import SimpleImageSlider from "react-simple-image-slider";

function View() {
  let { postContent } = useContext(PostContext);//from the global store PostContext we can get information about desired product post that we want to show (the user is clicked item on the card)
// useHistory: This is one of the most popular hooks provided by React Router. It lets you access the history instance used by React Router. Using the history instance you can redirect users to another page. The history instance created by React Router use
  //const [postContent, setPosts] = useState(data);
  const [userDetail, setUserDetails] = useState(userDetails);//we want show the details of who is posted the add and we dont know,so we want retreive user data from firebase who is posted this add
  const history = useHistory();//if user click the refresh of the page then PostContext data will be erased so it will throws an error so that time we want redirect this page to home page
 

  const  uid  = postContent.id;

const allCategories = [ ...new Set(userDetail.filter((item) => {
  if (item.id === uid ) {
    return item;
  }
}))];

const [emptydata, setEmptyData] = useState(allCategories);

useEffect(() => {
  let { id } = postContent;
  if (id === undefined) {
    history.push("/");
  } else {
    // Firebase.firestore()
    //   .collection("users")
    //   .where("id", "==", userId)
    //   .get()
    //   .then((res) => {
    //     res.forEach((doc) => {
    //       setUserDetails(doc.data());
    //     });
    //   });
    const filteredData = data.filter((item) => {
      if (item.id === id) {
        return item;
      }
    })
    ;
    // const filtered = userDetail.filter((item) => {
    //   if (item.id === id ) {
    //     return item;
    //   }
    // });
    
    // setEmptyData(filtered);
  }
}, [history, postContent]);



// const filtered = userDetail.filter((item) => {
//   if (item.id === uid ) {
//     return item;
//   }
// });


//setEmptyData(filtered);

const category=postContent.category;

const filter = data.filter((item) => {
  if (item.category === category) {
    return item;
  }
})

let freshRecomendationCards = filter.map((product, index) => { if(index<4) {
  return (<div className="fresh-recomendation-card" key={index}> <NewPostCards product={product} index={index} /> </div>);}
  return null 
});

const image1=postContent.url;
const image2=postContent.url2;
const image3=postContent.url3;

const images = [
  postContent.url,
  postContent.url2,
  postContent.url3,
 
];


  return (
    <div className="viewParentDiv">
      {/* <div className="imageShowDiv">
        <img src={postContent.url} alt="" />
      </div> */}
      <SimpleImageSlider
        width={896}
        height={504}
        images={images}
        showBullets={true}
        showNavs={true}
      />
      {" "}
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postContent.price} </p>
          <span>{postContent.name}</span>
          <p>{postContent.category}</p>
          <span>{postContent.createdAt}</span>
        </div>
        <div className="productDescription">
            <p className="p-bold">Product Description</p>
            <p>{postContent.description}</p>
            
          </div>
       
          <div className="contactDetails">
            <p className="p-bold">Seller details</p>
   <div>
   {emptydata.map((category) => (
   <p>Name : {category.name} 
   <br></br>
   Phone : {category.phone}</p>
  
      ))}
   </div>


          </div>
          <br></br>
          <br></br>
    
          <br></br>
          
      <div className="releated-heading">
        <span>Related ads</span>
      </div>

      <div className="releated-heading">{freshRecomendationCards}

 </div>
    
 


 
   
      </div>
   
    </div>
  );
}
export default View;
