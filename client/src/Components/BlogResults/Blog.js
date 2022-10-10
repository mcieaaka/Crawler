import {useSearchParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import {Typewriter} from 'react-simple-typewriter'
import "./Blog.css"

const BlogResults = () => {
    const [searchParams,setSearchParams] = useSearchParams();
    const searchTerm = searchParams.get("link");
    const [isLoaded,setisLoaded]=useState(false);
    const [isLoading,setisLoading]=useState(false);
    const [blog,setBlog]=useState(null);
    useEffect(()=>{
        setisLoading(true);
        fetch("http://3.83.216.2:4000/view/?link="+searchTerm,{
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        })
        .then(res=>{return res.json()})
        .then(data=>{
            setBlog(data);
            setisLoading(false);
            setisLoaded(true)
            // console.log(blog)
        })
    }, [searchTerm])
    // const handleScrape = (searchTerm) => {
        
    // }
    const handleSave = (title,intro,link)=>{
        const blog2save = {title,intro,link};
        // console.log(blog2save);
        fetch("http://3.83.216.2:4000/save",{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog2save)
        }).then((res)=>{
            return res.json();
        })
    }
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
            {isLoaded && 
            <div className="blogDiv">
                <h2>Title: {blog.title}</h2>
                <p>Date: {blog.date}</p>
                <p>Author: {blog.author}</p>
                <p>Author Image: <img src={blog.image} alt="profile" width="50px" /></p>
                <div className="contentDiv">
                    <div>
                        <h2>Headings in this article:{blog.headings.length}</h2>
                        {blog.headings.map((h)=>(
                            <h3>{h}</h3>
                        ))}
                    </div>
                    <div className="sepLine"></div>
                    <div>
                        <h2>Paras in this article: {blog.content_paras.length}</h2>
                        {blog.content_paras.map((c)=>(
                            <p>{c}</p>
                        ))}
                    </div>
                    <div className="sepLine"></div>
                    <div >
                        <h2>Images in this article: {blog.allimages.length}</h2>
                        <div className="allimg-div">
                            {blog.allimages.map((i)=>(
                                <div>
                                    <img src={i} alt={i} width="300px"/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="sepLine"></div>
                </div>
                <button onClickCapture={handleSave(blog.title,blog.content_paras[0],searchTerm)} className="btn btnType4">Mark this Blog</button>
            </div>}
        </>
     );
}
 
export default BlogResults;