import styles from "./JournalForm.module.css";
import Button from "../Button/Button"
import { useState } from "react";
import cn from "classnames";

function JournalForm({onSubmit}) {

  const [formValidState, setFormValidState] = useState({
    title: true,
    text: true,
    date: true
  })

  const addJournalItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    let isValid = true;
    if(!formProps.title?.trim().length){
      setFormValidState(state => ({...state, title: false}));
      isValid = false;
    } else {
      setFormValidState(state => ({...state, title: true}));
    }
    if(!formProps.text?.trim().length){
      setFormValidState(state => ({...state, text: false}));
      isValid = false;
    } else {
      setFormValidState(state => ({...state, text: true}));
    }
    if(!formProps.date){
      setFormValidState(state => ({...state, date: false}));
      isValid = false;
    } else {
      setFormValidState(state => ({...state, date: true}));
    }

    if(!isValid) {
      return;
    }
    onSubmit(formProps);
  }

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div className={styles['input-wrapper']}>
        <input type="text" name="title" className={cn(styles['input'], styles.title, {
          [styles['invalid']]: !formValidState.title
        })}/>
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="date" className={styles['input-label']}>
          <img src="/date.svg" alt="Иконка календаря" className={styles['input-img']}/>
          <span>Дата</span>
        </label>
        <input id="date" type="date" name="date" className={cn(styles['input'], {
          [styles['invalid']]: !formValidState.date
        })}/>
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="tag" className={styles['input-label']}>
          <img src="/tag.svg" alt="Иконка тега" className={styles['input-img']}/>
          <span>Метки</span>
        </label>
        <input id="tag" type="text" name="tag" className={styles['input']}/>
      </div>
      <textarea name="text" rows="10" className={cn(styles['input'], styles['input-post'], {
        [styles['invalid']]: !formValidState.text
      })}></textarea>
      <Button text="Сохранить"/>
    </form>
  )
}

export default JournalForm;