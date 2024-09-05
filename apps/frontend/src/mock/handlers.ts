import { http, HttpResponse } from 'msw';
import { getStoredDocuments, setStoredDocuments } from '@/lib/localstorage';
import { Document } from '../types';

export const handlers = [
  http.get('/data/documents', () => {
    const documents = getStoredDocuments();
    return HttpResponse.json(documents);
  }),

  http.put('/data/documents', async ({ request }) => {
    const updatedDocuments = await request.json() as Document[];
    setStoredDocuments(updatedDocuments);
    return HttpResponse.json(updatedDocuments);
  }),

];