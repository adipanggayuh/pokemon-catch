import Header from './components/header';
import RootNavigation from './navigation/rootNavigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './config/store';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Header />
          <RootNavigation />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
