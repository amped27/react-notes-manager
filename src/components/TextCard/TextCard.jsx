import { useState } from "react"
import s from "./style.module.css"
import { Trash as TrashIcon } from "react-bootstrap-icons"

export function TextCard({ title, subtitle, content, onClickTrash, onClickCard }) {
    const [isTrashHovered, setIsTrashHovered] = useState(false)
    function trashed(e) {
        onClickTrash()
        e.stopPropagation()
    }
    return (
        <div
            className={`card ${s.container}`}
            onClick={onClickCard}
        >
            <div className="card-body">
                <div className={s.title_row}>
                    <h5 className="card-title">{title}</h5>
                    <TrashIcon
                        size={20}
                        onMouseEnter={() => setIsTrashHovered(true)}
                        onMouseLeave={() => setIsTrashHovered(false)}
                        onClick={trashed}
                        style={{ color: isTrashHovered ? "#FF7373" : "#b8b8b8" }}
                    />
                </div>
                <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>
                <p className={`card-text ${s.text_content}`}>{content}</p>
            </div>
        </div>
    )
}