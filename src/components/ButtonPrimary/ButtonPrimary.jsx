import s from "./style.module.css"

export function ButtonPrimary({ isDisabled, children, onClick }) {
    return (
        <button
            disabled={isDisabled}
            onClick={onClick}
            type="button"
            className={`btn btn-primary ${s.button}`}
        >
            {children}
        </button>
    )
}