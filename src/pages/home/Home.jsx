import './Home.css';
import restaurantOverview from '../../assets/the-restaurant-overview.jpg';
import blogImage1 from '../../assets/blog-image-1.jpg';
import blogImage2 from '../../assets/blog-image-2.jpg';
import blogImage3 from '../../assets/blog-image-3-chef.jpg';
import Review from "../../components/review/Review.jsx";
import BlogPreview from "../../components/blogs/BlogPreview.jsx";

const Home = () => {
    return (
        <>
            <main>
                <section className="outer-container">
                    <span className="img-wrapper">
                    <img src={restaurantOverview} alt="The restaurant"/>
                        </span>
                </section>

                <section className="outer-container">
                    <div className="text-about">
                        <p className="p-left">
                            Bij 'The restaurant' hopen wij een culinaire reis te bieden door de rijke smaken en aroma's van het Midden-Oosten, gevestigd in het hart van de stad. Een unieke ervaring waarbij traditie en innovatie samenkomen in elk gerecht dat we serveren.

                            Onze menukaart is een eerbetoon aan de diverse keukens van het Midden-Oosten, met gerechten die zijn geïnspireerd door de culinaire tradities van landen zoals Libanon, Turkije, Iran en Syrië. Al onze gerechten zijn bereid met verse ingrediënten en kruiden die zorgen voor een explosie van smaken in elke hap.

                            We streven naar perfectie in elk gerecht dat onze keuken verlaat. Ons getalenteerde team van chefs combineert traditionele recepten met moderne kooktechnieken om gerechten te creëren die zowel verrassend als vertrouwd zijn.
                        </p>
                        <p className="p-right">
                            Of u nu komt voor een intiem diner voor twee, een feestelijke gelegenheid met vrienden of een zakelijke bijeenkomst, ons restaurant biedt een warme en gastvrije ambiance die perfect past bij de heerlijke gerechten die we serveren.

                            Ontdek de betoverende smaken van het Midden-Oosten en laat uw smaakpapillen verwennen door onze culinaire hoogstandjes. We heten u van harte welkom en kijken ernaar uit om u te mogen verwennen met onze gerechten.
                        </p>
                    </div>
                </section>

                <section className="section-blog-preview outer-container">
                    <div className="inner-container">

                        <div className="articles-wrapper">
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

                        <button className="btn-all-blogs" type="button">Alle blogs bekijken</button>

                    </div>
                </section>

                <section className="outer-container">

                    <div className="review-slider">
                        <Review
                            content="Lekker eten, gezellige sfeer! Ik kom zeker nog eens terug."
                            reviewerName="Marina de Vries"
                        />

                        <Review
                            content="Heel sfeervol restaurant met vriendelijk personeel."
                            reviewerName="Jantje"
                        />

                        <Review
                            content="Top!"
                            reviewerName="Piet Klaassen"
                        />

                        {/*<Review*/}
                        {/*    content="Heel sfeervol restaurant met vriendelijk personeel."*/}
                        {/*    reviewerName="Jantje"*/}
                        {/*/>*/}
                    </div>

                </section>
            </main>

            <footer className="outer-container">
                <div className="footer-inner-wrapper">

                    <div>
                        <h4>Openingstijden</h4>
                        <p>Maandag t/m donderdag 11:00 - 23:00</p>
                        <p>Vrijdag en zaterdag 10:00 - 01:00</p>
                        <p>Zondag 10:00 - 00:00</p>

                    </div>

                    <div className="footer-socials">
                        <p>Come and join the community!</p>
                    </div>

                    <div>
                        <h4>Adres</h4>
                        <p>Vogellaan 1</p>
                        <p>1234 AB Haarlem</p>
                        <p>023 - 123 45 67</p>
                        <p>contact@therestaurant.nl</p>
                    </div>
                </div>
            </footer>

        </>
    );
};

export default Home;