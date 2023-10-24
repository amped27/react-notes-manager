import { Search as SearchIcon } from "react-bootstrap-icons"
import s from "./style.module.css"

export function SearchBar({ placeholder, onTextChanges }) {
    return <>
        <SearchIcon className={s.icon} />
        <input type="text" name="search" id="search" className={s.input} onChange={e => onTextChanges(e.target.value)} placeholder={placeholder} />
    </>
}