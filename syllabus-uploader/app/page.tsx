import SyllabusUploaderScript from "./syllabus-uploader"

export default function SyllabusUploader() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Syllabus Uploader</h1>
          <p className="text-gray-600">Upload and view your course syllabus</p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upload Your Syllabus</h2>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="pt-1 text-sm text-gray-400 group-hover:text-gray-600">
                    Drag and drop a file or click to browse
                  </p>
                </div>
                <input id="file-upload" type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" />
              </label>
            </div>
            <div className="mt-4">
              <button
                id="upload-btn"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload Syllabus
              </button>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Syllabus Preview</h2>
            <div id="preview-container" className="border border-gray-200 rounded-lg p-4 min-h-[500px] bg-white">
              <div id="syllabus-content">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold">Advanced Mathematics 101</h2>
                  <p className="text-gray-600">Fall Semester 2025</p>
                  <p className="text-gray-600">Professor: Dr. Jane Smith</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Course Description</h3>
                  <p>
                    This course provides an introduction to advanced mathematical concepts including calculus, linear
                    algebra, and differential equations. Students will develop problem-solving skills and mathematical
                    reasoning through lectures, discussions, and hands-on exercises.
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Course Objectives</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Understand fundamental concepts of calculus and its applications</li>
                    <li>Develop proficiency in solving linear algebra problems</li>
                    <li>Apply differential equations to real-world scenarios</li>
                    <li>Enhance critical thinking and analytical reasoning skills</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Required Textbooks</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Smith, J. (2024). <em>Principles of Advanced Mathematics</em>. Academic Press.
                    </li>
                    <li>
                      Johnson, R. (2023). <em>Calculus and Linear Algebra: A Unified Approach</em>. University
                      Publishing.
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Grading</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Component
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Percentage
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Homework Assignments</td>
                        <td className="px-6 py-4 whitespace-nowrap">25%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Midterm Exam</td>
                        <td className="px-6 py-4 whitespace-nowrap">30%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Final Exam</td>
                        <td className="px-6 py-4 whitespace-nowrap">35%</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">Participation</td>
                        <td className="px-6 py-4 whitespace-nowrap">10%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Weekly Schedule</h3>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium">Week 1-2: Introduction to Calculus</h4>
                      <p>Limits, continuity, derivatives, and basic applications</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Week 3-4: Advanced Differentiation</h4>
                      <p>Chain rule, implicit differentiation, related rates</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Week 5-6: Integration</h4>
                      <p>Definite and indefinite integrals, techniques of integration</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Week 7-8: Linear Algebra Foundations</h4>
                      <p>Vectors, matrices, systems of linear equations</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Week 9-10: Eigenvalues and Eigenvectors</h4>
                      <p>Determinants, eigenvalues, eigenvectors, and applications</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Week 11-12: Differential Equations</h4>
                      <p>First-order and second-order differential equations</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Week 13-14: Applications and Review</h4>
                      <p>Real-world applications and comprehensive review</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SyllabusUploaderScript />
    </main>
  )
}

