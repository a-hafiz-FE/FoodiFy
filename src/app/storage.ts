import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

export const storage = createMMKV({
  id: 'my-app-storage',
  encryptionKey: 'some_encryption_key',
});

export const mmkvStorage: StateStorage = {
  setItem: (key, value) => storage.set(key, value),
  getItem: key => storage.getString(key) ?? null,
  removeItem: key => storage.remove(key),
};
