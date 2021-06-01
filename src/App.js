import React from 'react'
import './App.css'
//import CboxAppContainer from './containers/cbox-app-container'
import FeaturedItem from './components/featured-item'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { BrowserDataProvider } from "./browser-data-context"
import { MediaPlayerProvider } from "./media-player-context"
import { MediaPlayer } from "./components/media-player"
import { LibraryProvider } from "./library-context"
import { SettingsProvider } from "./settings-context"

import { gql, ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://us-central1-qombi-media.cloudfunctions.net/handler',
//  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
		query: {
			fetchPolicy: 'network-only'
		}
	},
  onError: (e) => {
    console.log( e)
    console.log('graphQLErrors', e.graphQLErrors)
    console.log('networkError', e.networkError)
  }
})

//<CboxAppContainer/>

const App = () => {
  return (
    <ApolloProvider client={client}>
      <I18nextProvider i18n={ i18n }>
        <BrowserDataProvider>
          <MediaPlayerProvider>
            <LibraryProvider>
              <SettingsProvider>
                <FeaturedItem/>
                <MediaPlayer/>
              </SettingsProvider>
            </LibraryProvider>
          </MediaPlayerProvider>
        </BrowserDataProvider>
      </I18nextProvider>
    </ApolloProvider>
  )
}

export default App
