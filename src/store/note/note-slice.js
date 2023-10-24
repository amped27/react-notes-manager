import { createSlice, current } from "@reduxjs/toolkit"

export const noteSlice = createSlice({
    name: "noteSlice",
    initialState: {
        noteList: []
    },
    reducers: {
        setNoteList: (currentSlice, action) => {
            currentSlice.noteList = action.payload
        },
        addNote: (currentSlice, action) => {
            currentSlice.noteList.push(action.payload)
        },
        updatenote: (currentSlice, action) => {
            const indexToUpdate = currentSlice.noteList.findIndex(note => note.id === action.payload.id)
            currentSlice.noteList[indexToUpdate] = action.payload
        },
        deleteNote: (currentSlice, action) => {
            const filteredList = currentSlice.noteList.filter(note => note.id !== action.payload.id)
            currentSlice.noteList = filteredList
        },
    }
})

export const noteReducer = noteSlice.reducer

export const { setNoteList, addNote, updatenote, deleteNote } = noteSlice.actions