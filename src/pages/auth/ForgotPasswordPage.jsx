import { useState } from 'react'
import { Link } from 'react-router-dom'
import { requestPasswordReset } from '../../services/api'
import { validateUserInput } from '../../utils/validation'

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [status, setStatus] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const onInput = (e) => {
        setEmail(e.target.value)
        if (error) setError('')
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setStatus(null)

        const validationErrors = validateUserInput({ email })
        if (validationErrors.email) {
            setError(validationErrors.email)
            return
        }

        setSubmitting(true)
        try {
            await requestPasswordReset(email)
            setStatus({
                type: 'success',
                message: 'If an account exists for that email, we have sent password reset instructions.'
            })
        } catch (err) {
            setStatus({
                type: 'error',
                message: err.message || 'Unable to process request. Please try again later.'
            })
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form className="auth-form" onSubmit={onSubmit} noValidate>
            <div className="form-field">
                <label htmlFor="email">Registered Email</label>
                <div className={`input-shell ${error ? 'has-error' : ''}`}>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@university.edu"
                        value={email}
                        onChange={onInput}
                        required
                    />
                </div>
                {error && <p className="input-error">{error}</p>}
            </div>

            {status && (
                <div className={`status-text ${status.type === 'success' ? 'status-success' : 'status-error'}`}>
                    {status.message}
                </div>
            )}

            <button className="primary-btn" type="submit" disabled={submitting}>
                {submitting ? 'Sending Request...' : 'Send Reset Link'}
            </button>

            <p className="footnote">
                Remembered your password? <Link to="/auth/login">Back to login</Link>
            </p>
        </form>
    )
}

export default ForgotPasswordPage
