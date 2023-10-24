import { PencilFill, TrashFill } from "react-bootstrap-icons"
import s from "./style.module.css"
import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary"
import { useState } from "react"
import { ValidatorService } from "services/form-validator"
import { InputError } from "components/InputError/InputError"

const VALIDATORS = {
    title: (value) => {
        return ValidatorService.min(value, 3) || ValidatorService.max(value, 20)
    },
    content: (value) => {
        return ValidatorService.min(value, 10) || ValidatorService.max(value, 300)
    },
}

export function NoteForm({ isEditable = true, title, onEdit, onSubmit, onDelete, note }) {

    const [formValues, setFormValues] = useState({ title: note?.title || "", content: note?.content || "" })
    const [formErrors, setFormErrors] = useState({ title: note?.title ? undefined : "", content: note?.content ? undefined : "" })

    function updateFormValues(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        validate(e.target.name, e.target.value)
    }

    function hasError() {
        return Object.values(formErrors).some(error => error !== undefined)
    }

    function validate(fieldName, fieldValue) {
        setFormErrors({ ...formErrors, [fieldName]: VALIDATORS[fieldName](fieldValue) })
    }

    const actionIcons = (
        <>
            <div className="col-1">
                {onEdit && <PencilFill onClick={onEdit} className={s.icon} />}
            </div>
            <div className="col-1">
                {onDelete && <TrashFill onClick={onDelete} className={s.icon} />}
            </div>
        </>
    )

    const titleInput = (
        <>
            <label htmlFor="input-title" className="form-label">Title</label>
            <input type="text" name="title" id="input-title" className="form-control" onChange={updateFormValues} value={formValues.title} />
            {formErrors.title && <InputError message={formErrors.title} />}
        </>
    )

    const contentInput = (
        <>
            <label htmlFor="input-content" className="form-label">Content</label>
            <textarea type="text" name="content" id="input-content" className="form-control" row="5" onChange={updateFormValues} value={formValues.content} />
            {formErrors.content && <InputError message={formErrors.content} />}
        </>
    )

    const submitButton = (
        <div className={s.submit_btn}>
            <ButtonPrimary isDisabled={hasError()} onClick={() => onSubmit(formValues)}>Submit</ButtonPrimary>
        </div>
    )

    return (
        <form className={s.container}>
            <div className="row justify-content-space-between">
                <div className="col-10"><h2 className="mb-2">{title}</h2></div>
                {actionIcons}
            </div>
            <div className={`mb-3 ${s.title_input_container}`}>{isEditable && titleInput}</div>
            <div className="mb-3">{isEditable ? contentInput : <pre>{note.content}</pre>}</div>
            {onSubmit && submitButton}
        </form>
    )
}