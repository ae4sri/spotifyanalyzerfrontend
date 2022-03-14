import React from "react";
import { Dispatch, SetStateAction } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
export const SearchBar = ({ query, setQuery, submitQuery}: { 
    query: string, 
    setQuery: Dispatch<SetStateAction<string>>, 
    submitQuery: (event: React.SyntheticEvent<EventTarget>) => void
    }) => {


        const canSearch = (): boolean => {
            return (query.length == 0)
          }

    return (
        <form onSubmit={submitQuery}>
              <TextField id="standard-basic" value={query} onChange={({ target }) => setQuery(target.value)}  />        
        <br />
              <Button disabled={canSearch()} type="submit" variant="outlined">Search</Button>              
        </form>
    )

}