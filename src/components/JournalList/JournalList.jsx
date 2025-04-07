import styles from "./JournalList.module.css";
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { UserContext } from "../../context/user.context";
import { useContext } from "react";

function JournalList({ items, setCurrentItem }) {

  const {userId} = useContext(UserContext)

  if(items.length === 0) {
    return <p>Пока записей нет. Добавьте свою первую запись :)</p>
  }


  const sortItem = (a, b) => {
    if(a.date > b.date) {
      return -1;
    } else {
      return 1;
    }
  }

  if(items.length > 0) {
    return (
      <div className={styles['journal-list']}>
          {items
          .filter(item => item.userId === userId)
          .sort(sortItem)
          .map((journalItem) => (
          <CardButton key={journalItem.id} onClick={() => setCurrentItem(journalItem)}>
            <JournalItem
              title={journalItem.title}
              post={journalItem.post}
              date={journalItem.date}
            />
          </CardButton>
          )
        )}
      </div>
    )
  }
}

export default JournalList;