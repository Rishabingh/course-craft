import React from 'react'
import { useParams } from 'react-router'

export default function CoursePage() {
  const { id } = useParams();
  return (
    <div>
      CoursePage
      {id}
    </div>
  )
}
