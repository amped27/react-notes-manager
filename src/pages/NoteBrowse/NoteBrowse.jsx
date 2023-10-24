import { SearchBar } from "components/SearchBar/SearchBar"
import s from "./style.module.css"
import { NoteList } from "container/NoteList/NoteList"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export function NoteBrowse(props) {
    const [searchText, setSearchText] = useState("")
    const noteList = useSelector(store => store.NOTE.noteList)
    const filteredList = noteList.filter(note => {
        const containsTitle = note.title.toUpperCase().includes(searchText.trim().toUpperCase())
        const containsContent = note.content.toUpperCase().includes(searchText.trim().toUpperCase())

        return containsTitle || containsContent
    })
    return <>
        <div className="row justify-content-center mb-5">
            <div className="col-sm-12 col-md-4">
                <SearchBar placeholder="Search your notes..." onTextChanges={setSearchText} />
            </div>
        </div>
        {
            noteList?.length === 0 && (
                <div className="d-flex justify-content-center">
                    Aucune note ! Voulez vous en {" "}
                    <Link to="/note/new"> créer une </Link>
                    {" "}?
                </div>
            )
        }
        <NoteList noteList={filteredList} />
    </>
}