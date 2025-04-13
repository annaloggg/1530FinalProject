"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function SyllabusUploader() {
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string | null
      if (content === null) {
        setIsLoading(false)
        return
      }
      setFileContent(content)
      setIsLoading(false)
      // Store in localStorage
      localStorage.setItem('syllabusContent', content);
      localStorage.setItem('syllabusFileName', file.name);
    }

    reader.readAsText(file)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Upload Syllabus</CardTitle>
          <CardDescription>Upload your syllabus file to view its contents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full">
              <label
                htmlFor="fileInput"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="h-8 w-8 text-gray-500 mb-2" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">Text files (.txt, .md, .doc, etc.)</p>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".txt,.doc,.docx,.pdf,.md"
                />
              </label>
            </div>

            {fileName && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FileText className="h-4 w-4" />
                <span>{fileName}</span>
              </div>
            )}

            {isLoading && (
              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                <span className="ml-2 text-gray-500">Processing file...</span>
              </div>
            )}

            {fileContent && !isLoading && (
              <div className="w-full">
                <h3 className="text-lg font-medium mb-2">Syllabus Content</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap break-words text-sm">{fileContent}</pre>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => {
                      setFileContent(null)
                      setFileName(null)
                    }}
                    variant="outline"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
