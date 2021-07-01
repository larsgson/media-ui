import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import { getImgOfObj } from '../utils/obj-functions'
import ItemBarEpisode from './item-bar-episode'
import useBrowserData from '../hooks/useBrowserData'
import useMediaPlayer from "../hooks/useMediaPlayer"
import useSettings from "../hooks/useSettings"

const useStyles = makeStyles(theme => ({
//  root: {
  cardContentSingleLine: {
    maxWidth: 768,
    display: 'flex',
    margin: '0 auto',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'whitesmoke',
  },
  cardContent: {
    backgroundColor: 'whitesmoke',
    overflow: 'hidden',
    padding: 0,
    width: '100%',
  },
  cardContentMulti: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    padding: 0,
    width: '100%',
  },
  headline: {
    paddingTop: 15,
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.87)',
  },
  areaHeadline: {
    paddingLeft: 10,
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.87)',
    width: '100%',
  },
  iconButton: {
    color: 'white',
    backgroundColor: 'darkgrey',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#3c52b2',
    }
  },
  floatingButton: {
    margin: 0,
    color: 'white',
    backgroundColor: 'black',
    bottom: 20,
    left: '85%',
    top: 'auto',
    right: 'auto',
    zIndex: 100,
    position: 'relative',
  },
  gridListMulti: {
  },
  gridList: {
    flexWrap: 'nowrap',
    overflow: 'hidden',
    overflowY: 'hidden',
    // Promote the list into its own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  gridListScroll: {
    flexWrap: 'nowrap',
    overflow: 'scroll',
    overflowY: 'hidden',
    // Promote the list into its own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  image: {
    left: '50%',
    top: 0,
    height: '100%',
    transform: 'translateX(-50%)',
    maxHeight: 200,
  },
  imageLessSize: {
    height: '30%',
    width: '20%',
    top: '15%',
  },
  showTileRoot: {
    height: '100%',
    backgroundColor: 'red',
  },
  infoTileRoot: {
    height: '100%',
  },
  tileRoot: {
    height: 'auto !important',
    width: 'auto !important',
  },
  tileRootSmall: {
  },
  tileRootRed: {
    backgroundColor: 'red',
    height: 'auto !important',
  },
  tileRootRedSmall: {
    backgroundColor: 'red',
  },
}))

const EpList = (props) => {
  const { title, serie, navButton, useIcon, multiRow,
          epList, imgSrc } = props
  const [expanded,setExpanded] = useState(!navButton)
  const {size, width, height} = useBrowserData()
  const settings = useSettings()
  const { startPlay } = useMediaPlayer()
  const classes = useStyles()
  let tmpPlaySer = undefined
  const sizeToCol = {"xl": 5, "lg": 4, "md": 3, "sm": 2}
  let colSize = sizeToCol[size] || 1
  let curHeight = height-150
  if (width<=380){
    colSize = 1
    if (curHeight>300){
      curHeight = 300
    }
  }
  const nbrOfEntries = epList && epList.length
  const maxEntries = (navButton && !expanded) ? colSize : nbrOfEntries
  const showNav = navButton && (nbrOfEntries > colSize)
  const showNavButton = showNav && !expanded && multiRow
  const useColSize = colSize + (showNavButton ? 0.15 : 0.1)
  const showMulti = multiRow && expanded
  const expandIcon = expanded ? <RemoveIcon/> : <AddIcon/>
  const toggleExpand = (ev) => {
    ev.stopPropagation()
    setExpanded(!expanded)
  }
  const handleClickItemIndex = (ev,item,ep) => {
/*
    ev.stopPropagation()
    if (startPlay!=null) {
      startPlay(item,ep)
    }
*/
    props.onClick && props.onClick(ev,item,ep)
  }
  return (
    <CardContent className={(showMulti && !navButton) ? classes.cardContentMulti : classes.cardContentSingleLine} >
      <Typography className={classes.areaHeadline} type="headline" component="h2">
        {title} {showNav && (<IconButton
          className={classes.iconButton}
          onClick={(ev) => toggleExpand(ev)}>{expandIcon}</IconButton>)}
      </Typography>
      <GridList
        className={multiRow ? classes.gridListMulti : showNavButton ? classes.gridList : classes.gridListScroll}
        cols={useColSize}
      >
        {epList && epList.slice(0,maxEntries).map((ep,inx) => {
          const useImg = ep.image ? getImgOfObj(ep) : imgSrc
          const tileRootClass = (ep===tmpPlaySer) ? classes.tileRootRed : classes.tileRoot
          const tileRootClassSmall = (ep===tmpPlaySer) ?
                                        classes.tileRootRedSmall : classes.tileRootSmall
          return (
            <GridListTile
              key={inx}
              cols={1}
              rows={1}
              className={(width>=480) ? tileRootClass : tileRootClassSmall}
              onClick={(ev) => handleClickItemIndex(ev,serie,ep)}
            >
              <img
                className={classes.image}
                src={useImg}
                alt={ep.title}
                onClick={(ev) => handleClickItemIndex(ev,serie,ep)}
              />
                <ItemBarEpisode
                  serie={serie}
                  episode={ep}
                  useIcon={useIcon}
                  title={ep.title}
                  onClick={(ev) => handleClickItemIndex(ev,serie,ep)}/>
            </GridListTile>
          )}
        )}
      </GridList>
      {showNavButton && (<Fab
        className={classes.floatingButton}
        onClick={(ev) => toggleExpand(ev)}>{expandIcon}</Fab>)}
    </CardContent>
  )
}

export default EpList
