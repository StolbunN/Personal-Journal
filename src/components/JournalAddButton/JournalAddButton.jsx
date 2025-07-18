import CardButton from '../CardButton/CardButton';
import styles from './JournalAddButton.module.css';

function JournalAddButton({clearForm}) {

  return (
    <CardButton className={styles['journal-add']} onClick={clearForm}>
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4.96265V16.6293" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.16669 10.796H15.8334" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Новое воспоминание
    </CardButton>
  );
}

export default JournalAddButton;