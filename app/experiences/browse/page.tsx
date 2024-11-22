'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

// Mock data for experiences with optional images
const experiences = [
  { id: 1, title: "Hidden Cafe Tour", location: "Tokyo, Japan", tags: ["food and drink", "art and culture"], rating: 4.5 },
  { id: 2, title: "Street Art Walk", location: "Berlin, Germany", tags: ["art and culture"], rating: 4.2 },
  { id: 3, title: "Local Cooking Class", location: "Bangkok, Thailand", tags: ["food and drink"], rating: 4.8 },
  { id: 4, title: "Secret Beach Hike", location: "Bali, Indonesia", tags: ["nature", "adventure"], rating: 4.6 },
  { id: 5, title: "Vintage Market Hunt", location: "Paris, France", tags: ["shopping", "art and culture"], rating: 4.3 },
  { id: 6, title: "Rooftop Yoga", location: "New York, USA", tags: [], rating: 4.1 },
]

// All unique tags from the experiences
const tags = [
    "adventure",
    "art and culture",
    "food and drink",
    "history",
    "music",
    "nature",
    "nightlife",
    "shopping",
]

export default function BrowseExperiences() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredExperiences = experiences.filter(exp => 
    (exp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     exp.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedTags.length === 0 || selectedTags.some(tag => exp.tags.includes(tag)))
  )

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Browse Experiences</h1>
      
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search experiences or locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredExperiences.map(exp => (
          <Card key={exp.id} className="flex flex-col cursor-pointer transition-transform transform hover:scale-105">
            {exp.image && (
              <div className="relative w-full h-48">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-lg"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{exp.title}</CardTitle>
              <CardDescription>{exp.location}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {exp.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-muted-foreground">Rating: {exp.rating}/5</span>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
