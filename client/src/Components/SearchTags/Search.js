import {useState} from "react";
import BlogList from "../BlogList/BlogList";
import './Search.css'
import {Typewriter} from "react-simple-typewriter"
import Recommend from "../Recommend/Recommend";

const Search = () => {
    const [tag,setTag]=useState('');
    const [isLoaded,setisLoaded]=useState(false);
    const [isLoading,setisLoading]=useState(false);
    const [blogs,setBlogs] = useState([]);
    const handleSubmit = (e)=>{
        setisLoading(true);
        e.preventDefault();
        fetch('http://3.83.216.2:4000/search/'+tag)
        .then(res=>{
            return res.json();
        })
        .then(data=>{
                setBlogs(...blogs,data)
                setisLoading(false);
                setisLoaded(true)
        })
    }

    return ( 
        <>
            <div className="searchForm">
                <form onSubmit={handleSubmit}>
                    <label>Tag:</label>
                    <input
                    type="text"
                    required
                    value={tag}
                    onChange={(e)=>setTag(e.target.value)}
                    />
                    <button className="btn btnType1">Search</button>
                </form>
            </div>
            {isLoading && <div className="loadDiv"><Typewriter
                cursor
                cursorStyle="."
                loop = {1}
                typeSpeed={90}
                deleteSpeed={30}
                delaySpeed={90}
                words={["Loading"]}
            /></div>}
            {isLoaded && <BlogList blogsarr={blogs}/> }
            {isLoaded && <Recommend url={tag}/>}
        </>
     );
}
 
export default Search;