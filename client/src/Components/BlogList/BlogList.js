import { Link } from "react-router-dom";
import "./BlogList.css"

const BlogList = ({blogsarr}) => {
    
    // console.log(blogsarr)
    return (
        <>
            <p className="resCount">Results found: {blogsarr.length}</p>
            {blogsarr.map((blog)=>(
                <>
                    <div className="blogCard">
                        <h2>{blog.title}</h2>
                        <p>{blog.intro}</p>
                        <a className="btn btnType3" href={"https://medium.com"+blog.link} target="_blank" rel="noreferrer">View whole article on Medium</a>
                        <Link className="btn btnType2" to={"/view/?link="+blog.link}>Scrape Whole article</Link>
                    </div>
                    <div className="sepLine"></div>
                </>
            ))}
        </>
    );
}
 
export default BlogList;