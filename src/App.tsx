import AppLoading from 'Components/AppLoading/AppLoading';
import i18n from 'Languages/i18n';
import AppNavigationContainer from 'Navigation/NavigationContainer';
import React, { JSX } from 'react';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configStore } from 'Stores';
import {ThemeCustom} from 'Themes';
const { persistor, store } = configStore();

const WrapProvider = (): JSX.Element =>
{
  return (
    <GestureHandlerRootView>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigationContainer />
        <AppLoading />
      </PersistGate>
    </GestureHandlerRootView>
  );
};
function App(): JSX.Element
{
  return (
    <Provider store={store}>
      <PaperProvider theme={ThemeCustom} >
        <I18nextProvider i18n={i18n}>
          <WrapProvider />
        </I18nextProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
