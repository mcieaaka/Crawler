import {useState,useEffect} from 'react'
import BlogList from "../BlogList/BlogList"
import {Typewriter} from 'react-simple-typewriter'

const Saved = () => {
    const [isLoaded,setisLoaded]=useState(false);
    const [isLoading,setisLoading]=useState(false);
    const [blogs,setBlogs] = useState([]);

    useEffect(()=>{
        setisLoading(true);
        fetch('http://54.84.249.68:4000/saved',{
            method:'GET'
        })
        .then(res=>{
            return res.json();
        })
        .then(data=>{
                setBlogs(data)
                setisLoading(false);
                setisLoaded(true)
        })
    }, [])
    return ( 
        <>
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
        </>
     );
}
 
export default Saved;