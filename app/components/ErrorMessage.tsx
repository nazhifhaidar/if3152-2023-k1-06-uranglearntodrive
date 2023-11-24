import React from 'react'
/**
 * Properti untuk komponen ErrorMessage
 * @errorMessage mengatur pesan error yang terjadi
 */
interface ErrorMessageProps {
  errorMessage: string;
}

/**
 * 
 * @param errorMessage untuk mengatur pesan error yang terjadi
 * @returns 
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) => {
  return (
    <p style={{ color: 'red' }}>{errorMessage}</p>
  )
}

export default ErrorMessage