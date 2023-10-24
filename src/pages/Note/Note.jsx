import { useNavigate, useParams } from "react-router-dom"
import s from "./style.module.css"
import { useDispatch, useSelector } from "react-redux"
import { NoteForm } from "components/NoteForm/NoteForm"
import { useState } from "react"
import { NoteAPI } from "api/note-api"
import { deleteNote, updatenote } from "store/note/note-slice"

export function Note(props) {
    const [isEditable, setIsEditable] = useState(false)
    const { noteId } = useParams()
    const note = useSelector(store => store.NOTE.noteList.find(note => note.id === noteId))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function deleteNote_(note) {
        if (window.confirm("Supprimer la note ?")) {
            NoteAPI.deleteByID(note.id)
            dispatch(deleteNote(note))
            navigate("/")
        }
    }

    async function submit(formValues) {
        const updatedNote = await NoteAPI.update({ ...formValues, id: note.id })
        dispatch(updatenote(updatedNote))
        setIsEditable(false)
    }

    return <>
        {note && <NoteForm isEditable={isEditable} title={isEditable ? `Edit note` : note.title} note={note} onEdit={() => setIsEditable(!isEditable)} onDelete={() => deleteNote_(note)} onSubmit={isEditable && submit} />}
    </>
}