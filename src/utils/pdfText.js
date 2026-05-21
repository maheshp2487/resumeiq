import * as pdfjsLib from 'pdfjs-dist'

// Vite-friendly worker resolution for pdfjs-dist.
// If you ever see "Setting up fake worker failed", this line is the fix.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

export async function extractPdfText(file) {
  if (!file) return { text: '', pageCount: 0 }

  const data = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data }).promise

  let text = ''
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const content = await page.getTextContent()
    const pageText = content.items
      .map((it) => (typeof it?.str === 'string' ? it.str : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()

    if (pageText) text += pageText + '\n'
  }

  return { text: text.trim(), pageCount: pdf.numPages }
}

