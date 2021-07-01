import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FeaturedPlayList from '@material-ui/icons/FeaturedPlayList'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Fab from '@material-ui/core/Fab'
import ShowPage from './show-page.js'
import AreaNavigator from './area-navigator'
import TileItem from './tile-item'
import useMediaPlayer from '../hooks/useMediaPlayer'
import useBrowserData from '../hooks/useBrowserData'
import useLibrary from '../hooks/useLibrary'

const useStyles = makeStyles(theme => ({
  mainDiv: {
    position: 'relative',
    color: '#555',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    height: 'auto',
    minHeight: '100%',
    background: 'black'
  },
  divWrap: {
    position: 'relative',
    color: '#555',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    flexWrap: 'wrap',
  },
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

const FeaturedItem = ({onClose, serie, showSerie, onClick}) => {
  const player = useMediaPlayer()
  const {compiledSerieList, getEpItem} = useLibrary()
  const {width, height} = useBrowserData()
  const [curViewSer, setCurViewSer] = useState(compiledSerieList("deu",64,23))
  const [curViewEp, setCurViewEp] = useState(getEpItem(23,34))
  const [showAllEp,setShowAllEp] = useState(true)
  const [isLibOpen, setIsLibOpen] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const classes = useStyles()
  useEffect(() => {
    showSerie && setCurViewSer(serie)
  },[showSerie,serie])
  const openSer = (ev,ser,ep) => {
    ev.stopPropagation()
console.log(ser)
console.log(ep)
    const tmpSer = ser || compiledSerieList("deu",ep.topicId,ep.epId)
    const tmpEp = ep || getEpItem(tmpSer.topicId,tmpSer.epId)
console.log(tmpSer)
console.log(tmpEp)
    setCurViewSer(tmpSer)
    setCurViewEp(tmpEp)
    setIsLibOpen(false)
//    player.startPlay(0,tmpSer,tmpEp)
  }
  const closeSer = () => {
    setCurViewSer(null)
    onClose && onClose()
  }
  const handleShowAllEp = (ev,val) => {
    ev.stopPropagation()
    setShowAllEp(val)
  }
  const handleInfoClick = (ser,ep) => {
    setCurViewSer(ser)
    setCurViewEp(ep)
  }
  const showSerPage = (curViewSer!=null)
  const epList = showSerPage && curViewSer.fileList
console.log(curViewSer)
  if ((isLibOpen)||(showInfo)) {
    return (
      <div
         className={classes.card}
      >
        <Fab
          className={classes.floatingButton}
          color="primary"
          onClick={isLibOpen ? () => setIsLibOpen(false) : () => setShowInfo(false)}><ChevronLeftIcon/></Fab>
        {isLibOpen
          ? <AreaNavigator
              onClick={(ev,ser,ep) => openSer(ev,undefined,ep)}
              serie={curViewSer}
              curEp={curViewEp}
              onClose={() => setIsLibOpen(false)}
            />
          : <TileItem
              item={curViewSer}
              infoTile
              expanded={showAllEp}
              curEp={curViewEp}
              epList={epList}
              onClickExpand={(e) => handleShowAllEp(e,!showAllEp)}
              onClickPlay={(ev) => player.startPlay(0,curViewEp,curViewEp)}
              onInfoClick={(ser,ep) => handleInfoClick(ser,ep)}
              onClick={() => closeSer()}/>
         }
      </div>
    )
  } else {
    return (
      <div className={classes.imageWrapper}>
        <Fab
          className={classes.floatingButton}
          onClick={() => setIsLibOpen(true)}><FeaturedPlayList/></Fab>
        <ShowPage
          serie={curViewSer}
          curEp={curViewEp}
          epList={epList}
          onClick={(ev) => openSer(ev,curViewSer,curViewEp)}
          onMoreClick={() => setShowInfo(true)}
          onInfoClick={(ser,ep) => handleInfoClick(ser,ep)}
        />
      </div>
    )
  }
}

export default FeaturedItem
