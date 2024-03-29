import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles(theme => ({
  titleBar: {
    alignItems: 'flex-end',
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  subtitle: {
    whiteSpace: 'unset',
    paddingBottom: 5,
  },
  title: {
    whiteSpace: 'unset',
    textOverflow: 'clip',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playPause: {
    color: 'white',
  },
  bar: {
    backgroundColor: 'red',
  },
  linearProgressBar: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
}))

const ItemProgressBar = ({classes,value}) => (
  <LinearProgress
    variant="determinate"
    classes={{
      root: classes.linearProgressBar,
      bar: classes.bar,
    }}
    value={value}/>
)
const ItemButton = ({useIcon,bkgrd,classes,onClick}) => (
  <IconButton size="small" className={classes.playPause}
    style={{backgroundColor: bkgrd}} onClick={onClick}>
    {useIcon}
  </IconButton>
)

const ItemBar = ({title, descr, useIcon, bkgrd, percentVal, onClick}) => {
  const classes = useStyles()
  return (
    <GridListTileBar
      title={title}
      subtitle={(<div>{percentVal
            && (<ItemProgressBar classes={classes} value={percentVal}/>)}{descr}</div>)}
      classes={{
        root: classes.titleBar,
        title: classes.title,
        subtitle: classes.subtitle,
      }}
      actionIcon={(
        <ItemButton
          useIcon={useIcon}
          classes={classes}
          bkgrd={bkgrd}
          onClick={(e) => onClick(e)}/>)}
    />
  )
}

export default ItemBar
