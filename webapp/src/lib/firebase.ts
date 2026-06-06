import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDUGwz1YOgCRVYK6n73BY9NWCAdkXlEpns",
  authDomain: "yuinx-waitlist.firebaseapp.com",
  databaseURL: "https://yuinx-waitlist-default-rtdb.firebaseio.com",
  projectId: "yuinx-waitlist",
  storageBucket: "yuinx-waitlist.firebasestorage.app",
  messagingSenderId: "1075761613808",
  appId: "1:1075761613808:web:f0df774d97deb974acab35",
  measurementId: "G-J1B16VH3L0"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
