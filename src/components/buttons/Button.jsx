import './Buttons.css';
const Button = ({lightOrDark, type, handleClick, children}) => {
    return (
        <>
            <button className={lightOrDark} type={type} onClick={handleClick} >{children}</button>
        </>
    );
};

export default Button;