import React, {useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import EpList from './ep-list'
import ItemImage from './item-image'
import ItemBar from './item-bar'
import InfoTileItem from './info-tile-item'
import { menuList } from './cbox-menu-list'
import { getImgOfObj } from '../utils/obj-functions'
import { apiObjGetStorage } from '../utils/api'
import useBrowserData from '../hooks/useBrowserData'
import useMediaPlayer from "../hooks/useMediaPlayer"

const useStyles = makeStyles(theme => ({
  headline: {
    paddingTop: 15,
    fontWeight: 600,
    color: '#555',
  },
  areaHeadline: {
    paddingTop: 20,
    paddingLeft: 10,
    fontWeight: 600,
    color: '#555',
    width: '100%',
  },
}))

const TileItemMiniScrollChildren = (props) => {
  const {useIcon,name,epList} = props
  const {width, height} = useBrowserData()
  const {curPlay} = useMediaPlayer()
  const classes = useStyles()
  return (
  <div onClick={(e) => (!infoTile) && props.onClick(e)}>
    <Typography className={classes.areaHeadline} type="headline">{name}</Typography>
    {epList
    && (<EpList
      epList={epList}
      multiRow={false}
      onClick={(ev,ser,ep) => console.log(ep)}
      isPaused={false}
      useHeight={height}
      width={width}
      useIcon={useIcon}/>)}
  </div>
  )
}

export default TileItemMiniScrollChildren
