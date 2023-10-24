import { useDispatch, useSelector } from "react-redux"
import s from "./style.module.css"
import { TextCard } from "components/TextCard/TextCard"
import { useNavigate } from "react-router-dom"
import { NoteAPI } from "api/note-api"
import { deleteNote } from "store/note/note-slice"

export function NoteList({ noteList }) {
    // const noteList = useSelector(store => store.NOTE.noteList)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function deleteNote_(note) {
        if (window.confirm("Supprimer la note ?")) {
            NoteAPI.deleteByID(note.id)
            dispatch(deleteNote(note))
        }
    }

    return (
        <div className={`row justify-content-center ${s.cards_container}`}>
            {noteList.map((note, index) => {
                return (
                    <div key={`note-${note.id}`} className={s.card_container}>
                        <TextCard title={note.title} subtitle={note.subtitle} content={note.content} onClickTrash={() => deleteNote_(note)} onClickCard={() => navigate("/note/" + note.id)} />
                    </div>
                )
            })}
        </div>
    )
}