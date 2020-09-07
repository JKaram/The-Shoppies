import React from "react";
import styled from "styled-components";

const SearchBoxWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  border-radius: 3px;
  font-size: 1.5rem;
  box-sizing: border-box;
  height: 3rem;
  border: 1px solid #ccc;
  display: block;
  padding: 2px 15px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const ClearButton = styled.button`
  width: 100px;
  border: 1px solid #ccc;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-left: 0;
  background: white;
  font-weight: bold;
`;

export function SearchBar({ searchTerm, debouncedSearch, updateText, clearResults }) {
  return (
    <SearchBoxWrapper>
      <SearchInput
        id="text"
        value={searchTerm}
        autoComplete="off"
        maxLength="50"
        placeholder="Search Movie Title"
        onChange={(event) => {
          updateText(event.target.value);
          debouncedSearch(event.target.value);
        }}
      />
      <ClearButton
        onClick={() => {
          clearResults();
          updateText("");
        }}
        disabled={!searchTerm}
      >
        Clear
      </ClearButton>
    </SearchBoxWrapper>
  );
}