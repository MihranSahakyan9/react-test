import './App.css';
import {SearchBar} from "./modules/components/SearchBar";
import {List} from "./modules/components/List";
import {useCallback, useEffect, useState} from "react";
import {doApiCall} from "./modules/global/utils/api";
import {limit, userEndpoint} from "./modules/global/utils/constants";
import {debounce} from "@mui/material";

function App() {
  const [list, setList] = useState([]);

  const onChangeHandler = async (value) => {
    const searchResult = await doApiCall({
      method: 'GET',
      // search by query params( email, username, firstName, lastName )
      url: `${userEndpoint}/search?q=${value}&limit=${limit}`
    });

    setList(searchResult.users);
  }

  useEffect(() => {
      const fetchList = async () => {
          const initialList = await doApiCall({
              method: 'GET',
              // fetch only <limit> items
              // search by query param( limit ). read this https://docs.oracle.com/en/cloud/saas/cx-commerce/21d/ccdev/rest-api-query-parameters.html
              // note query params are not the same for all the APIs. In the article it's just an example...
              url: `${userEndpoint}?limit=${limit}`
          });

          setList(initialList.users);
      }

      fetchList()
          .catch((err) => console.log(err.message))
  }, []);

    // https://dmitripavlutin.com/react-throttle-debounce/ READ THIS
    const debouncedChangeHandler = useCallback(debounce(onChangeHandler), []);

  return (
    <div className="App">
      <SearchBar onChangeHandler={debouncedChangeHandler} />
        {/*// fields value can be anything from user object(firstName, lastName...)*/}
      <List list={list} fields={['username', 'email']} avatar='image' />
    </div>
  );
}

export default App;
