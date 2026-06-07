/// <reference types="vite/client" />

declare module '@firebase/database' {
  export * from 'firebase/database';
}

declare module 'firebase/database' {
  import { FirebaseApp } from 'firebase/app';

  export class DataSnapshot {
    val(): unknown;
    exists(): boolean;
    forEach(action: (a: DataSnapshot) => boolean): boolean;
    hasChild(path: string): boolean;
    hasChildren(): boolean;
    key: string | null;
    numChildren(): number;
    ref: Reference;
    toJSON(): object | null;
    getPriority(): string | number | null;
    child(path: string): DataSnapshot;
    exportVal(): unknown;
  }

  export interface Reference extends Query {
    key: string | null;
    parent: Reference | null;
    root: Reference;
    database: Database;
    path: string;
    child(path: string): Reference;
    push(value?: unknown, onComplete?: (a: Error | null) => void): ThenableReference;
    set(value: unknown, onComplete?: (a: Error | null) => void): Promise<void>;
    update(values: object, onComplete?: (a: Error | null) => void): Promise<void>;
    remove(onComplete?: (a: Error | null) => void): Promise<void>;
    transaction(
      transactionUpdate: (current: unknown) => unknown,
      onComplete?: (error: Error | null, committed: boolean, snapshot: DataSnapshot | null) => void,
      options?: { onlyOnce?: boolean }
    ): Promise<TransactionResult>;
    once(eventType: string, successCallback?: (a: DataSnapshot) => void, failureCallback?: (a: Error) => void): Promise<DataSnapshot>;
    on(eventType: string, callback: (a: DataSnapshot) => void, cancelCallback?: (a: Error) => void): (a: DataSnapshot) => void;
    off(eventType?: string, callback?: (a: DataSnapshot) => void): void;
    toString(): string;
  }

  export interface ThenableReference extends Reference, Promise<Reference> {}

  export interface Query {
    ref: Reference;
    get(): Promise<DataSnapshot>;
    once(eventType: string, successCallback?: (a: DataSnapshot) => void, failureCallback?: (a: Error) => void): Promise<DataSnapshot>;
    on(eventType: string, callback: (a: DataSnapshot) => void, cancelCallback?: (a: Error) => void): (a: DataSnapshot) => void;
    off(eventType?: string, callback?: (a: DataSnapshot) => void): void;
    limitToFirst(limit: number): Query;
    limitToLast(limit: number): Query;
    orderByChild(path: string): Query;
    orderByKey(): Query;
    orderByPriority(): Query;
    orderByValue(): Query;
    startAt(value: number | string | boolean | null, key?: string): Query;
    endAt(value: number | string | boolean | null, key?: string): Query;
    equalTo(value: number | string | boolean | null, key?: string): Query;
    toString(): string;
  }

  export interface Database {
    app: FirebaseApp;
    ref(path?: string): Reference;
    refFromURL(url: string): Reference;
    goOffline(): void;
    goOnline(): void;
  }

  export interface TransactionResult {
    committed: boolean;
    snapshot: DataSnapshot;
    toJSON(): object | null;
  }

  export function getDatabase(app?: FirebaseApp): Database;
  export function ref(db: Database, path?: string): Reference;
  export function child(parent: Reference, path: string): Reference;
  export function get(query: Query): Promise<DataSnapshot>;
  export function set(ref: Reference, value: unknown): Promise<void>;
  export function update(ref: Reference, values: object): Promise<void>;
  export function push(ref: Reference, value?: unknown): ThenableReference;
  export function remove(ref: Reference): Promise<void>;
  export function runTransaction(ref: Reference, transactionUpdate: (current: unknown) => unknown, options?: { onlyOnce?: boolean }): Promise<TransactionResult>;
  export function query(query: Query, ...constraints: QueryConstraint[]): Query;
  export function orderByChild(path: string): QueryConstraint;
  export function orderByKey(): QueryConstraint;
  export function orderByValue(): QueryConstraint;
  export function equalTo(value: number | string | boolean | null, key?: string): QueryConstraint;
  export function startAt(value: number | string | boolean | null, key?: string): QueryConstraint;
  export function endAt(value: number | string | boolean | null, key?: string): QueryConstraint;
  export function limitToFirst(limit: number): QueryConstraint;
  export function limitToLast(limit: number): QueryConstraint;
  export interface QueryConstraint {}
  export function onDisconnect(ref: Reference): OnDisconnect;
  export interface OnDisconnect {
    set(value: unknown): Promise<void>;
    update(values: object): Promise<void>;
    remove(): Promise<void>;
    cancel(): void;
  }
  export function onValue(query: Query, callback: (snapshot: DataSnapshot) => void, cancelCallback?: (error: Error) => void): () => void;
  export function onChildAdded(query: Query, callback: (snapshot: DataSnapshot) => void, cancelCallback?: (error: Error) => void): () => void;
  export function onChildChanged(query: Query, callback: (snapshot: DataSnapshot) => void, cancelCallback?: (error: Error) => void): () => void;
  export function onChildMoved(query: Query, callback: (snapshot: DataSnapshot) => void, cancelCallback?: (error: Error) => void): () => void;
  export function onChildRemoved(query: Query, callback: (snapshot: DataSnapshot) => void, cancelCallback?: (error: Error) => void): () => void;
  export function off(query: Query, eventType?: string, callback?: (snapshot: DataSnapshot) => void): void;
  export function serverTimestamp(): object;
  export function increment(delta: number): object;
  export function connectDatabaseEmulator(database: Database, host: string, port: number): void;
  export function enableLogging(enabled: boolean): void;
  export function forceLongPolling(): void;
  export function forceWebSockets(): void;
  export function goOffline(db: Database): void;
  export function goOnline(db: Database): void;
  export function refFromURL(db: Database, url: string): Reference;
}
