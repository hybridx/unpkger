import React, { useState, useEffect } from 'react'
import { Copy, Package, ArrowRight, CheckCircle, Github, ExternalLink, Sparkles } from 'lucide-react'

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [copiedItems, setCopiedItems] = useState({})

  // Convert npm links to unpkg links
  const convertToUnpkg = (text) => {
    if (!text.trim()) return ''
    
    // Pattern for npm package names (with or without scoped packages)
    const npmPatterns = [
      // npm install package@version
      /npm install\s+(@?[a-zA-Z0-9-_./]+)(?:@([^\s]+))?/g,
      // import from 'package'
      /import\s+.*?\s+from\s+['"](@?[a-zA-Z0-9-_./]+)(?:@([^'"]+))?['"]/g,
      // require('package')
      /require\(['"](@?[a-zA-Z0-9-_./]+)(?:@([^'"]+))?['"]\)/g,
      // Direct npm URLs
      /https?:\/\/(?:www\.)?npmjs\.com\/package\/(@?[a-zA-Z0-9-_./]+)(?:\/v\/([^\/\s]+))?/g,
      // Just package names
      /^(@?[a-zA-Z0-9-_./]+)(?:@([^\s]+))?$/gm
    ]

    let result = text
    
    npmPatterns.forEach(pattern => {
      result = result.replace(pattern, (match, packageName, version) => {
        const cleanPackage = packageName.trim()
        const cleanVersion = version ? version.trim() : 'latest'
        
        if (match.includes('npm install')) {
          return `<script src="https://unpkg.com/${cleanPackage}@${cleanVersion}"></script>`
        } else if (match.includes('import') || match.includes('require')) {
          return `https://unpkg.com/${cleanPackage}@${cleanVersion}`
        } else if (match.includes('npmjs.com')) {
          // For npm URLs, provide both options
          return `CDN: https://unpkg.com/${cleanPackage}@${cleanVersion}/<file-path>
Browse: https://unpkg.com/${cleanPackage}@${cleanVersion}/`
        } else {
          return `https://unpkg.com/${cleanPackage}@${cleanVersion}`
        }
      })
    })

    return result
  }

  useEffect(() => {
    const converted = convertToUnpkg(input)
    setOutput(converted)
    setCopiedItems({}) // Reset individual copied states when output changes
  }, [input])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const copyIndividualItem = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => ({ ...prev, [index]: true }))
      setTimeout(() => {
        setCopiedItems(prev => ({ ...prev, [index]: false }))
      }, 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const examples = [
    'npm install react@18.2.0',
    'import React from "react"',
    'require("lodash")',
    'https://www.npmjs.com/package/@hybridxweb/copyright-x',
    'https://www.npmjs.com/package/axios',
    '@types/node@20.0.0'
  ]

  const handleExampleClick = (example) => {
    setInput(example)
  }

  // Function to render output with multiple results
  const renderOutput = () => {
    if (!output) return null

    // Check if output contains multiple lines (for npm URL conversions)
    const lines = output.split('\n').filter(line => line.trim())
    
    if (lines.length > 1) {
      return (
        <div className="space-y-3">
          {lines.map((line, index) => {
            const cleanLine = line.replace(/^(CDN:|Browse:)\s*/, '')
            return (
              <div key={index} className="p-3 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-gray-500">
                    {line.startsWith('CDN:') ? 'CDN Link:' : line.startsWith('Browse:') ? 'Browse Package:' : 'Result:'}
                  </div>
                  <button
                    onClick={() => copyIndividualItem(cleanLine, index)}
                    className="flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border transition-colors"
                    title="Copy this link"
                  >
                    {copiedItems[index] ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <div className="font-mono text-sm text-gray-800 break-all">
                  {cleanLine}
                </div>
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div className="p-3 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-gray-500">Result:</div>
          <button
            onClick={() => copyIndividualItem(output, 'single')}
            className="flex items-center px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border transition-colors"
            title="Copy this link"
          >
            {copiedItems['single'] ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="font-mono text-sm text-gray-800 break-all">{output}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Package className="h-12 w-12 text-primary-600 mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              Unpkger
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your npm package references into unpkg CDN links instantly. 
            Perfect for quick prototyping and browser-ready imports.
          </p>
        </div>

        {/* Main Converter */}
        <div className="glass-effect rounded-2xl p-8 mb-8 animate-slide-up">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input */}
            <div className="space-y-4">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Package className="h-4 w-4 mr-2" />
                NPM Input
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter npm install commands, import statements, package names, or npm URLs..."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg input-focus resize-none"
                rows="8"
              />
            </div>

            {/* Output */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Unpkg Output
                </label>
                {output && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center px-3 py-1 text-sm button-secondary"
                    title="Copy all results"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                        Copied All!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy All
                      </>
                    )}
                  </button>
                )}
              </div>
              
              <div className="min-h-48 p-4 border border-gray-300 rounded-lg bg-gray-50">
                {output ? (
                  renderOutput()
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <ArrowRight className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Your unpkg links will appear here...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="glass-effect rounded-2xl p-6 mb-8 animate-slide-up">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-6">
            <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
            Try these examples:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors group min-h-[4rem] flex items-center"
              >
                <div className="font-mono text-sm text-gray-700 break-all leading-relaxed">
                  {example}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect rounded-xl p-6 text-center animate-slide-up">
            <Package className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Multiple Formats</h3>
            <p className="text-gray-600 text-sm">
              Supports npm install commands, import statements, require calls, and direct package names
            </p>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center animate-slide-up">
            <ArrowRight className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Instant Conversion</h3>
            <p className="text-gray-600 text-sm">
              Real-time conversion as you type, with intelligent pattern recognition
            </p>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center animate-slide-up">
            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Copy Ready</h3>
            <p className="text-gray-600 text-sm">
              One-click copy to clipboard for immediate use in your projects
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <a
              href="https://github.com/hybridx/unpkger"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center button-secondary"
            >
              <Github className="h-4 w-4 mr-2" />
              View on GitHub
            </a>
            <a
              href="https://unpkg.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center button-secondary"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit unpkg.com
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            Made with ❤️ by hybridx. Convert npm packages to unpkg CDN links effortlessly.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App 