import React from "react";

const EditableRow = ({editFormData, setEditFormData, setEditContactId }) => {
        // Handler for changes in the edit contact form
        const handleEditFormChange = (event) => {
            event.preventDefault();
        
            const fieldName = event.target.getAttribute('name')
            const fieldValue = event.target.value;
        
            const newFormData = {...editFormData}
            newFormData[fieldName] = fieldValue;
      
            setEditFormData(newFormData);
          }
    return (
        <tr>
            <td>
                <input 
                type="text" 
                required="required" 
                placeholder="Enter a name..." 
                name="firstName"
                value={editFormData.firstName}
                onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
            <input 
                type="text" 
                required="required" 
                placeholder="Enter the last name..." 
                name="lastName"
                value={editFormData.lastName}
                onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
            <input 
                type="text" 
                required="required" 
                placeholder="Enter a phone number..." 
                name="phoneNumber"
                value={editFormData.phoneNumber}
                onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
            <input 
                type="email" 
                required="required" 
                placeholder="Enter an email..." 
                name="email"
                value={editFormData.email}
                onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
            <input 
                type="email" 
                required="required" 
                placeholder="Enter an email..." 
                name="email"
                value={editFormData.email}
                onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <button type="submit">Save</button>
                <button type="button" onClick={()=>(setEditContactId(null))}>
                    Cancel</button>
            </td>
        </tr>
    )
}
export default EditableRow