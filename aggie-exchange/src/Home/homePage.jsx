import React, {useState} from 'react';
import Fuse from 'fuse.js';
import CardList from './cardResult';
import Navbar from "../Navbar/navbar"
import Footer from '../Footer/footer';
import coursesData from "../../Backend/Web Scraper/data/course.json"
import '../css/searchBar.css';
import StudySmart from '../imgs/Study-Smart.png'
import DownloadResource from '../imgs/Download-Resources.png'
import ExploreClasses from "../imgs/Explore-Classes.png";
import HomeHeader from "../imgs/Home-Header4.png";

const HomePage = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const fuseOptions = {
      keys: ['course_id'], // Fields to perform the fuzzy search on
      includeScore: true, // Include search score for ranking results
      ignoreLocation: true,
      findAllMatches: true,
      useExtendedSearch: true,
      ignoreFieldNorm: true,
      tokenize: true,
      tokenSeparator: /[^\w]/,
      limit: 20
    };

    const fuse = new Fuse(coursesData.map((course) => ({ ...course, course_name: course.course_name.toLowerCase() })), fuseOptions);
    const fuzzyResults = fuse.search(query);
    
    const filteredResults = fuzzyResults.map((result) => result.item);
    if (filteredResults.length >= 8){
      const limitedFilterResults = filteredResults.slice(0,6);
      setSearchResults(limitedFilterResults);
    }else{
      setSearchResults(filteredResults);
    }

    console.log("FILTERED RESULTS: ", filteredResults);
  };

    return (
        <>
            {/* <Navbar /> */}
            
            {/* Search Function */}
            <div style={styles.homeHeader}>
              <div>
              <div style={styles.logo}></div>
              <div className= "search">
                <div className="searchInputs">
                  <input 
                    type='text' 
                    className="search-input"
                    placeholder= "Enter a course name..."
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
            </div>    

            <CardList cards={searchResults} />
            <div style={{display: 'flex', flexDirection:'row', width: '80%', height: 'auto', justifyContent: 'center', backgroundColor: 'transparent'}}>
              <div>
                <div style={{backgroundImage: `url(${ExploreClasses})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', width:'35vw', height:'50vh', backgroundColor: 'transparent'}}></div>
                <h1 style={{textAlign: 'center'}}>STUDY SMART</h1>
              </div>
              <div>
                <div style={{backgroundImage: `url(${DownloadResource})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', width:'35vw', height:'50vh', backgroundColor: 'transparent'}}></div>
                <h1 style={{textAlign: 'center'}}>DOWNLOAD RESOURCES</h1>
              </div>
              <div>
                <div style={{backgroundImage: `url(${StudySmart})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'contain', width:'35vw', height:'50vh', backgroundColor: 'transparent'}}></div>
                <h1 style={{textAlign: 'center'}}>STUDY SMART</h1>
              </div>
            
            </div>


            <Footer />
        </>
    );

}

export default HomePage;

const styles ={
  homeHeader:{
    height: "80vh",
    width: "100vw",
     
    // opacity: '0.8',
    backgroundColor: '#880808',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo:{
    // backgroundImage: `url(${Logo})`,
    // backgroundPosition: 'center', 
    // backgroundRepeat: 'no-repeat', 
    // backgroundColor: 'rgba(128, 128, 128, 0.2)',
    backgroundImage: `url(${HomeHeader})`,
    backgroundPosition: 'center', 
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '60vh'
  }
}