import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1QL_UioBdIEqlcTxujW3U6uh3cc0sv6U",
  authDomain: "contagem-de-quadrinhos.firebaseapp.com",
  projectId: "contagem-de-quadrinhos",
  appId: "1:947344780647:web:e062a1f039a169104c53c2"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
