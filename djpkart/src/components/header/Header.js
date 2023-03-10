import React, { useContext,useState } from "react";
import { useHistory } from "react-router";
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import SearchIcon from '../../assets/SearchIcon';
import { AuthContext } from "../../contextStore/AuthContext";
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import data from '../Posts/Data';
function Header() {
  // const{allPost}=useContext(AllPostContext)
  const [allPost, SetallPost] = useState(data);
 
  const{setPostContent}=useContext(PostContext)
  const history = useHistory();
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  const handleSelectedSearch=(value)=>{
        SetallPost(value)
       history.push("/view")

  }
  const handleEmptyClick=()=>{
     alert("No items found.., please search by product name");
  }
  const { user } = useContext(AuthContext);
  
 
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <input type="text" 
          placeholder="Search specific product..."
          value={wordEntered}
          onChange={handleFilter}
        />{filteredData.length === 0 ? (
          <div onClick={handleEmptyClick}> <SearchIcon /> </div>
         ) : (
           <div id="clearBtn"  onClick={clearInput} > <Arrow></Arrow></div>
         )}
          {filteredData.length !== 0 && (
        <div className="dataResult-header">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <div key={key} className="dataItem-header" onClick={()=>handleSelectedSearch(value)}>
                <p>{value.name} </p>
              </div>
            );
          })}
        </div>
      )}
         
        </div>
        <div className="productSearch">
          <Search />
        </div>
        
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
         
            <Link to="/login">
              <span>Login</span>
            </Link>
         
          <hr />
        </div>
      
        
        <Link to="/create">
          {" "}
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
