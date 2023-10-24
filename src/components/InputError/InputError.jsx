export function InputError({ message }) {
    return (
        <span className="form-error" style={{ color: "red" }}> {message} </span>
    )
}