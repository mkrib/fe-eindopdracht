import Button from "../buttons/Button.jsx";
import './AddReviewForm.css';
import {useState} from "react";
import axios from "axios";

const AddReviewForm = () => {
    const [formValues, setFormValues] = useState({
        nameReviewer: '',
        content: '',

        //     TODO username meegeven wanneer login is opgezet

    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    function handleFormChange(e) {
        const changedFieldName = e.target.name;
        const newValue = e.target.value;

        console.log(changedFieldName, newValue);

        setFormValues({
            ...formValues,
            [changedFieldName]: newValue,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const result = await axios.post('http://localhost:8080/reviews', {
                fullName: formValues.nameReviewer,
                content: formValues.content,
                issueDate: new Date(),
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(result);
            setIsSubmitted(true);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }

    return (
        <>
            {!isSubmitted &&
                <form className="form-add-review" onSubmit={handleSubmit}>
                    <label htmlFor="nameReviewer">Naam</label>
                    <input type="text"
                           id="nameReviewer"
                           name="nameReviewer"
                           value={formValues.nameReviewer}
                           onChange={handleFormChange}
                           required/>

                    <label htmlFor="content">Content</label>
                    <textarea className="textarea-review-content"
                              id="content"
                              name="content"
                              value={formValues.content}
                              onChange={handleFormChange}
                              required></textarea>

                    <Button
                        lightOrDark="btn-dark"
                        type="submit"
                    >
                        Verstuur
                    </Button>

                    {error && <p className="p-error">Er ging iets mis met het versturen van uw review. Probeer het opnieuw.</p>}
                </form>
            }

                {isSubmitted &&
                        <p>Bedankt voor het delen van uw ervaring!</p>}

        </>
    );
};

export default AddReviewForm;