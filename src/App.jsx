import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { UserContextProvider } from "./context/user.context"

function mapItems(items) {
  if(!items) {
    return [];
  }
  return items.map(i => ({
    ...i,
    date: new Date(i.date)
  }))
}

function App() {

  const [items, setItems] = useLocalStorage("data");
  const [currentItem, setCurrentItem] = useState({});

  const addItem = (item) => {
    if(!item.id) {
      setItems([...mapItems(items), {
        ...item,
        id: items?.length > 0 ?  Math.max(...items.map(item => item.id)) + 1 : 1,
        date: new Date(item.date)
      }]);
    } else {
      setItems([...mapItems(items).map(i => {
        if(i.id === item.id) {
          return {
            ...item
          } 
        } else {
          return i
        }
      })])
    }
  }

  return (
    <UserContextProvider>
      <div className='app-wrapper'>
        <LeftPanel>
          <Header/>
          <JournalAddButton/>
          <JournalList items={mapItems(items)} setCurrentItem={setCurrentItem}/>
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem} currentItem={currentItem}/>
        </Body>
      </div>
    </UserContextProvider>
  )
}

export default App
