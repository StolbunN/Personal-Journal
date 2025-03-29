import styles from "./JournalForm.module.css";
import Button from "../Button/Button"
import { useEffect, useReducer } from "react";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";


function JournalForm({onSubmit}) {

  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;


  useEffect(() => {
    let timerId;
    if(!isValid.title || !isValid.post || !isValid.date) {
      timerId = setTimeout(() => {
        dispatchForm({type: "RESET_VALIDITY"})
      }, 2000)
    }
    return () => {
      clearTimeout(timerId);
    }
  }, [isValid])

  useEffect(() => {
    if(isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({type: "CLEAR"})
    }
  }, [isFormReadyToSubmit, values, onSubmit])

  const inputChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: {[e.target.name]: e.target.value}
    })
  }

  const addJournalItem = (event) => {
    event.preventDefault();
    dispatchForm({type: "SUBMIT"})
  }

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div className={styles['input-wrapper']}>
        <input type="text" value={values.title} onChange={inputChange} name="title" className={cn(styles['input'], styles['title'], {
          [styles['invalid']]: !isValid.title
        })}/>
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="date" className={styles['input-label']}>
          <img src="/date.svg" alt="Иконка календаря" className={styles['input-img']}/>
          <span>Дата</span>
        </label>
        <input id="date" value={values.date} onChange={inputChange} type="date" name="date" className={cn(styles['input'], {
          [styles['invalid']]: !isValid.date
        })}/>
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="tag" className={styles['input-label']}>
          <img src="/tag.svg" alt="Иконка тега" className={styles['input-img']}/>
          <span>Метки</span>
        </label>
        <input id="tag" value={values.tag} onChange={inputChange} type="text" name="tag" className={styles['input']}/>
      </div>
      <textarea name="post" value={values.post} onChange={inputChange} rows="10" className={cn(styles['input'], styles['input-post'], {
        [styles['invalid']]: !isValid.post
      })}></textarea>
      <Button text="Сохранить"/>
    </form>
  )
}

export default JournalForm;