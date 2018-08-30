const ua = window.navigator.userAgent

export function isWebKit (): boolean {
  if (ua) {
    return !!ua.match(/webkit/i)
  } else {
    return false
  }
}

export function isMac (): boolean {
  if (ua) {
    return !!ua.match(/mac/i)
  } else {
    return false
  }
}

export function isMobile (): boolean {
  if (ua) {
    return !!ua.match(/mobile/i)
  } else {
    return false
  }
}

export function isiOS (): boolean {
  if (ua) {
    return isMac() && isMobile()
  } else {
    return false
  }
}

export function isWeChat (): boolean {
  if (ua) {
    return !!ua.match(/micromessenger/i)
  } else {
    return false
  }
}

export function isAndroid (): boolean {
  if (ua) {
    return !!ua.match(/android/i)
  } else {
    return false
  }
}
