import React, { useState } from 'react';
import { useLocation, useParams, useNavigate, Params } from 'react-router-dom';
import { ListItem } from '../TaskList/DynamicListProps';
import './TaskPage.css'
import backImage from '../../img/back.png';

interface TaskParams extends Params {
  taskId: string;
}

interface TaskPageProps {
  listItems: ListItem[];
  setListItems: React.Dispatch<React.SetStateAction<ListItem[]>>;
}

const TaskPage: React.FC<TaskPageProps> = ({ listItems, setListItems }) => {
  const { taskId } = useParams<TaskParams>();
  const navigate = useNavigate();
  const location = useLocation();
  const [editedDescription, setEditedDescription] = useState<string | undefined>(undefined);
  const [isAddingDescription, setIsAddingDescription] = useState(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  // Find the task by taskId
  const task = listItems.find((item) => item.id === taskId);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(event.target.value);
  };

  const handleSaveDescription = () => {
    if (task) {
      const updatedTasks = listItems.map((item) => {
        if (item.id === taskId) {
          return { ...item, description: editedDescription || '' };
        }
        return item;
      });
      setListItems(updatedTasks);
      setIsAddingDescription(false);
    }
  };

  return (
    <div className='container-page'>
      {task ? (
        <>
          <h1>Задача : {task ? task.text : 'Task not found'}</h1>
          {task.description ? (
            <>
              <p className='title-descrip'>Description:</p>
              {isAddingDescription ? (
                <>
                  <textarea className='textarea' value={editedDescription || ''} onChange={handleDescriptionChange} />
                  <button className='save-butt' onClick={handleSaveDescription}>Save</button>
                </>
              ) : (
                <>
                  <p className='text-task'>{task.description}</p>
                  <button className='butt-edit' onClick={() => setIsAddingDescription(true)}>Edit Description</button>
                </>
              )}
            </>
          ) : (
            <>
              <p className='descrip'>This task has no description</p>
              {isAddingDescription ? (
                <>
                  <textarea className='textarea' value={editedDescription || ''} onChange={handleDescriptionChange} />
                  <button className='save-butt' onClick={handleSaveDescription}>Save</button>
                </>
              ) : (
                <button className='add-descrip' onClick={() => setIsAddingDescription(true)}>Add Description</button>
              )}
            </>
          )}
        </>
      ) : (
        <p>Task not found</p>
      )}
      <button className='butt-back' onClick={handleGoBack}>
        <img src={backImage} alt='back-arrow'/>
      </button>
      <div className="cl-btn-1" onClick={handleGoBack}>
        <div>
          <span className="left">
            <span className="circle-left"></span>
            <span className="circle-right"></span>
          </span>
          <span className="right">
            <span className="circle-left"></span>
            <span className="circle-right"></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
