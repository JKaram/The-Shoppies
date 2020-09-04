import React from 'react';


export function SearchBar({ searchTerm, updateText, search }) {
    return (
        <div>
            <input value={searchTerm}
                onChange={(event) => {
                    updateText(event.target.value);
                }}
            ></input>
            <button onClick={(e) => {
                search(searchTerm)
            }}>Search</button>
        </div>
    )
}