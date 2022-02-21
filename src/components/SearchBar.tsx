import { BaseSyntheticEvent, useContext } from 'react';
import { useState } from 'react';
import { Button, Grid, MultiSelect, TextInput } from '@mantine/core'
import { SEARCH_QUERY_OPTIONS, STATIC_SEARCH_QUERY_OPTIONS } from '../config'
import { convertQueryOptions, difference } from '../lib/utils';
import { useDebouncedValue } from '@mantine/hooks';
import { GlobalShellContext } from '../layouts/default/providers';

const CONVERTED_QUERY_OPTIONS = convertQueryOptions({ ...SEARCH_QUERY_OPTIONS, ...STATIC_SEARCH_QUERY_OPTIONS});
const checkForExistingTypeParam = () => {
  // Check incoming query parameters for existing type param
  // If incoming param type
    // Allow param to be added to query object
    // Update the query options to disabled the other type options
    // Remove previous type param(s) from param array
} 

const SearchBar = () => {
  const [selectedSearchParams, setSelectedSearchParams] = useState<string[]>([]);
  const [searchString, setSearchString] = useState("");
  const [debouncedSearchString] = useDebouncedValue(searchString, 200)
  const [queryObject, setQueryObject] = useState({});
  const { handleSubmit } = useContext(GlobalShellContext);
  
  const handleSelection = (updatedParams: string[]) => {
    setSelectedSearchParams((prevParams) => {
      // TODO: Check if "type:" param is already in the params array. If so, remove it, disable it, and replace with the new param
      if(updatedParams.length > prevParams.length) {
        const diff = difference(updatedParams, prevParams); 
        console.log("added:", {diff});
        constructQueryObject({diff, action: 'add'})

      } else {
        const diff = difference(prevParams, updatedParams);
        console.log("removed:", {diff});
        constructQueryObject({diff, action: 'del'});
      }

      return updatedParams; // Required to keep track of selected search params
    })
  }

  const constructQueryObject = ({ diff=[], action="", userInput=debouncedSearchString}: {diff?: string[], action?: string, userInput?: string | null }) => {
    let tempObject = {...queryObject};
    console.log("Before:", {tempObject});

    if (userInput) {
      userInput.split(" - ").forEach((param) => {
        const [key, value] = param.split(":");
        tempObject[key] = value;
      });
    }

    if(diff.length) {
      const [key, value] = diff[0].includes(":") ? diff[0].split(":") : [diff[0], ""];
      console.log([key, value, action])
      if(action === "add") {
        console.log("adding", { key, value });
        tempObject[key] = value;
      }
      
      if(action === "del" && key in tempObject) {
        console.log("deleting", {key, value});
        delete tempObject[key];
      }
    }

    const queryString = Object.entries(tempObject).map(([key, value]) => `${key}:${value}`).join(" - ");
    console.log("After:", {tempObject, queryString});
    setQueryObject(tempObject);
    setSearchString(queryString);
  }

  return (
    <Grid>
      <Grid.Col span={8}>
        <TextInput value={searchString} onChange={(event) => setSearchString(event.target.value)} placeholder="user:defunkt" />
      </Grid.Col>
      <Grid.Col span={2}>
        <MultiSelect clearable data={CONVERTED_QUERY_OPTIONS} value={selectedSearchParams} onChange={handleSelection} placeholder="Search Parameters" />
      </Grid.Col>
      <Grid.Col span={2}>
        <Button onClick={() => handleSubmit(searchString)}>Search</Button>
      </Grid.Col>
    </Grid>
  );
}

export default SearchBar;