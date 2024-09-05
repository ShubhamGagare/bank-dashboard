"use client"

import { useState, useEffect, useCallback } from "react"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import useData from "@/hooks/useData"
import SortableCard from "@/components/SortableCard"
import ImageOverlay from "@/components/ImageOverlay"
import { Document } from "@/types"
import { format } from "date-fns"

export default function Dashboard() {
  const { documents, loading, updateDocuments } = useData()
  const [docs, setDocs] = useState<Document[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [lastSaveTime, setLastSaveTime] = useState<Date | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (documents) {
      setDocs(documents)
    }
  }, [documents])

  const saveDocuments = useCallback(async () => {
    if (hasChanges) {
      await updateDocuments(docs)
      setLastSaveTime(new Date())
      setHasChanges(false)
    }
  }, [docs, hasChanges, updateDocuments])

  useEffect(() => {
    const intervalId = setInterval(saveDocuments, 5000)
    return () => clearInterval(intervalId)
  }, [saveDocuments])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setDocs((docs) => {
        const oldIndex = docs.findIndex((doc) => doc.type === active.id)
        const newIndex = docs.findIndex((doc) => doc.type === over.id)
        return arrayMove(docs, oldIndex, newIndex).map((doc, index) => ({
          ...doc,
          position: index,


          
        }))
      })
      setHasChanges(true)
    }

    setActiveId(null)
  }

  const handleDragStart = (event: DragEndEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleCardClick = (type: string) => {
    setSelectedImage(type)
  }

  const closeOverlay = () => {
    setSelectedImage(null)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <div className="w-full min-h-screen p-4 bg-background">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Bank Dashboard</h2>
          <div className="text-xl ">
          Last saved: {lastSaveTime && ` ${format(lastSaveTime, 'HH:mm:ss')}`}
          </div>
        </div>
        <SortableContext items={docs.map(doc => doc.type)} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {docs.map((doc) => (
              <SortableCard key={doc.position} {...doc} isDragging={doc.type === activeId} onClick={() => handleCardClick(doc.type)} />
            ))}
          </div>
        </SortableContext>
      </div>

      <ImageOverlay selectedImage={selectedImage} onClose={closeOverlay} />
    </DndContext>
  )
}