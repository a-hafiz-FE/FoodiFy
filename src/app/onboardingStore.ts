import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from './storage';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type UserRole = 'user' | 'chef';

export type AppUser = {
  uid: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  phoneNumber: string;
  role: UserRole;
  isVerified: boolean;
  createdAt?: any;
  updatedAt?: any;
};

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

type OnboardingState = {
  // ── Persisted ──────────────────────────────
  hasSeenIntro: boolean;
  isAuthenticated: boolean;
  currentUser: AppUser | null;

  // ── Transient ──────────────────────────────
  authStatus: AuthStatus;
  authError: string | undefined;
  phoneForVerify: string;

  // ── Actions ────────────────────────────────
  completeIntro: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  sendPhoneCode: (phoneNumber: string) => Promise<void>;
  verifyOtp: (phoneNumber: string, code: string) => Promise<void>;
  signOut: () => void;
  setPhoneForVerify: (phone: string) => void;
};

// ─────────────────────────────────────────────
// FIRESTORE HELPER — upsert user document
// ─────────────────────────────────────────────

const upsertUserDoc = async (user: {
  uid: string;
  email: string;
  displayName?: string;
}) => {
  const db = getFirestore();
  const ref = doc(db, 'users', user.uid);
  const snap = await getDoc(ref);

  if (!snap.exists) {
    // First time — create the user document
    await setDoc(ref, {
      email: user.email,
      displayName: user.displayName ?? '',
      avatarUrl: '',
      phoneNumber: '',
      role: 'user' as UserRole,
      isChef: false,
      isVerified: false,
      bio: '',
      ratingAvg: 0,
      ratingCount: 0,
      savedMeals: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } else {
    // Returning user — just update timestamp
    await setDoc(ref, { updatedAt: serverTimestamp() }, { merge: true });
  }

  // Return the latest user doc
  const fresh = await getDoc(ref);
  const d = fresh.data() ?? {};
  return {
    uid: user.uid,
    email: String(d.email ?? user.email),
    displayName: String(d.displayName ?? ''),
    avatarUrl: String(d.avatarUrl ?? ''),
    phoneNumber: String(d.phoneNumber ?? ''),
    role: (d.role ?? 'user') as UserRole,
    isVerified: Boolean(d.isVerified),
  } satisfies AppUser;
};

// ─────────────────────────────────────────────
// STORE
// ─────────────────────────────────────────────

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      // ── Persisted defaults ──────────────────
      hasSeenIntro: false,
      isAuthenticated: false,
      currentUser: null,

      // ── Transient defaults ──────────────────
      authStatus: 'idle',
      authError: undefined,
      phoneForVerify: '',

      // ──────────────────────────────────────────
      // INTRO
      // ──────────────────────────────────────────

      completeIntro: () => set({ hasSeenIntro: true }),

      // ──────────────────────────────────────────
      // SIGN IN
      // ──────────────────────────────────────────
      // TODO: Wire up @react-native-firebase/auth
      // For now this writes to Firestore only.
      // Replace the body once you install & configure
      // @react-native-firebase/auth.
      // ──────────────────────────────────────────

      signIn: async (email, password) => {
        set({ authStatus: 'loading', authError: undefined });
        try {
          // ── Firebase Auth placeholder ──
          // const cred = await auth().signInWithEmailAndPassword(email, password);
          // const uid = cred.user.uid;

          // Temporary: use email hash as uid for development
          const uid = email.toLowerCase().replace(/[^a-z0-9]/g, '_');
          const user = await upsertUserDoc({ uid, email });

          set({
            authStatus: 'authenticated',
            isAuthenticated: true,
            currentUser: user,
          });
        } catch (e: any) {
          set({
            authStatus: 'error',
            authError: e?.message ?? 'Sign in failed',
          });
        }
      },

      // ──────────────────────────────────────────
      // SIGN UP
      // ──────────────────────────────────────────

      signUp: async (email, password) => {
        set({ authStatus: 'loading', authError: undefined });
        try {
          // ── Firebase Auth placeholder ──
          // const cred = await auth().createUserWithEmailAndPassword(email, password);
          // const uid = cred.user.uid;

          const uid = email.toLowerCase().replace(/[^a-z0-9]/g, '_');
          const user = await upsertUserDoc({ uid, email });

          set({
            authStatus: 'authenticated',
            isAuthenticated: true,
            currentUser: user,
          });
        } catch (e: any) {
          set({
            authStatus: 'error',
            authError: e?.message ?? 'Sign up failed',
          });
        }
      },

      // ──────────────────────────────────────────
      // PHONE VERIFICATION
      // ──────────────────────────────────────────

      setPhoneForVerify: phone => set({ phoneForVerify: phone }),

      sendPhoneCode: async (phoneNumber: string) => {
        set({ authStatus: 'loading', authError: undefined });
        try {
          // TODO: await auth().verifyPhoneNumber(phoneNumber)
          set({ authStatus: 'idle', phoneForVerify: phoneNumber });
        } catch (e: any) {
          set({
            authStatus: 'error',
            authError: e?.message ?? 'Failed to send code',
          });
        }
      },

      verifyOtp: async (phoneNumber: string, code: string) => {
        set({ authStatus: 'loading', authError: undefined });
        try {
          // TODO: Confirm OTP via Firebase Auth
          // const credential = auth.PhoneAuthProvider.credential(verificationId, code);
          // await auth().signInWithCredential(credential);

          // For now, update phone on the current user doc
          const currentUser = get().currentUser;
          if (currentUser) {
            const db = getFirestore();
            await setDoc(
              doc(db, 'users', currentUser.uid),
              {
                phoneNumber,
                isVerified: true,
                updatedAt: serverTimestamp(),
              },
              { merge: true },
            );
            set({
              authStatus: 'authenticated',
              currentUser: {
                ...currentUser,
                phoneNumber,
                isVerified: true,
              },
            });
          } else {
            set({ authStatus: 'authenticated' });
          }
        } catch (e: any) {
          set({
            authStatus: 'error',
            authError: e?.message ?? 'Verification failed',
          });
        }
      },

      // ──────────────────────────────────────────
      // SIGN OUT
      // ──────────────────────────────────────────

      signOut: () => {
        // TODO: await auth().signOut();
        set({
          isAuthenticated: false,
          currentUser: null,
          authStatus: 'idle',
          authError: undefined,
        });
      },
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => mmkvStorage),
      partialize: s => ({
        hasSeenIntro: s.hasSeenIntro,
        isAuthenticated: s.isAuthenticated,
        currentUser: s.currentUser,
      }),
    },
  ),
);
