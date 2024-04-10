import React from 'react'

const ReadOnlyRow = ({ contact, setEditFormData, setEditContactId, handleDeleteClick }) => {
    // Handler for initiating the edit mode for a contact
    const handleEditClick = (event, contact)=> {
      event.preventDefault(); 
      setEditContactId(contact.id);
  
      const formValues = {
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber,
        email: contact.email,
        role: contact.role,
      }
  
      setEditFormData(formValues)
    }


    return (  
      <tr>
        <td>{contact.firstName}</td>
        <td>{contact.lastName}</td>
        <td>{contact.phoneNumber}</td>
        <td>{contact.email}</td>
        <td>{contact.role}</td>
        <td>
          <button 
          type='button' 
          onClick={(event)=> handleEditClick(event, contact)}
          >
            Edit
          </button>
          <button type='buttun' onClick={()=> handleDeleteClick(contact.id)} >
            Delete</button>
        </td>
      </tr>  
    )
}

export default ReadOnlyRow