import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import { Download } from 'mdi-material-ui'
import LeftIcon from '@material-ui/icons/KeyboardBackspace'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import ItemImage from './item-image'
import useStorageState from '../utils/use-storage-state'
import { menuList } from './cbox-menu-list'

const useStyles = makeStyles(theme => ({
  areaHeadline: {
    paddingTop: 40,
    fontWeight: 600,
    width: '100%',
  },
  epHeadline: {
    paddingTop: 20,
    fontWeight: 600,
    width: '100%',
  },
  headline: {
    paddingTop: 10,
    fontWeight: 300,
    fontSize: '70%',
  },
  epTitle: {
    paddingTop: 15,
    fontWeight: 300,
    width: '100%',
  },
  epDescr: {
    paddingTop: 10,
    fontWeight: 100,
    fontSize: '70%',
    width: '100%',
  },
  iconButton: {
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
    }
  },
  actionButton: {
    color: 'white',
    backgroundColor: 'darkgrey',
    marginLeft: 20,
  },
  buttonPlay: {
    margin: 0,
    top: 200,
    bottom: 'auto',
    left: 200,
    right: 'auto',
    position: 'relative',
    color: '#3f51b5',
    backgroundColor: 'lightgrey',
  },
  floatingButtonBack: {
    margin: 0,
    top: 50,
    bottom: 'auto',
    left: 20,
    left: 'auto',
    zIndex: 100,
    position: 'fixed',
    color: '#3f51b5',
    backgroundColor: 'lightgrey',
  },
  infoImage: {
    height: 230,
    float: 'right',
  },
  infoTileContent: {
    position: 'relative',
    width: '100%',
  },
  infoTileLeft: {
    marginLeft: 10,
  },
}))

const InfoTileItemInclChildren = ({item,curEp,expandIcon,onClickClose,onClickEdit,
                        onClickDownload,onClickPlay,onClickExpand}) => {
  const classes = useStyles()
  const [user] = useStorageState()
  return (
    <div>
      <Fab
        color="secondary"
        className={classes.buttonPlay}
        onClick={(e) => onClickPlay(e)}
      >
        {item && item.mediaType ? menuList[item.mediaType].icon : <PlayArrow/>}
      </Fab>
      <div className={classes.infoTileContent}>
        <div className={classes.infoTileLeft}>
          <Typography className={classes.areaHeadline} type="headline">{item && item.title}</Typography>
        </div>
      </div>
      <ItemImage
        item={item}
        curEp={curEp}
        onClick={(e) => onClickPlay(e)}
        height={230}
        marginTop={15}
        marginLeft={35}
      />
      <div className={classes.infoTileContent}>
        {curEp && (<div className={classes.infoTileLeft}>
          <Typography className={classes.epHeadline} type="headline">{curEp.title}</Typography>
          <Typography className={classes.headline} type="headline">{curEp.introtext}</Typography>
          {(item && item.download) && (<Fab
            onClick={(e) => onClickDownload(e)}
            color="primary"
            aria-label="Download"
            className={classes.actionButton}
          >
            <Download/>
          </Fab>)}
          {user && (<Fab
            onClick={(e) => onClickEdit(e)}
            color="secondary"
            aria-label="Edit"
            className={classes.iconButton}
          >
            <EditIcon/>
          </Fab>)}
          <div className={classes.filler}/>
        </div>)}
      </div>
    </div>
  )
}

export default InfoTileItemInclChildren
