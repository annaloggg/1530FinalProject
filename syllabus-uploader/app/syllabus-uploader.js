"use client"

import { useEffect } from "react"

export default function SyllabusUploaderScript() {
  useEffect(() => {
    const fileUpload = document.getElementById("file-upload")
    const uploadBtn = document.getElementById("upload-btn")
    const previewContainer = document.getElementById("preview-container")
    const syllabusContent = document.getElementById("syllabus-content")

    if (!fileUpload || !uploadBtn || !previewContainer || !syllabusContent) return

    let selectedFile = null

    fileUpload.addEventListener("change", (e) => {
      selectedFile = e.target.files[0]
      if (selectedFile) {
        uploadBtn.textContent = `Upload ${selectedFile.name}`
      }
    })

    uploadBtn.addEventListener("click", () => {
      if (!selectedFile) {
        alert("Please select a file first")
        return
      }

      // For text files, we can read and display the content
      if (selectedFile.type === "text/plain") {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target.result
          syllabusContent.innerHTML = `<pre>${content}</pre>`
        }
        reader.readAsText(selectedFile)
      } else {
        // For other file types (PDF, DOC, etc.), we would normally use a viewer
        // For this example, we'll just show a message
        syllabusContent.innerHTML = `
          <div class="text-center p-8">
            <h3 class="text-xl font-semibold mb-2">File Uploaded Successfully</h3>
            <p class="mb-4">File: ${selectedFile.name}</p>
            <p class="mb-4">Size: ${(selectedFile.size / 1024).toFixed(2)} KB</p>
            <p class="text-gray-600">In a real application, we would render the content of ${selectedFile.name} here.</p>
          </div>
        `
      }

      // Show success message
      const successMessage = document.createElement("div")
      successMessage.className = "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
      successMessage.innerHTML = `
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline"> Your syllabus has been uploaded.</span>
      `

      // Remove any existing success message
      const existingMessage = document.querySelector(".bg-green-100")
      if (existingMessage) {
        existingMessage.remove()
      }

      // Add the success message after the upload button
      uploadBtn.parentNode.appendChild(successMessage)

      // Clear the file input
      fileUpload.value = ""
      selectedFile = null
      uploadBtn.textContent = "Upload Syllabus"

      // Auto-remove the success message after 5 seconds
      setTimeout(() => {
        successMessage.remove()
      }, 5000)
    })
  }, [])

  return null
}

