import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './main.css';

export interface ListItem {
  id: string;
  title: string;
  text?: string;
  description?: string;
}

interface DynamicListProps {
  title: string;
  listItems: ListItem[];
  addItemToList: (title: string, text: string) => void;
  moveItemToNext: (item: ListItem, nextTitle: string) => void;
  handleCardClick?: (item: ListItem) => void;
}

const DynamicList: React.FC<DynamicListProps> = ({
  title,
  listItems,
  addItemToList,
  moveItemToNext,
  handleCardClick,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [submitActive, setSubmitActive] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [filteredItems, setFilteredItems] = useState<ListItem[]>([]);

  useEffect(() => {
    setFilteredItems(
      listItems.filter((item) => item.title.toLowerCase() === title.toLowerCase())
    );
  }, [listItems, title]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSubmitActive(event.target.value.trim() !== '');
  };

  const handleAddCard = () => {
    setShowInput(true);
    setInputValue('');
    setActiveCardIndex(null);
    setSubmitActive(false);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      addItemToList(title, inputValue.trim());
      setInputValue('');
      setShowInput(false);
      setSubmitActive(false);
    }
  };

  const handleCancel = () => {
    setInputValue('');
    setShowInput(false);
    setSubmitActive(false);
  };

  const handleSelectItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedText = event.target.value;
    const selectedItem = listItems.find((item) => item.text === selectedText);
    if (selectedItem) {
      moveItemToNext(selectedItem, title);
    }
  };

  const handleCardClickInternal = (index: number) => {
    setActiveCardIndex(index);
    const item = filteredItems[index];
    if (handleCardClick && item) {
      handleCardClick(item);
    }
  };


  const getPreviousTasks = (): ListItem[] => {
    if (title === 'Ready') {
      return listItems.filter((item) => item.title.toLowerCase() === 'backlog');
    } else if (title === 'In Progress') {
      return listItems.filter((item) => item.title.toLowerCase() === 'ready');
    } else if (title === 'Finished') {
      return listItems.filter((item) => item.title.toLowerCase() === 'in progress');
    } else {
      return [];
    }
  };

  useEffect(() => {
    const addButton = document.querySelector('.container-butt-nav button:first-child');
    if (addButton) {
      if (inputValue.trim() !== '') {
        addButton.textContent = 'Submit';
      } else {
        addButton.textContent = 'Add';
      }
    }
  }, [inputValue]);

  return (
    <div className="cards">
      <h2>{title}</h2>
      <ul>
        {filteredItems.map((item, index) => (
          <li
            key={index}
            className={`${index === activeCardIndex ? 'active' : ''}`}
            onClick={() => handleCardClickInternal(index)}
          >
            <Link to={`/task/${item.id}`}>
              <p>{item.text || item.title}</p>
            </Link>
          </li>
        ))}
        {title.toLowerCase() === 'backlog' && !showInput && (
          <li className="add_card">
            <button className='butt-add' onClick={handleAddCard}>+ Add Card</button>
          </li>
        )}
        {title.toLowerCase() !== 'backlog' && (
          <li className="add_card">
            <select value="" className='dropDown' onChange={handleSelectItem}>
              <option value="">+ Add card</option>
              {getPreviousTasks().map((item, index) => (
                <option key={index} value={item.text || ''}>
                  {item.text || item.title}
                </option>
              ))}
            </select>
          </li>
        )}
        {showInput && (
          <div>
            <li className="add_card_input">
              <input
                className='input-card'
                type="text"
                placeholder="New task title..."
                value={inputValue}
                onChange={handleInputChange}
              />

            </li>
            <div className='container-butt-nav'>
              <button disabled={!submitActive} onClick={handleAddItem}>
                Add
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        )}

      </ul>
    </div>
  );
};

export default DynamicList;
