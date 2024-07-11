// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

const ApiUrl = "https://api.unsplash.com/search/photos";
const ApiKey = "rVaM0oPaoAYBbZMo_w7LHPjHdIfk0rfsI6uNbNt8WZ0";
const imagePerPAge = 20;

const Home = () => {
  const searching = useRef(null);

  const [img, setImg] = useState([]);
  const [Totalpage, setTotalpage] = useState(0);
  const [page, setPage] = useState(1);
  const [errMsg, SetErrMsg] = useState('')

  const getImage = useCallback(async () => {
    try {
      if(searching.current.value){
        SetErrMsg('')
        const { data } = await axios.get(
        `${ApiUrl}?query=${searching.current.value}&page=${page}&per_page=${imagePerPAge}&client_id=${ApiKey}`
      );
      setImg(data.results);
      console.log(data.results)
      setTotalpage(data.total_pages);
      }
      
    } catch (error) {
      SetErrMsg('Something is Wrong!, Try again later')
      console.log(error);
    }
  },[page]);

  const handleSearch = (evt) => {
    evt.preventDefault();
    console.log(searching.current.value);
    setPage(1)
    getImage()
  };

  useEffect(()=>{
    getImage();
  },[getImage, page])

  const handleSlection = (selection) => {
    searching.current.value = selection;
    setPage(1)
    getImage()
  };
console.log(page)
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center justify-center">
      <div className="">
        <h1 className="text-7xl font-medium m-10">Image Search</h1>
      {errMsg && <p className="text-red-600">{errMsg}</p>}
      </div>
      <div className="mt-10">
        <button className="bg-sky-900 text-2xl text-white px-5 py-2 rounded-lg mr-5 hover:bg-sky-700  active:bg-sky-950 focus:outline-none focus:ring focus:ring-sky-200 duration-500" onClick={() => handleSlection("car")}>Car</button>
        <button className="bg-sky-900 text-2xl text-white px-5 py-2 rounded-lg mr-5 hover:bg-sky-700  active:bg-sky-950 focus:outline-none focus:ring focus:ring-sky-200 duration-500" onClick={() => handleSlection("bike")}>Bike</button>
        <button className="bg-sky-900 text-2xl text-white px-5 py-2 rounded-lg mr-5 hover:bg-sky-700  active:bg-sky-950 focus:outline-none focus:ring focus:ring-sky-200 duration-500" onClick={() => handleSlection("sun")}>Sun</button>
        <button className="bg-sky-900 text-2xl text-white px-5 py-2 rounded-lg mr-5 hover:bg-sky-700  active:bg-sky-950 focus:outline-none focus:ring focus:ring-sky-200 duration-500" onClick={() => handleSlection("moon")}>Moon</button>
      </div>
      <div>
        <form onSubmit={handleSearch}>
          <input
            className="w-96 rounded-md text-2xl px-4 py-2 m-10  active:bg-sky-200 focus:outline-none focus:ring focus:ring-sky-800 duration-500"
            type="search"
            placeholder="Type something to search.."
            ref={searching}
          />
        </form>
      </div>

      <div className="flex items-center justify-center flex-wrap gap-2 bg-sky-200 py-20">
        {img.map((images) => (
          <a key={images.id} href={images.links.download}target="_blank">  <img
          className="object-cover h-96 w-96 transition duration-500 p-2 hover:scale-105"
            src={images.urls.small}
            alt={images.alt_description}
          /></a>
          
        
        ))}
      </div>

      <div>
        {page >1 && <button className="bg-sky-900 text-2xl text-white px-6 py-3 rounded-lg mx-5 my-10 hover:bg-sky-700  active:bg-sky-950 focus:outline-none focus:ring focus:ring-sky-200 duration-500" onClick={()=>setPage(page-1)}>Prev</button>}
        {page < Totalpage && <button className="bg-sky-900 text-2xl text-white px-5 py-2 rounded-lg mx-5 my-10 hover:bg-sky-700  active:bg-sky-950 focus:outline-none focus:ring focus:ring-sky-200 duration-500" onClick={()=>setPage(page+1)}>Next</button>}
      </div>

    </div>
  );
};

export default Home;
