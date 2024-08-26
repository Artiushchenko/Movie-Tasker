const errorMessages = {
    "auth/email-already-in-use": "The email address is already in use.",
    "auth/network-request-failed": "Network error. Please try again later.",
    "auth/invalid-credential": "The credentials are incorrect. Please try again.",
}

export function getErrorMessage(errorCode) {
    return errorMessages[errorCode];
}