import { useRef } from 'react'

function HomePage() {
    const emailInputRef = useRef()
    const nameInputRef = useRef()
    const feedbackInputRef = useRef()

    function submitFormHandler(event) {
        event.preventDefault()

        const enteredEmail = emailInputRef.current.value
        const enteredName = nameInputRef.current.value
        const enteredFeedback = feedbackInputRef.current.value

        const reqBody = {
            email: enteredEmail,
            name: enteredName,
            text: enteredFeedback,
        }

        fetch('/api/feedback', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
    }

    return (
        <div>
            <h1>The Home Page</h1>
            <form onSubmit={submitFormHandler}>
                <div>
                    <label htmlFor="email">Your Email Address</label>
                    <input type="email" id="email" ref={emailInputRef} />
                </div>
                <div>
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" ref={nameInputRef} />
                </div>
                <div>
                    <label htmlFor="feedback">Your Feedback</label>
                    <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
                </div>
                <button type="submit">Send Feedback</button>
            </form>
        </div>
    )
}

export default HomePage
