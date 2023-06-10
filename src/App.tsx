import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import DynamicList, { ListItem } from './components/TaskList/DynamicListProps';
import Footer from './components/Footer/Footer';
import TaskPage from './components/TaskPage/TaskPage';

const App: React.FC = () => {
  const [listItems, setListItems] = useState<ListItem[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    if (savedTasks) {
      setListItems(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(listItems));
  }, [listItems]);

  const addItemToList = (title: string, text: string) => {
    const newItem: ListItem = {
      id: generateId(),
      title,
      text,
      description: '', 
    };
    setListItems((prevListItems) => [...prevListItems, newItem]);
  };

  const moveItemToNext = (item: ListItem, nextTitle: string) => {
    const updatedItems: ListItem[] = listItems.map((listItem) => {
      if (listItem === item) {
        return { ...listItem, title: nextTitle };
      }
      return listItem;
    });
    setListItems(updatedItems);
  };

  const handleCardClick = (item: ListItem) => {

  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div className="cards-container">
                <DynamicList
                  title={'Backlog'}
                  listItems={listItems}
                  addItemToList={addItemToList}
                  moveItemToNext={moveItemToNext}
                  handleCardClick={handleCardClick}
                />
                <DynamicList
                  title={'Ready'}
                  listItems={listItems}
                  addItemToList={addItemToList}
                  moveItemToNext={moveItemToNext}
                  handleCardClick={handleCardClick}
                />
                <DynamicList
                  title={'In Progress'}
                  listItems={listItems}
                  addItemToList={addItemToList}
                  moveItemToNext={moveItemToNext}
                  handleCardClick={handleCardClick}
                />
                <DynamicList
                  title={'Finished'}
                  listItems={listItems}
                  addItemToList={addItemToList}
                  moveItemToNext={moveItemToNext}
                  handleCardClick={handleCardClick}
                />
              </div>
            }
          />
          <Route
            path="/task/:taskId"
            element={<TaskPage listItems={listItems} setListItems={setListItems} />}
          />
        </Routes>
        <Footer
          activeTasks={listItems.filter((item) => item.title === 'Backlog').length}
          finishedTasks={listItems.filter((item) => item.title === 'Finished').length}
          backlogTasks={listItems.filter((item) => item.title === 'Backlog').length}
          authorName="Alexey Korsakov"
          year={2023}
        />
      </div>
    </Router>
  );
};

export default App;

// Генерир IDшник
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}