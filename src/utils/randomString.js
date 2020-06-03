function randomString() {
  let len = 32
  let $chars =
    '0123456789abcdefghijklmnopqrctuvwxyz' 
  let maxPos = $chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export default randomString