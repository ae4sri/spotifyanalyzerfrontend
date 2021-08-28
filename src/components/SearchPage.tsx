import React from 'react';
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import spotifyService from '../services/server'
import { SearchResults } from './SearchResults';
export const SearchPage = () => {
    
    const [ query, setQuery ] = useState('')
    const [ results, setResults ] = useState({ songs: [], artists: [] })

    const submitQuery = async (event: React.SyntheticEvent<EventTarget>) => {
        event.preventDefault()
        try {
          const responseData = await spotifyService.search(query)
          setResults(responseData)
        } catch(e) {
          alert(e)
        }
      }

  return (
    <>
        <SearchBar query={query} setQuery={setQuery} submitQuery={submitQuery} />
        <SearchResults results={results} />
    </>
  );


}