import { useEffect, useState } from 'react';
import { Document } from '../types';

const useData = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    try {


      const response = await fetch('/data/documents');
      const result: Document[] = await response.json();
      setDocuments(result);
      setLoading(false);

    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const updateDocuments = async (updatedDocs: Document[]) => {
    try {
      const response = await fetch('/data/documents', { method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDocs),
      });
      const result: Document[] = await response.json();
      setDocuments(result);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return { documents, loading, error, updateDocuments };
};

export default useData;