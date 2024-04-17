import './Buttons.css';
const Button = ({lightOrDark, type, children}) => {
    return (
        <>
            <button className={lightOrDark} type={type}>{children}</button>
        </>
    );
};

export default Button;