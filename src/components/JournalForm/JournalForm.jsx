import styles from "./JournalForm.module.css";
import Button from "../Button/Button"
import { useEffect, useState } from "react";
import cn from "classnames";

const INITIAL_STATE = {
  title: true,
  post: true,
  date: true
}

function JournalForm({onSubmit}) {

  const [formValidState, setFormValidState] = useState(INITIAL_STATE);

  useEffect(() => {
    let timerId;
    if(!formValidState.title || !formValidState.post || !formValidState.date) {
      timerId = setTimeout(() => {
        console.log("очистка")
        setFormValidState(INITIAL_STATE)
      }, 2000)
    }
    return () => {
      clearTimeout(timerId);
    }
  }, [formValidState])

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
    if(!formProps.post?.trim().length){
      setFormValidState(state => ({...state, post: false}));
      isValid = false;
    } else {
      setFormValidState(state => ({...state, post: true}));
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
        <input type="text" name="title" className={cn(styles['input'], styles['title'], {
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
      <textarea name="post" rows="10" className={cn(styles['input'], styles['input-post'], {
        [styles['invalid']]: !formValidState.post
      })}></textarea>
      <Button text="Сохранить"/>
    </form>
  )
}

export default JournalForm;