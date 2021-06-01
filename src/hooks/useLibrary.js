import { useContext } from 'react'
import { LibraryContext } from "../library-context"
import { wh_area_list } from '../wh_area_list'
import { wh_areas } from '../wh_areas'
import { wh_n_items } from '../wh_n_items'
import { wh_n_rel_tag_item } from '../wh_n_rel_tag_item'
import { wh_n_tags } from '../wh_n_tags'
import { wh_n_tags_full } from '../wh_n_tags_full'

const relToObjectArray = (array) =>
  array.reduce((obj, item) => {
    if (obj[item[0]]==null){
      obj[item[0]] = []
    }
    obj[item[0]].push(item[1])
    return obj
  }, {})

const relToObjectArrayReverse = (array) =>
  array.reduce((obj, item) => {
    if (obj[item[1]]==null){
      obj[item[1]] = []
    }
    obj[item[1]].push(item[0])
    return obj
  }, {})

//const catOfSerie = relToObjectArray(wh_rel_dir_cat)
//const serieOfCat = relToObjectArrayReverse(wh_rel_dir_cat)
const serieOfTag = relToObjectArray(wh_n_rel_tag_item)

const stripHtml = (html) => {
  const tmp = document.createElement("DIV")
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText
}

const getEpItem = (inx,epId) => {
  const maxDescrLen = 120
  if (wh_n_items[epId]!=null) {
    let image = "https://img.youtube.com/vi/HVbzMOcL0xc/mqdefault.jpg"
    if (wh_n_items[epId].video) {
      const checkRegEx = /^.*https:\/\/.*youtube.com\/embed\/(.*?)" .*$/
      const matches = wh_n_items[epId].video.match(checkRegEx)
      if ((matches!=null)&&(matches.length>0)) {
        image = "https://img.youtube.com/vi/" + matches[1] + "/mqdefault.jpg"
      }
    }
    const descr = wh_n_items[epId].description || ""
    const name = wh_n_items[epId].title
    const hits = wh_n_items[epId].hits
    return {
      "id": inx+1,
      name,
      title: name,
      epId,
      descr: descr.substr(0,maxDescrLen),
      fullDescr: descr,
      hits,
      image,
      fullText: wh_n_items[epId].fullText,
      introtext: stripHtml(wh_n_items[epId].introtext),
      video: wh_n_items[epId].video
    }
  } else {
    return {
      "id": inx+1,
      name: "unknown",
      epId,
      descr: "descr",
      fullDescr: "fullDescr",
      hits: 0,
      topicId: 1,
      fullText: "fullText"
    }
  }
}

const compiledSerieList = (lang,tag,curEp) => {
  let tempList = []
  serieOfTag[tag].filter((epId) => epId!==curEp).sort((a,b) => {
    return (wh_n_items[b] ? wh_n_items[b].hits : 0) -  (wh_n_items[a] ? wh_n_items[a].hits : 0)
  }).forEach((epId,index) => {
    tempList.push(getEpItem(index,epId))
  })
  const fileList = tempList.sort((a,b) => {
    return b.hits - a.hits
  })
  fileList.unshift(getEpItem(0,curEp))
  let image = "https://img.youtube.com/vi/HVbzMOcL0xc/mqdefault.jpg"
  if (wh_n_items[curEp] && wh_n_items[curEp].video) {
    const checkRegEx = /^.*https:\/\/.*youtube.com\/embed\/(.*?)" .*$/
    const matches = wh_n_items[curEp].video.match(checkRegEx)
    if ((matches!=null)&&(matches.length>0)) {
      image = "https://img.youtube.com/vi/" + matches[1] + "/mqdefault.jpg"
    }
  }
  return {
    "name": wh_n_tags_full[tag].title,
    "title": wh_n_tags_full[tag].title,
    "description": "",
    "language": lang,
    "mediaType":"vid",
    "public": true,
    fileList,
    image,
    topicId: tag,
    epId: curEp,
    fullText: wh_n_items[curEp].fullText,
    introtext: stripHtml(wh_n_items[curEp].introtext),
    video: wh_n_items[curEp].video
  }
}

const getFirstEpItem = (lang,tag) => {
  const checkFeatured = wh_n_tags_full[tag] && wh_n_tags_full[tag].featured
  let epId
  if ((checkFeatured!=null)&&(checkFeatured.length>0)){
    epId = parseInt(checkFeatured)
  } else {
    if (serieOfTag[tag]!=null) {
      const sortedList = serieOfTag[tag].sort((a,b) => {
        return (wh_n_items[b] ? wh_n_items[b].hits : 0) -  (wh_n_items[a] ? wh_n_items[a].hits : 0)
      })
      epId = sortedList[0]
    } else {
      return {
        "name": wh_n_tags_full[tag].title,
        "description": "",
        "language": lang,
        "mediaType":"vid",
        "public": true,
        descr: "descr",
        fullDescr: "fullDescr",
        hits: 0,
        fullText: "fullText"
      }
    }
  }
  const retObj = getEpItem(0,epId)
  retObj.epId = epId
  retObj.topicId = tag
  return retObj
}

const areaKeys = Object.keys(wh_areas).reverse()
const getAreaObj = (area) => wh_areas[area]
const getAreaContentList = (area) => wh_area_list[area]
const getAreaList = (area) => {
  const areaObj = getAreaContentList(area-1)
  let areaList = []
  //  const maxEntries = 7
  const maxEntries = 99
  areaObj && areaObj.forEach((tagEntry,index) => {
    const tInx = tagEntry.tag
    const title = wh_n_tags_full[tInx].title
//    const checkItem = getFirstEpItem("deu",tInx)
    const checkItem = getFirstEpItem("deu",tagEntry.tag)
    const descr = checkItem.name
    const fullDescr = checkItem.fullDescr
    if (index<maxEntries){
      areaList.push({
        "id": index+1,
        name: title,
        title,
        descr,
        fullDescr,
        topicId: tInx,
        epId: checkItem.epId,
        filename: checkItem.filename,
        image: checkItem.image,
        fullText: checkItem.fullText,
        introtext: stripHtml(checkItem.introtext),
        video: checkItem.video
      })
    }
  })
  return areaList
}

/*
const tempTree = Object.keys(wh_areas).map(area => {
  const tmpList = []
  const areaTopicList = Object.keys(wh_cat).filter(topic => wh_cat[topic].area===area).forEach(topic => {
    let fileList = []
    serieOfCat[topic].sort((a,b) => {
      return wh_dir[b].hits - wh_dir[a].hits
    }).forEach((serId,index) => {
      fileList.push({
        "topic": topic,
        "hits": wh_dir[serId].hits,
      })
    })
    const topicListLen = fileList.length
    const addHitsFactor = topicListLen * 20
    if (fileList.length>0){
      const hits = parseInt(fileList[0].hits) +addHitsFactor
      tmpList.push({
        topic: fileList[0].topic,
        hits,
      })
    }
  })
  return tmpList.sort((a,b) => {
    return b.hits - a.hits
  })
})

wh_area_list.forEach((area,i) => {
  if (area.length>0){
    const aInfo = wh_areas[i+1]
    const aTitle = aInfm.nameLong || aInfm.name
console.log(aTitle)
  }
})

*/

const useLibrary = () => {
  const [state, setState] = useContext(LibraryContext)
//  const {curLang,param,locPath} = state
  return {
    areaKeys,
    getAreaObj,
    getAreaList,
    getEpItem,
    compiledSerieList,
    getFirstEpItem,
    ...state
  }
}

export default useLibrary
