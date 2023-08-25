export default {
  /**
   * Simple GET and POST functions that return Promise.
   *
   * Example:
   *   API.get( url ).then( result => { .. } );
   *   API.post( url, data ).then( result => { ... } );
   */
  API: {
    get(endpoint, args = {}) {
      return window.fetch(endpoint, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        ...args,
      })
        .then(this.handleError)
        .then(this.handleContentType)
        .catch(this.throwError);
    },

    post(endpoint, body, args = {}) {
      return window.fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
        ...args,
      })
        .then(this.handleError)
        .then(this.handleContentType)
        .catch(this.throwError);
    },

    handleError(err) {
      return err.ok ? err : Promise.reject(err.statusText);
    },

    handleContentType(res) {
      const contentType = res.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        return res.json();
      }
      if (contentType && contentType.includes('image/svg+xml')) {
        return Promise.resolve(res.text());
      }

      return Promise.reject('Oops, we haven\'t got JSON!');
    },

    throwError(err) {
      throw new Error(err);
    },
  },
};
