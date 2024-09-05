// Document type representing each card in the dashboard
export interface Document {
  type: string;
  title: string;
  position: number;
}

// Props for the SortableCard component
export interface SortableCardProps extends Document {
  isDragging: boolean;
  onClick: () => void;
}

// Props for the ImageOverlay component
export interface ImageOverlayProps {
  selectedImage: string | null;
  onClose: () => void;
}

// Shape of the data returned by the useData hook
export interface UseDataReturn {
  documents: Document[];
  loading: boolean;
  error: string | null;
  addDocument: (newDocument: Omit<Document, 'position'>) => Promise<void>;
  updateDocument: (updatedDocument: Document) => Promise<void>;
  deleteDocument: (type: string) => Promise<void>;
}

// DragEndEvent from @dnd-kit/core
export interface DragEndEvent {
  active: { id: string };
  over: { id: string } | null;
}

