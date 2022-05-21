import {useEffect,useState} from 'react'
import './Recommend.css'

const Recommend = (url) => {
    const [tags,setTags]=useState(null);
    const [isLoaded,setisLoaded]=useState(false);
    useEffect(() =>{
        fetch("http://localhost:5000/"+url.url)
        .then(res =>{return res.json()})
        .then(data => {
            setTags(data)
            setisLoaded(true)
        })
    },[url])
    return ( 
        <>
            <div className="recDiv">
                <p>Tags you may explore:</p>
                {isLoaded && tags.map((tag)=>(
                    <div>{tag}</div>
                ))}
            </div>
        </>
     );
}
 
export default Recommend;