import { X } from "lucide-react"
import { useRef, useCallback, useEffect } from "react"

interface ImageOverlayProps {
  selectedImage: string | null
  onClose: () => void
}

export default function ImageOverlay({ selectedImage, onClose }: ImageOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleOverlayClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
      onClose()
    }
  }, [onClose])

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  if (!selectedImage) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOverlayClick}>
      <div ref={overlayRef} className="flex-col space-y-2 p-4 relative bg-white p-4 rounded-lg w-[60vw] h-fit" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="flex w-full h-fit justify-end text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>
        <img
          className="rounded-lg object-cover w-full h-[80vh]"
          src={`src/assets/${selectedImage}.png`}
          alt={selectedImage}
        />
      </div>
    </div>
  )
}