// in this code is missing a bug with the Id update. and edit option.

// Importing necessary React components and dependencies
import React, {useState, Fragment, useEffect} from "react";
import "./App.css";
import 'reactjs-popup/dist/index.css';
import ReadOnlyRow from "./component/ReadOnlyRow";
import EditableRow from "./component/EditableRow"

// Main functional component App
const App= () => {
  
  // State hooks for managing contacts data, 
  // form data for adding and editing contacts,
  // and the ID of the contact being edited
  const [contacts, setContacts] = useState([]);
  const [contactsId, setContactsId] = useState(null)
  const [addFormData, setAddFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    role: '',
  }); 

  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    role: '',
  });

  const [editContactId, setEditContactId] = useState(null);
  const [isPopupOpen, setPopup] = useState(false);
  const openPopup = () => {
    if (isPopupOpen === true) {setPopup(false); return}
    else
    setPopup(true);
  };


  // get data from server
  async function getData() {
    const response = await fetch('http://localhost:8080/data')
    const data = await response.json();
    setContacts(data)
    if (contactsId === null) {setContactsId((data.length) + 1)}
  }

  useEffect(() => {
    getData()
  }, []);


  // Handler for changes in the add contact form
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const filedName = event.target.getAttribute('name')
    const fieldValue = event.target.value;

    const newFormData = {...addFormData}
    newFormData[filedName] = fieldValue;

    setAddFormData(newFormData);
    }

  // Handler for submitting the add contact form
  const handleAddFormsubmit = async (event) => {
    event.preventDefault();

    const newContact = {
      id: contactsId,
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
      role: addFormData.role,
    };
    const response = await fetch('http://localhost:8080/new-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        // If the response is successful, fetch the updated data
        setContactsId(contactsId + 1)
        await getData();
        // Clear the form data
        setAddFormData({
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          role: '',
        });}



    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  }

  // Handler for submitting the edit contact form
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
      role: editFormData.role
    }

    const newContacts = [...contacts]

    const index = contacts.findIndex((contact)=> contact.id === editContactId)
  
    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null)
  }


  const handleDeleteClick = async (contactId) => {
    
      // Make a DELETE request to the server endpoint
      const response = await fetch(`http://localhost:8080/delete-contact/${contactId}`, {
        method: 'DELETE',
      });
  
      // If the response is successful, fetch the updated data
      await getData();
       
  };



  // JSX structure for rendering the contacts table 
  // and the add contact form using Popup
  return (
  <div className="app-container">
    <form onSubmit={handleEditFormSubmit}>
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact)=>  (
          <Fragment>
            {editContactId === contact.id ? ( 
            <EditableRow 
            editFormData={editFormData} 
            setEditFormData={setEditFormData}
            setEditContactId={setEditContactId}
            /> 
            ) : (
            <ReadOnlyRow 
              contact={contact} 
              setEditFormData={setEditFormData}
              setEditContactId={setEditContactId}
              handleDeleteClick={handleDeleteClick}
              
            />
            )} 
          </Fragment>
          ))}
        </tbody>
      </table>
    </form>
    <div>
      <button onClick={openPopup}>Add a student</button>

        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <p>          
                <form onSubmit={handleAddFormsubmit}>
                <div>
                    <div>
                      <label htmlFor="firstName">First Name:</label>
                      <input 
                        type="text" 
                        name="firstName" 
                        required="required" 
                        placeholder="Enter a name..."
                        onChange={handleAddFormChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="lastName">Last Name:</label>
                      <input 
                        type="text" 
                        name="lastName" 
                        required="required" 
                        placeholder="Enter the last name..."
                        onChange={handleAddFormChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="phoneNumber">Phone Number:</label>
                      <input 
                        type="text" 
                        name="phoneNumber" 
                        required="required" 
                        placeholder="Enter a phone number..."
                        onChange={handleAddFormChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="email">Email:</label>
                      <input 
                        type="text" 
                        name="email" 
                        required="required" 
                        placeholder="Enter an email..."
                        onChange={handleAddFormChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="role">Role:</label>
                      <input 
                        type="text" 
                        name="role" 
                        required="required" 
                        placeholder="Enter a role..."
                        onChange={handleAddFormChange}
                      />
                    </div>
                  </div>

                <button type="submit">Add</button>
               </form></p>
              <button onClick={openPopup}>Close</button>
            </div>
          </div>
        )}
    </div>
  </div>
  )
};

export default App;
