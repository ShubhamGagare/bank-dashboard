import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"


export interface CardDoc {
    type: string
    title: string
    position: number
  }
  


interface SortableCardProps extends CardDoc {
  isDragging: boolean
  onClick: () => void
}

const SortableCard = ({ type, title, isDragging, onClick }: SortableCardProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: type })
    const [imageLoaded, setImageLoaded] = useState(false)
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }
  
    return (
      <Card ref={setNodeRef} className="border shadow-xl m-2 cursor-pointer" style={style} onClick={onClick}>
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="flex-grow">{title}</CardTitle>
          <div {...attributes} {...listeners} className="cursor-grab">
            <GripVertical className="h-5 w-5 text-gray-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-52">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            <img
  
              src={`src/assets/${type}.png`}
              alt={title}
              onLoad={() => setImageLoaded(true)}
              className={cn("rounded-lg w-full h-full object-cover", {
                "opacity-100": imageLoaded,
                "opacity-0": !imageLoaded,
              })}
            />
          </div>
        </CardContent>
      </Card>
    )
  }

  export default SortableCard;
  