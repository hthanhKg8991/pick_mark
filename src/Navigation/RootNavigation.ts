import { createRef } from 'react';
import { StackActions } from '@react-navigation/native';
import ScreenName from 'Navigation/ScreenName'
export const navigationRef = createRef<any>();

class RootNavigation {
    currentRouteName = null;

  _checkNavigation() {
    return !!navigationRef.current;
  }

  _checkValidName(name: any) {
    return (
      //   !StringUtils.isEmptyString(name) && Object.values(Screens).includes(name)
      Object.values(ScreenName).includes(name)
    );
  }
  
  mappingChangedScreen = (screen: any) => {
    return screen;
  };

  setRouteName(name: any) {
    this.currentRouteName = name;
  }

  replace(name: string, params: object | any) {
    if (!this._checkNavigation() || !this._checkValidName(name)) {
      return;
    }
    navigationRef.current.dispatch(StackActions.replace(name, params));
  }

  navigate(name: string, params: object | any) {
    const newName = this.mappingChangedScreen(name);
    console.log('[RootNavigation] navigate::', {name, newName, params});
    if (!this._checkNavigation() || !this._checkValidName(newName)) {
      return;
    }
    navigationRef?.current.navigate(newName, params);
  }

  reset(name: string){
    navigationRef?.current.reset({
      index: 0,
      routes: [{ name }],
    });
  }

  goBack() {
    if (!this._checkNavigation()) {
      return;
    }
    if (navigationRef?.current.canGoBack()) {
      navigationRef?.current.goBack();
    }
  }
}

const RootNavigationInstance = new RootNavigation();
export default RootNavigationInstance;
