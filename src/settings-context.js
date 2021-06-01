import React, { useState } from 'react'

const SettingsContext = React.createContext([{}, () => {}])
const SettingsProvider = ({children}) => {
  const [state, setState] = useState({
    curLang: "deu",
    param: "",
    locPath: "",
  })
  return (
    <SettingsContext.Provider value={[state, setState]}>
      {children}
    </SettingsContext.Provider>
  )
}
export {SettingsContext, SettingsProvider}
