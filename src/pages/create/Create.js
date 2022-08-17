import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
// import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router'
import Select from 'react-select'

// styles
import './Create.css'

const categories = [
  { value: 'tour', label: 'tour' },
  { value: 'sight-seeing', label: 'sight-seeing' },
  { value: 'sports', label: 'sports' },
  
]
const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "#e8dec5",
    // Overwrittes the different states of border
    borderColor: state.isFocused ? "orange" : "#0b56a4",
    // Removes weird border around container
    boxShadow: state.isFocused ? null : null,
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "red" : "blue"
    }
  })
};

export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('projects')
  const { user } = useAuthContext() 
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  // const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  // const [assignedUsers, setAssignedUsers] = useState([])
  const [cost, setCost] = useState('')
  const [link, setLink] = useState('')
  const [formError, setFormError] = useState(null)

  // create user values for react-select
  useEffect(() => {
    if(documents) {
      setUsers(documents.map(user => {
        return { value: {...user, id: user.id}, label: user.displayName }
      }))
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError('Please select a project category.')
      return
    }
    // if (assignedUsers.length < 1) {
    //   setFormError('Please assign the project to at least 1 user')
    //   return
    // }

    // const assignedUsersList = assignedUsers.map(u => {
    //   return { 
    //     displayName: u.value.displayName, 
    //     photoURL: u.value.photoURL,
    //     id: u.value.id
    //   }
    // })
    const createdBy = { 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      id: user.uid
    }

    const project = {
      name,
      details,
      // assignedUsersList, 
      cost,
      link,
      createdBy,
      category: category.value,
      // dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: []
    }

    await addDocument(project)
    if (!response.error) {
      history.push('/')
    }
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new option</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Option name:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Option Details:</span>
          <textarea 
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details} 
          ></textarea>
        </label>
        <label>
          <span>Option cost:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setCost(e.target.value)}
            value={cost}
          />
        </label>

        <label>
          <span>Link:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
        </label>
        {/* <label>
          <span>Set due date:</span>
          <input
            required 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} 
            value={dueDate}
          />
        </label> */}
        <label>
          <span>Option category:</span>
          <Select
          styles={customStyles}
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
        {/* <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </label> */}

        <button className="btn">Add option</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}
