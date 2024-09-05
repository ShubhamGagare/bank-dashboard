import { Document } from '../types';

const STORAGE_KEY = 'dashboard_documents';

const defaultDocuments: Document[] = [
  { "type": "bankdraft", "title": "Bank Draft", "position": 0 },
  { "type": "bill-of-lading", "title": "Bill of Lading", "position": 1 },
  { "type": "invoice", "title": "Invoice", "position": 2 },
  { "type": "bank-draft-2", "title": "Bank Draft 2", "position": 3 },
  { "type": "bill-of-lading-2", "title": "Bill of Lading 2", "position": 4 }
];

export const getStoredDocuments = (): Document[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDocuments));
    return defaultDocuments;
  }
  return JSON.parse(storedData);
};

export const setStoredDocuments = (documents: Document[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
};

export const addDocument = (document: Document): Document[] => {
  const documents = getStoredDocuments();
  const newDocuments = [...documents, { ...document, position: documents.length }];
  setStoredDocuments(newDocuments);
  return newDocuments;
};

export const updateDocument = (updatedDocument: Document): Document[] => {
  const documents = getStoredDocuments();
  const newDocuments = documents.map(doc => 
    doc.type === updatedDocument.type ? updatedDocument : doc
  );
  setStoredDocuments(newDocuments);
  return newDocuments;
};

export const deleteDocument = (type: string): Document[] => {
  const documents = getStoredDocuments();
  const newDocuments = documents.filter(doc => doc.type !== type)
    .map((doc, index) => ({ ...doc, position: index }));
  setStoredDocuments(newDocuments);
  return newDocuments;
};