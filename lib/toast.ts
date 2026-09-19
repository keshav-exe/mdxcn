export const TOAST_EVENT = "mdxcn:toast"

export type ToastDetail = {
  title: string
  message?: string
}

export function showToast(title: string, message?: string) {
  window.dispatchEvent(
    new CustomEvent<ToastDetail>(TOAST_EVENT, { detail: { title, message } })
  )
}
