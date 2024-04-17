import BlogPreview from "../../components/blogs/BlogPreview.jsx";
import blogImage1 from "../../assets/blog-image-1.jpg";
import blogImage2 from "../../assets/blog-image-2.jpg";
import blogImage3 from "../../assets/blog-image-3-chef.jpg";
import './BlogsOverview.css';

const BlogsOverview = () => {
    return (
        <>
            <main className="outer-container">
                <section className="inner-container">
                <h2>Alle blogs</h2>

                <div className="blogs-overview-wrapper">
                    <BlogPreview
                        srcImg={blogImage1}
                        title="De kracht van fruit in de keuken"
                        previewContent="Fruit. Wellicht niet het meest voor de handliggende ingrediënt op de dinertafel. Toch kan het juiste detail fruit precies datgene zijn wat een gerecht nodig heeft."
                    />

                    <BlogPreview
                        srcImg={blogImage2}
                        title="Ontdek onze barista geheimen"
                        previewContent="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores debitis hic iure lorem."
                    />

                    <BlogPreview
                        srcImg={blogImage3}
                        title="De chef aan het woord"
                        previewContent="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores debitis hic iure lorem."
                    />
                </div>
                </section>
            </main>


        </>
    );
};

export default BlogsOverview;