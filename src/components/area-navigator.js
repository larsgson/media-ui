import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useBrowserData from '../hooks/useBrowserData'
import useLibrary from '../hooks/useLibrary'
import Card from '@material-ui/core/Card'
import TileItemMiniScrollChildren from './tile-item-mini-scroll-children'

const useStyles = makeStyles(theme => ({
  cardWrap: {
    position: 'relative',
    color: '#555',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 70,
  },
}))

const AreaNavigator = ({onClick}) => {
  const {areaKeys, getAreaList, getAreaObj} = useLibrary()
  const classes = useStyles()
  return (
    <Card
      className={classes.cardWrap}
    >
      {areaKeys.map((area,i) => {
        const areaList = getAreaList(area)
        const aInfo = getAreaObj(area)
        const aName = aInfo.nameLong || aInfo.name
        return ((areaList===null) || (areaList.length===0))
          ? <div key={i}/>
          : <TileItemMiniScrollChildren
              key={i}
              name={aName}
              serie={aInfo}
              infoTile
              expanded
              multiRow={false}
              curEp={areaList[0]}
              epList={areaList}
              onClick={(ev,ser,ep) => onClick(ev,ser,ep)}/>
      })}
    </Card>
  )
}
/*
onClickExpand={(e) => handleShowAllEp(e,!showAllEp)}

name={aName}
itemList={areaList}

*/

export default AreaNavigator
