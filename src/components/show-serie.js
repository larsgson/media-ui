import React from 'react'
import useMediaPlayer from '../hooks/useMediaPlayer'
import useBrowserData from '../hooks/useBrowserData'
import { makeStyles } from '@material-ui/core/styles'
import locale2 from 'locale2'
import { getImgOfObj, jsonEqual } from '../utils/obj-functions'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import ButtonBase from '@material-ui/core/ButtonBase'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FeaturedPlayList from '@material-ui/icons/FeaturedPlayList'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import AvPlay from '@material-ui/icons/PlayArrow'
import AvPause from '@material-ui/icons/Pause'
import ContentAddCircleOutline from '@material-ui/icons/AddCircleOutline'
import useLibrary from "../hooks/useLibrary"
import EpList from './ep-list.js'

const useStyles = makeStyles(theme => ({
  cardWrap: {
    position: 'relative',
    color: '#555',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    flexWrap: 'wrap',
  },
  epList: {
  },
  image: {
    position: 'relative',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    marginLeft: 65,
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}))

const PlayButton = ({classes, onClick}) => (
  <IconButton className={classes.playPause}>
    <AvPlay onClick={onClick}/>
  </IconButton>
)

const PauseButton = ({classes, onClick}) => (
  <IconButton className={classes.playPause}>
    <AvPause onClick={onClick}/>
  </IconButton>
)

const ShowSerie = ({serie, curEp, onClick}) => {
  const classes = useStyles()
  const {width, height} = useBrowserData()
  const {getFirstEpItem} = useLibrary()
console.log(serie)
console.log(curEp)
  const epList = serie && serie.fileList
  const player = useMediaPlayer()
  const useImg = curEp && curEp.image ? getImgOfObj(curEp) : ""
  const serTitle = serie ? serie.name : ""
  const epTitle = curEp ? curEp.name : undefined
  const epTitleDash = curEp ? " - " + curEp.name : ""
  const epDescr = curEp ? curEp.fullDescr : undefined
  const title = serTitle + epTitleDash
//  const isCurPlaying = player.isPaused(curEp)
  const isCurPlaying = player.isPaused
  const useHeight = height * 0.60 // percentage
  let playStateIcon = <PauseButton classes={classes} onClick={onClick}/>
  if (!isCurPlaying) {
    playStateIcon = <PlayButton classes={classes} onClick={onClick}/>
  } else if (player.isPaused) {
    playStateIcon = <PlayButton classes={classes} onClick={onClick}/>
/*
  } else if (isVideoPlaying) {
    const tempHeight = (Math.trunc((width)*9/16))
    hideNavigation = height -tempHeight < 150 // hide if less than margin
*/
  }
  const handleCurClick = (ep) => {
      player.startPlay(serie,ep)
  }
  const handleClick = (ep) => {
    player.startPlay(serie,ep)
    onClick && onClick()
  }
  return (
    <div
      className={classes.image}
      style={{backgroundColor: '#111'}}
    >
      <ButtonBase
        focusRipple
        focusVisibleClassName={classes.focusVisible}
        onClick={() => handleCurClick(curEp)}
        style={{
          width: "60%",
        }}
      >
        <span
          className={classes.imageSrc}
          style={{
            height: useHeight,
            backgroundImage: `url(${useImg})`,
          }}
        />
        <span className={classes.imageBackdrop} />
        <span className={classes.imageButton}>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            className={classes.imageTitle}
          >
            {title}
            <span className={classes.imageMarked} />
          </Typography>
        </span>
      </ButtonBase>
      <div
        className={classes.epList}
        onClick={() => handleCurClick(curEp)}
        style={{
          paddingTop: useHeight,
          marginTop: -50
        }}
      >
        <Box m={2} style={{backgroundColor: '#111'}}>
          <Typography
            variant="subtitle1"
            color="inherit"
          >{epTitle}</Typography>
          <br/>
          <Typography
            variant="subtitle2"
            color="inherit"
          >{epDescr}</Typography>
        </Box>
        <EpList
          title={serTitle}
          serie={serie}
          epList={epList}
          navButton
          onClick={(ev,ser,ep) => handleClick(ep)}
        />
      </div>
    </div>
  )
}

export default ShowSerie
