import './Review.css';
const Review = ({content, reviewerName }) => {
    return (
        <>
            <div className="review">
                <p className="p-review-content">
                    {content}
                </p>
                <p className="p-review-undertitle">- {reviewerName}</p>
            </div>
        </>
    );
};

export default Review;