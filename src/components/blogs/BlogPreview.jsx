import {Link} from "react-router-dom";
import './BlogPreview.css';

const BlogPreview = ({srcImg, title, previewContent}) => {
    return (
        <>
            <article className="article-preview">
                <img src={srcImg} alt={title}/>
                <h3>{title}</h3>
                <p className="p-article-preview">
                    {previewContent}
                </p>
                <Link className="a-readmore" to="/">Lees meer...</Link>
            </article>
        </>
    );
};

export default BlogPreview;