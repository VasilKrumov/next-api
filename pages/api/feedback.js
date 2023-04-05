import fs from 'fs'
import path from 'path'

export function buildFeedbackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json')
}

export function extractFeedback(filePath) {
    const fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    return data
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email, name, text } = req.body
        if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
            res.status(422).json({ message: 'Invalid input.' })
            return
        }
        // Store it in a database
        const newFeedback = {
            id: new Date().toISOString(),
            email,
            name,
            text,
        }
        console.log(newFeedback)
        const filePath = buildFeedbackPath()
        const data = extractFeedback(filePath)
        data.push(newFeedback)
        fs.writeFileSync(filePath, JSON.stringify(data))
        res.status(201).json({ message: 'Successfully stored feedback!', feedback: newFeedback })
    } else {
        const filePath = buildFeedbackPath()
        const data = extractFeedback(filePath)
        res.status(200).json({ feedback: data })
    }
}
