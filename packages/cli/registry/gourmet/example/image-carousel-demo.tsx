"use client"

import { Check, Circle, Pencil, Trash, X } from "lucide-react"

import {
  ImageCarousel,
  ImageCarouselItem,
  ImageCarouselItemDescription,
  ImageCarouselItemIcon,
  ImageCarouselItemImage,
  ImageCarouselItemTitle,
} from "@/registry/default/annui/image-carousel"

export default function ImageCarouselDemo() {
  return (
    <ImageCarousel className="h-64 text-white" defaultValue="delete">
      <ImageCarouselItem value="edit">
        <ImageCarouselItemImage src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop" />
        <ImageCarouselItemIcon>
          <Pencil />
        </ImageCarouselItemIcon>
        <ImageCarouselItemTitle>Edit</ImageCarouselItemTitle>
        <ImageCarouselItemDescription>
          Edit the image
        </ImageCarouselItemDescription>
      </ImageCarouselItem>
      <ImageCarouselItem value="delete">
        <ImageCarouselItemImage src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=200&fit=crop" />
        <ImageCarouselItemIcon>
          <Trash />
        </ImageCarouselItemIcon>
        <ImageCarouselItemTitle>Delete</ImageCarouselItemTitle>
        <ImageCarouselItemDescription>
          Delete the image
        </ImageCarouselItemDescription>
      </ImageCarouselItem>
      <ImageCarouselItem value="cancel">
        <ImageCarouselItemImage src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=200&fit=crop" />
        <ImageCarouselItemIcon>
          <X />
        </ImageCarouselItemIcon>
        <ImageCarouselItemTitle>Cancel</ImageCarouselItemTitle>
        <ImageCarouselItemDescription>
          Cancel the action
        </ImageCarouselItemDescription>
      </ImageCarouselItem>
      <ImageCarouselItem value="confirm">
        <ImageCarouselItemImage src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop" />
        <ImageCarouselItemIcon>
          <Check />
        </ImageCarouselItemIcon>
        <ImageCarouselItemTitle>Confirm</ImageCarouselItemTitle>
        <ImageCarouselItemDescription>
          Confirm the action
        </ImageCarouselItemDescription>
      </ImageCarouselItem>
      <ImageCarouselItem value="default">
        <ImageCarouselItemImage src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=300&h=200&fit=crop" />
        <ImageCarouselItemIcon>
          <Circle />
        </ImageCarouselItemIcon>
        <ImageCarouselItemTitle>Default</ImageCarouselItemTitle>
        <ImageCarouselItemDescription>
          Default the action
        </ImageCarouselItemDescription>
      </ImageCarouselItem>
    </ImageCarousel>
  )
}
