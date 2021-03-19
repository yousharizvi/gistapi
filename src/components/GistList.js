import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import Gist from './Gist'
import { getPublicGists, getGistForUser } from '../services/gistService'
import { debounce } from 'lodash';
const GistList = ({ searchKeyword }) => {
  const [gistsData, setGistsData] = useState([])
  const debouncedGetGistsData = debounce(() => {
    getGistsData()
  }, 2000)
  const getGistsData = async () => {
    let response
    if (searchKeyword) response = await getGistForUser(searchKeyword)
    else response = await getPublicGists()
    if (response.status === 200) setGistsData(response.data)
    else console.log(response.status)
  }
  useEffect(() => {
    // getGistsData()
    debouncedGetGistsData()
  }, [searchKeyword])
  return <GistListWrapper>
    {gistsData.map(gist => <Gist gist={gist} key={gist.id} />)}
  </GistListWrapper>
}

const GistListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 30%;
`;

export default GistList
