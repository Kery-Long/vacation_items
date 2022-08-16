import Avatar from "../../components/Avatar"
// import { useFirestore } from "../../hooks/useFirestore"
import { useHistory } from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext";
import { projectFirestore } from "../../firebase/config";
import trash from '../../assets/delete.svg';

export default function ProjectSummary({ project }) {
  // const { deleteDocument } = useFirestore('projects')
  const { user } = useAuthContext()
  const history = useHistory()

  const handleClick = (id) => {
    projectFirestore.collection('projects').doc(id).delete()
    history.push('/')
  }


  return (
    

      <div className="project-summary">
        <div className="icons">
          <img src={trash}  
          className = "trash" 
          onClick={() => handleClick(project.id)}
          alt="delete icon" />
      
        </div>
        <h2 className="page-title">{project.name}</h2>
        
        
        {/* <p className="due-date">
          Potential date: {project.dueDate.toDate().toDateString()}
        </p> */}
        <p className="details">
          {project.details}
        </p>
        
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project?.assignedUsersList?.map(user => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
            </div>
          ))}
        </div>
      
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>Mark as Complete</button>
      )}
      </div>
   
  )
}