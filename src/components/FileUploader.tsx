'use client'
import { useState, ChangeEvent } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'

export default function FileUploader() {
  const [progress, setProgress] = useState(0)
  const [downloadURL, setDownloadURL] = useState('')

  const handleUpload = (file: File) => {
    const storageRef = ref(storage, `uploads/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    setProgress(0); // Reset progress on new upload
 setDownloadURL(''); // Clear previous download URL

    if (!file) {
      return; // Handle case where no file is selected
    }
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
      />
      {progress > 0 && <progress value={progress} max="100" />}
      {downloadURL && <p>File uploaded! Download URL: <a href={downloadURL} target="_blank" rel="noopener noreferrer">{downloadURL}</a></p>}
    </div>
  )
}