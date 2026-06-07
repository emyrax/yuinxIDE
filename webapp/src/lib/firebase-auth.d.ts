declare module '@firebase/auth' {
  export function getAuth(app?: any): any;
  export class GoogleAuthProvider {
    constructor();
    addScope(scope: string): void;
  }
  export function signInWithPopup(auth: any, provider: any): Promise<any>;
  export function signInWithEmailAndPassword(auth: any, email: string, password: string): Promise<any>;
  export function createUserWithEmailAndPassword(auth: any, email: string, password: string): Promise<any>;
  export function signOut(auth: any): Promise<void>;
  export function onAuthStateChanged(auth: any, nextOrObserver: any): () => void;
  export type User = any;
}
