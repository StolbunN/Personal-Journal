import "./JournalList.css";
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList({ items }) {

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
      <div className="journal-list">
          {items.sort(sortItem).map((journalItem) => (
          <CardButton key={journalItem.id}>
            <JournalItem
              title={journalItem.title}
              text={journalItem.text}
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