export default {
    /**
     * 字符串转base64
     * @param {String} str a string to be encoded
     * @returns {String} encoded string
     */
    getEncode64(str) {
      return window.btoa(
        encodeURIComponent(str)
          .replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
              return String.fromCharCode('0x' + p1);
            }
          )
      );
    },
    /**
     * base64转字符串
     * @param {String} str a base64 string to be decoded
     * @returns {String} decoded string
     */
    getDecode64(str) {
      return decodeURIComponent(
        window.atob(str)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
    },
    /**
     * 字符串转base64
     * @param {String} str a string to be encoded
     * @returns {String} encoded string
     */
    getEncode64New(str) {
      const codeUnits = new Uint16Array(str.length);
      for (let i = 0; i < codeUnits.length; i++) {
        codeUnits[i] = str.charCodeAt(i);
      }
      return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
    },
    /**
     * base64转字符串
     * @param {String} encodedStr a base64 string to be decoded
     * @returns {String} decoded string
     */
    getDecode64New(encodedStr) {
      let binary = atob(encodedStr)
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < bytes.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return String.fromCharCode(...new Uint16Array(bytes.buffer));
    },
  }