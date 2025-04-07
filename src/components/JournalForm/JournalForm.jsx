import styles from "./JournalForm.module.css";
import Button from "../Button/Button"
import Input from "../Input/Input";
import { useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";


function JournalForm({onSubmit, currentItem, onDelete}) {

  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  const titleRef = useRef(null);
  const dateRef = useRef(null);
  const postRef = useRef(null);

  const {userId} = useContext(UserContext);

  useEffect(() => {
    let timerId;
    if(!isValid.title || !isValid.post || !isValid.date) {
      onFocus(isValid);
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
      dispatchForm({type: "CLEAR"});
      dispatchForm({
        type: "SET_VALUE",
        payload: {userId}
      })
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId])

  useEffect(() => {
    dispatchForm({
      type: "SET_VALUE",
      payload: {userId}
    })
  }, [userId])

  useEffect(() => {
    if(!currentItem) {
      dispatchForm({type: "CLEAR"});
      dispatchForm({
        type: "SET_VALUE",
        payload: {userId}
      })
    }
      dispatchForm({
        type: "SET_VALUE",
        payload: { ...currentItem }
      })
  }, [currentItem])

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

  const onFocus = (isValid) => {
    switch(true) {
      case !isValid.title: {
        titleRef.current.focus();
        break;
      }
      case !isValid.date: {
        dateRef.current.focus();
        break;
      }
      case !isValid.post: {
        postRef.current.focus();
        break;
      }
    }
  }

  const deleteJournalItem = () => {
    onDelete(currentItem.id);
    dispatchForm({type: "CLEAR"});
    dispatchForm({
      type: "SET_VALUE",
      payload: {userId}
    })
  }

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div className={cn(styles['input-wrapper'], styles['input-wrapper__title'])}>
        <Input type="text" ref={titleRef} isValid={isValid.title} value={values.title} onChange={inputChange} name="title" appearance={"title"}/>
        {currentItem?.id && <button className={styles['delete']} type="button" onClick={deleteJournalItem}>
          <img src="/archive.svg" alt="Кнопка удалить" />
        </button>}
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="date" className={styles['input-label']}>
          <img src="/date.svg" alt="Иконка календаря" className={styles['input-img']}/>
          <span>Дата</span>
        </label>
        <Input id="date" ref={dateRef} isValid={isValid.date} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} onChange={inputChange} type="date" name="date"/>
      </div>
      <div className={styles['input-wrapper']}>
        <label htmlFor="tag" className={styles['input-label']}>
          <img src="/tag.svg" alt="Иконка тега" className={styles['input-img']}/>
          <span>Метки</span>
        </label>
        <input id="tag" value={values.tag} onChange={inputChange} type="text" name="tag" className={styles['input']}/>
      </div>
      <textarea name="post" ref={postRef} value={values.post} onChange={inputChange} rows="10" className={cn(styles['input'], styles['input-post'], {
        [styles['invalid']]: !isValid.post
      })}></textarea>
      <Button text="Сохранить"/>
    </form>
  )
}

export default JournalForm;