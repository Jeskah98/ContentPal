'use client'
import { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'

export default function FileUploader() {
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState('')

  const handleUpload = (file: File) => {
    const storageRef = ref(storage, `uploads/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      (error) => {
        console.error('Upload failed:', error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(setDownloadURL)
      }
    )
  }

  return (
    <div>
      <input
        type="file"
        onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
      />
      {progress > 0 && <progress value={progress} max="100" />}
      {downloadURL && <a href={downloadURL}>Download File</a>}
    </div>
  )
}