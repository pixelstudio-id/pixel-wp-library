import { pxFetch } from '@lib/PixelFetch.js';

/**
 * Encode SVG markup into data URI
 */
const _encodeSvgAsDataUri = (svgMarkup) => {
  const compactSvg = svgMarkup
    .replace(/\r?\n|\r/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const encodedSvg = encodeURIComponent(compactSvg)
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
    .replace(/%22/g, "'")
    .replace(/%2C/g, ',');

  return `data:image/svg+xml,${encodedSvg}`;
};

/**
 * Get SVG HTML or URI from our CDN and cache it in localStorage
 * 
 * @param string iconURL - full CDN URL to the .svg file
 * @param boolean encoded - whether to encode to data URI or return as is
 */
export const getIconSVG = async (iconURL, encoded = false) => {
  let cachedIcons = JSON.parse(localStorage.getItem('pxIcons') || '{}');
  let iconHTML = cachedIcons[iconURL];

  if (!iconHTML) {
    try {
      iconHTML = await pxFetch.get(iconURL, { isJSON: false });
    } catch (error) {
      console.error(`Icon "${iconURL}" not found on CDN`);
      return Promise.reject(error);
    }

    cachedIcons[iconURL] = iconHTML;
    localStorage.setItem('pxIcons', JSON.stringify(cachedIcons));
  }

  return encoded ? _encodeSvgAsDataUri(iconHTML) : iconHTML;
}

export default {
  getIconSVG,
};
