import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const host = "http://localhost:3000"
    const notesInitial = []

      const [notes, setnotes] = useState(notesInitial)
      //get all notes function 
      const getNotes = async ()=>{
        const response = await fetch (`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'spplication/json',
            'auth-token': localStorage.getItem('token')
          }
          
        });
        const json = await response.json();
        console.log(json);
        setnotes(json);

      }






      //API call
      const addNote = async (title, description, tag)=>{
        const response = await fetch (`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
            
          },
          body: JSON.stringify({title, description, tag})
        });

        const note = await response.json();
        
        //to add a note
        
        setnotes(notes.concat(note))
      }

      // to delete a node
      const deleteNote = async (id)=>{

        const response = await fetch (`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'spplication/json',
            'auth-token': localStorage.getItem('token')
          },
          
        });
        const json =  response.json();


        console.log("deleting the node with id"+id);
        const newNotes = notes.filter((note)=>{return note._id!==id});
        setnotes(newNotes);

      }

      //to edit a note
      const editNote = async (id, title, description, tag)=>{
        //API call
        const response = await fetch (`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const json =  response.json();
        
        // Logic to edit in client side
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
          
        }
        setnotes(newNotes);

      }



    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
