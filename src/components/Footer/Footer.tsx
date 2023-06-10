import React from 'react';
import './footer.css';

interface FooterProps {
  activeTasks: number;
  finishedTasks: number;
  backlogTasks: number; 
  authorName: string;
  year: number;
}

const Footer: React.FC<FooterProps> = ({
  activeTasks,
  finishedTasks,
  backlogTasks,
  authorName,
  year,
}) => {
  return (
    <footer className="footer">
      <div className="footer-items">
        <p className="act_task">Active tasks: {backlogTasks}</p> 
        <p className="fin_task">Finished tasks: {finishedTasks}</p>
      </div>

      <p className="signature">
        Kanban board by {authorName}, {year}
      </p>
    </footer>
  );
};

export default Footer;
