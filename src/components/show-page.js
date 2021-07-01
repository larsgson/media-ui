import React, { useState } from 'react'
import useMediaPlayer from '../hooks/useMediaPlayer'
import useBrowserData from '../hooks/useBrowserData'
import { makeStyles } from '@material-ui/core/styles'
import locale2 from 'locale2'
import { getImgOfObj } from '../utils/obj-functions'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Snackbar from '@material-ui/core/Snackbar'
import ButtonBase from '@material-ui/core/ButtonBase'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FeaturedPlayList from '@material-ui/icons/FeaturedPlayList'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import Fab from '@material-ui/core/Fab'
import IconButton from '@material-ui/core/IconButton'
import AvPlay from '@material-ui/icons/PlayArrow'
import AvPause from '@material-ui/icons/Pause'
import ContentAddCircleOutline from '@material-ui/icons/AddCircleOutline'
import EpList from './ep-list'

const useStyles = makeStyles(theme => ({
  areaHeadline: {
    paddingTop: 20,
    fontWeight: 600,
    width: '100%',
  },
  headline: {
    paddingTop: 10,
    fontWeight: 300,
    fontSize: '70%',
  },
  infoTileContent: {
    position: 'relative',
    width: '100%',
  },
  infoTileLeft: {
    marginLeft: 10,
  },
  fabButtonInfo: {
    margin: 0,
    marginLeft: 10,
    color: 'white',
    backgroundColor: 'transparent',
  },
  buttonInfo: {
    margin: 0,
    marginLeft: 10,
    color: '#555',
  },
  imageWrapper: {
    position: 'relative',
  },
  imageContent: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  image: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
    },
    [theme.breakpoints.down('xs')]: {
      height: '230px !important',
    },
    [theme.breakpoints.up('sm')]: {
      height: '480px !important',
    },
    [theme.breakpoints.up('md')]: {
      height: '750px !important',
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
  cardWrap: {
    position: 'relative',
    color: '#555',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    position: 'relative',
    maxWidth: 685,
    color: '#555',
    backgroundColor: 'whitesmoke',
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    marginLeft: 65,
    flex: '1 0 auto',
  },
  subheading: {
    color: 'grey',
  },
  description: {
    fontSize: '0.9rem',
    color: 'grey',
  },
  epTitle: {
    paddingTop: 15,
    color: 'lightgrey',
  },
  areaDiv: {
    width: '100%',
  },
  actionButton: {
    backgroundColor: 'whitesmoke',
    width: 50,
    float: 'right',
  },
  closeButtonLScreen: {
    right: -10,
    top: -10,
    zIndex: 100,
    position: 'absolute',
  },
  closeButton: {
    right: -10,
    zIndex: 100,
    position: 'fixed',
  },
  deleteButtonLScreen: {
    left: '75%',
    top: 117,
//    color: 'white',
//    backgroundColor: 'red',
    zIndex: 100,
    position: 'absolute',
  },
  deleteButton: {
    left: 132,
    marginTop: 5,
//    color: 'white',
//    backgroundColor: 'red',
    zIndex: 100,
    position: 'fixed',
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

const PlayButton = ({classes, onClick}) => (
  <IconButton className={classes.playPause}>
    <AvPlay onClick={(ev) => onClick(ev)}/>
  </IconButton>
)

const PauseButton = ({classes, onClick}) => (
  <IconButton className={classes.playPause}>
    <AvPause onClick={(ev) => onClick(ev)}/>
  </IconButton>
)

const ShowPage = ({serie, curEp, epList, onClick, onMoreClick, onInfoClick}) => {
  const classes = useStyles()
  const {size, width, height} = useBrowserData()
  const player = useMediaPlayer()
  const sizeToMaxHeight = {"sm": 360,"xs": 230}
  let useHeight = sizeToMaxHeight || height
  const useImg = curEp && curEp.image ? getImgOfObj(curEp) : ""
  const serTitle = serie ? serie.name : ""
  const epTitle = curEp ? " - " + curEp.name : ""
  const title = serTitle + epTitle
//  const isCurPlaying = player.isPaused(curEp)
  const isCurPlaying = player.isPaused
  const handleClick = (ev) => {
    player.startPlay(serie,curEp)
    onClick && onClick(ev)
  }
  const handleInfoClick = (ev) => {
    ev.stopPropagation()
console.log("infoClick")
    onMoreClick && onMoreClick()
  }
  let playStateIcon = <PauseButton classes={classes} onClick={(ev) => handleClick(ev)}/>
  if (!isCurPlaying) {
    playStateIcon = <PlayButton classes={classes} onClick={(ev) => handleClick(ev)}/>
  } else if (player.isPaused) {
    playStateIcon = <PlayButton classes={classes} onClick={(ev) => handleClick(ev)}/>
/*
  } else if (isVideoPlaying) {
    const tempHeight = (Math.trunc((width)*9/16))
    hideNavigation = height -tempHeight < 150 // hide if less than margin
*/
  }
  const fullCoverSize = (width > height * 1.3)
  return (
    <div>
      <ButtonBase
        focusRipple
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
        onClick={(ev) => handleClick(ev)}
        style={{
          width: "100%",
          height: useHeight,
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
            {fullCoverSize && (<span
              className={classes.fabButtonInfo}
              onClick={(ev) => handleInfoClick(ev)}><InfoOutlinedIcon/></span>)}
          </Typography>
        </span>
      </ButtonBase>
      {!fullCoverSize && (<div className={classes.infoTileContent}>
        <div className={classes.infoTileLeft}>
          <Typography className={classes.areaHeadline} type="headline">
            {title}
            </Typography>
          <Typography className={classes.headline} type="headline">
            {curEp.introtext}
            {curEp.fulltext}
          </Typography>
        </div>
      </div>)}
      {!fullCoverSize
      && (<EpList
        epList={epList}
        multiRow
        navButton
        onClick={(ev,ser,ep) => props.onInfoClick(ser,ep)}
        serie={serie}
        isPaused={false}
        useHeight={height}
        width={width}
        imgSrc={getImgOfObj(serie)}/>)}
    </div>
  )
}

export default ShowPage
