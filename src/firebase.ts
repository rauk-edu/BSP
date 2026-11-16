// Firebase Firestore integration for MoEYS BSP-3Years plans
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { IndicatorRow, ActivityBudgetRow, SchoolProfile } from './data/bspData';
import { StrategicDocument } from './data/reportData';
import firebaseConfig from '../firebase-applet-config.json';

export interface BspPlanRecord {
  id: string;
  schoolCode: string;
  schoolName: string;
  cycleTitle: string;
  startYear: number;
  endYear: number;
  status: 'active' | 'archived' | 'draft';
  schoolProfile: SchoolProfile;
  doc: StrategicDocument;
  table1Rows: IndicatorRow[];
  table2Rows: ActivityBudgetRow[];
  createdAt: string;
  updatedAt: string;
}

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with custom databaseId if configured
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

const COLLECTION_NAME = 'bsp_plans';
const LOCAL_STORAGE_BACKUP_KEY = 'bsp_firestore_cache_plans_v1';

// Test connection
export async function testConnection(): Promise<boolean> {
  try {
    const plansRef = collection(db, COLLECTION_NAME);
    const q = query(plansRef, limit(1));
    await getDocs(q);
    return true;
  } catch (err) {
    console.warn('Firestore direct query warning, using local cache fallback', err);
    return false;
  }
}

// Save plan to Firestore (with local cache fallback)
export async function savePlanToFirestore(plan: BspPlanRecord): Promise<void> {
  // Always update local cache
  try {
    const cached = getCachedPlans();
    const filtered = cached.filter((p) => p.id !== plan.id);
    filtered.unshift(plan);
    localStorage.setItem(LOCAL_STORAGE_BACKUP_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to update local cache', e);
  }

  // Save to Firestore
  try {
    const docRef = doc(db, COLLECTION_NAME, plan.id);
    await setDoc(docRef, plan);
  } catch (err) {
    console.warn('Firestore write warning; stored in local cache', err);
  }
}

// Fetch all plans from Firestore (with local cache fallback)
export async function fetchPlansFromFirestore(): Promise<BspPlanRecord[]> {
  const cached = getCachedPlans();

  try {
    const plansRef = collection(db, COLLECTION_NAME);
    const q = query(plansRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const records: BspPlanRecord[] = [];
      snapshot.forEach((d) => {
        records.push(d.data() as BspPlanRecord);
      });
      // Update local cache
      try {
        localStorage.setItem(LOCAL_STORAGE_BACKUP_KEY, JSON.stringify(records));
      } catch (e) {
        console.error(e);
      }
      return records;
    }
  } catch (err) {
    console.warn('Could not fetch from Firestore network, returning cached plans', err);
  }

  return cached;
}

// Delete plan from Firestore
export async function deletePlanFromFirestore(id: string): Promise<void> {
  // Update local cache
  try {
    const cached = getCachedPlans();
    const filtered = cached.filter((p) => p.id !== id);
    localStorage.setItem(LOCAL_STORAGE_BACKUP_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error(e);
  }

  // Delete from Firestore
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Firestore delete failed, removed from local cache', err);
  }
}

function getCachedPlans(): BspPlanRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_BACKUP_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read cached plans', e);
  }
  return [];
}
