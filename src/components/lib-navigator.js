import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Fab from '@material-ui/core/Fab'
import AreaNavigator from './area-navigator'
//import ShowSerie from './show-serie.js'
import TileItem from './tile-item'
import useLibrary from '../hooks/useLibrary'
import useMediaPlayer from '../hooks/useMediaPlayer'

const useStyles = makeStyles(theme => ({
  card: {
    position: 'relative',
    color: '#555',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    height: 'auto',
    minHeight: '100%',
    background: 'black'
  },
  floatingButton: {
    margin: 0,
    color: 'white',
    bottom: 'auto',
    left: '2%',
    top: 20,
    right: 'auto',
    zIndex: 100,
    position: 'absolute',
  },
  cardWrap: {
    position: 'relative',
    color: '#555',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    flexWrap: 'wrap',
  },
}))

const LibNavigator = ({onClose, serie, curEp, showSerie, onClick}) => {
  const classes = useStyles()
  const {compiledSerieList, getEpItem} = useLibrary()
  const player = useMediaPlayer()
  const [curViewSer, setCurViewSer] = useState(undefined)
  const [curViewEp, setCurViewEp] = useState(undefined)
  const [showAllEp,setShowAllEp] = useState(true)
  useEffect(() => {
    showSerie && setCurViewSer(serie)
  },[showSerie,serie])
  useEffect(() => setCurViewEp(curEp),[curEp])

  const openSer = (ev,ser) => {
    ev.stopPropagation()
console.log(ser)
    const tmpSer = compiledSerieList("deu",ser.topicId,ser.epId)
    const tmpEp = getEpItem(ser.topicId,ser.epId)
    setCurViewSer(tmpSer)
    setCurViewEp(tmpEp)
    player.startPlay(0,tmpSer,tmpEp)
    onClick && onClick()
  }

  const closeSer = () => {
    setCurViewSer(null)
    onClose && onClose()
  }
  const handleShowAllEp = (ev,val) => {
    ev.stopPropagation()
    setShowAllEp(val)
  }
  const showSerPage = (curViewSer!=null)
  const epList = showSerPage && curViewSer.fileList
  return (
    <div
       className={classes.card}
       data-active={true}
       data-playing={false}
    >
      <Fab
        className={classes.floatingButton}
        color="primary"
        onClick={showSerPage ? closeSer : onClose}><ChevronLeftIcon/></Fab>
      {showSerPage
        ? <TileItem
            item={curViewSer}
            infoTile
            expanded={showAllEp}
            curEp={curViewEp}
            epList={epList}
            onClickExpand={(e) => handleShowAllEp(e,!showAllEp)}
            onClickPlay={(ev) => openSer(ev,curViewSer)}
            onClick={() => closeSer()}/>
        : <AreaNavigator onClick={(ev,ser) => openSer(ev,ser)}/>}
    </div>
  )
}

export default LibNavigator
