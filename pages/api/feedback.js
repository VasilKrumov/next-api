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
        res.status(201).json({ message: 'Successfully stored feedback!', feedback: newFeedback })
    } else {
        res.status(200).json({ message: 'This works!' })
    }
}
