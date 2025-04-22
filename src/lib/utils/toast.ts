import { toast } from 'sonner'

// Success toast
export const toastSuccess = (message: string) => {
  toast.success(message)
}

// Error toast
export const toastError = (message: string) => {
  toast.error(message)
}

// Info toast
export const toastInfo = (message: string) => {
  toast.info(message)
}

// Warning toast
export const toastWarning = (message: string) => {
  toast.warning(message)
}

// Promise toast - for async operations
export const toastPromise = <T>(
  promise: Promise<T>,
  options: {
    loading: string
    success: string | ((data: T) => string)
    error: string | ((error: unknown) => string)
  }
) => {
  return toast.promise(promise, options)
}

// Default export for convenience
export default {
  success: toastSuccess,
  error: toastError,
  info: toastInfo,
  warning: toastWarning,
  promise: toastPromise,
} 