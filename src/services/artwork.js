// iTunes returns 100x100 artwork URLs; the same path serves other sizes.
const artwork = (url = '', size = 300) => url.replace('100x100bb', `${size}x${size}bb`);

export default artwork;
