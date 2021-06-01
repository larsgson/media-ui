import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ShowPage from './show-page.js'
import LibNavigator from './lib-navigator.js'
import FeaturedPlayList from '@material-ui/icons/FeaturedPlayList'
import Fab from '@material-ui/core/Fab'
import useLibrary from '../hooks/useLibrary'
import { gql, useQuery } from '@apollo/client';

const useStyles = makeStyles(theme => ({
  imageWrapper: {
    position: 'relative',
  },
  floatingButton: {
    margin: 0,
    color: 'white',
    backgroundColor: '#ccc',
    bottom: 'auto',
    left: '2%',
    top: 20,
    right: 'auto',
    zIndex: 100,
    position: 'absolute',
  },
}))

const FeaturedItem = () => {
  const [isLibOpen, setIsLibOpen] = useState(false)
  const [showSerie, setShowSerie] = useState(true)
  const classes = useStyles()
  const {compiledSerieList, getEpItem} = useLibrary()
  const openNavMenu = () => {
    setShowSerie(false)
    setIsLibOpen(true)
  }
  const openLibNav = () => {
    setShowSerie(true)
    setIsLibOpen(true)
  }
  const curSer = compiledSerieList("deu",64,23)
  const curEp = getEpItem(23,34)
  if (isLibOpen){
    return <LibNavigator
              serie={curSer}
              curEp={curEp}
              showSerie={showSerie}
              onClose={() => setIsLibOpen(false)}
            />
  } else {
//  page={lib.defaultPage}
    return (
      <div className={classes.imageWrapper}>
        <Fab
          className={classes.floatingButton}
          onClick={openNavMenu}><FeaturedPlayList/></Fab>
        <ShowPage
          serie={curSer}
          curEp={curEp}
          onClick={openLibNav}
        />
      </div>
    )
  }
}

export default FeaturedItem
