import "./JournalForm.css";
import Button from "../Button/Button"
import { useState } from "react";

function JournalForm({onSubmit}) {

  const [inputData, setInputData] = useState("");

  const addJournalItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    onSubmit(formProps);     // Здесь вызываем ф-ю
  }

  return (
    <form className="journal-form" onSubmit={addJournalItem}>
      <input type="text" name="title" />
      <input type="date" name="date" />
      <input type="text" name="tag" />
      <textarea name="text" cols="30" rows="10"></textarea>
      <Button text="Сохранить"/>
    </form>
  )
}

export default JournalForm;