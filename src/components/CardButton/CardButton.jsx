import styles from "./CardButton.module.css";

function CardButton({children, className}) {

  const cl = styles['card-button'] + (className ? " " + className : "")

  return (
    <button className={cl}>
      {children}
    </button>
  )
}

export default CardButton;