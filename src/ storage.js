import storage from './store';

// clave para almacenar en caché los datos
const USER_NAME = 'USER_NAME'; 
const USER_USERNAME = 'USER_USERNAME'; 
const USER_LASTNAME = 'USER_LASTNAME'; 
const USER_ID = 'USER_ID'; 
const USER_EMAIL = 'USER_EMAIL'; 
const USER_TOKEN = 'USER_TOKEN'; 
const USER_LOGGED = 'USER_LOGGED'; 


export const storage = {
  //USER NAME
  set setLocalStorageName(val) {
    if (!val) {
      storage.remove(USER_NAME);
    } else {
      storage.set(USER_NAME, val);
    }
  },
  get getLocalStorageName() {
    return storage.get(USER_NAME);
  },
  //USER USERNAME
  set setLocalStorageUserName(val) {
    if (!val) {
      storage.remove(USER_USERNAME);
    } else {
      storage.set(USER_USERNAME, val);
    }
  },
  get getLocalStorageUserName() {
    return storage.get(USER_USERNAME);
  },
  //USER LASTNAME
  set setLocalStorageLastName(val) {
    if (!val) {
      storage.remove(USER_LASTNAME);
    } else {
      storage.set(USER_LASTNAME, val);
    }
  },
  get getLocalStorageLastName() {
    return storage.get(USER_LASTNAME);
  },
  //USER ID
  set setLocalStorageId(val) {
    if (!val) {
      storage.remove(USER_ID);
    } else {
      storage.set(USER_ID, val);
    }
  },
  get getLocalStorageId() {
    return storage.get(USER_ID);
  },
  //USER EMAIL
  set setLocalStorageEmail(val) {
    if (!val) {
      storage.remove(USER_EMAIL);
    } else {
      storage.set(USER_EMAIL, val);
    }
  },
  get getLocalStorageEmail() {
    return storage.get(USER_EMAIL);
  },
  //USER TOKEN
  set setLocalStorageToken(val) {
    if (!val) {
      storage.remove(USER_TOKEN);
    } else {
      storage.set(USER_TOKEN, val);
    }
  },
  get getLocalStorageToken() {
    return storage.get(USER_TOKEN);
  },
    //USER LOGGED
  set setLocalStorageLogged(val) {
    if (!val) {
      storage.remove(EMAIL_LOGGED);
    } else {
      storage.set(USER_LOGGED, val);
    }
  },
  get getLocalStorageLogged() {
    return storage.get(USER_LOGGED);
  }

}