/**
 * Search for directives like
 * <link rel="html-import" href="import-foo.html" >
 * or
 * <link rel="html-import" href="import-bar.html" repeat="3">
 *
 * and reads the HTML by URL (src) and replaces the directives with the HTML (multiplied when using repeat attribute)
 */

(function ( root, factory ) {
    if ( typeof define === "function" && define.amd ) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if ( typeof module === "object" && module.exports ) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.HTMLImport = factory();
  }
}( window, function () {

    const IMPORT_SELECTOR = "link[rel=html-import]";

    /**
     * Invoke a given handler when DOM is ready
     * @param {function} cb
     */
    function onDOMReady( cb ) {
      if ( document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading" ) {
        return cb();
      }
      document.addEventListener( "DOMContentLoaded", cb );
    }


    class HtmlImport  {

      /**
       * Process all th eimports in the newly fetched HTML
       * @param {string} html
       * @returns Promise
       */
      processHtmlString( html ){
        const div = document.createElement( "div" );
        div.innerHTML = html;
        const els = Array.from( div.querySelectorAll( IMPORT_SELECTOR ) );
        return els.length ? this.importForElements( els ).then(() => div.innerHTML ) : html;
      }

      /**
       * Process imports in a given Node
       * @param {Node} el
       * @returns {Promise}
       */
      importForElement( el ) {
        const url = el.getAttribute( "href" ),
              repeat = parseInt( el.getAttribute( "repeat" ) || 1, 10 ),
              processHtmlString = this.processHtmlString.bind( this );

        return fetch( url )
          .then( response => response.text() )
          .then( processHtmlString )
          .then(( html ) => {
            if ( !el.parentNode ) {
              return;
            }
            el.insertAdjacentHTML( "beforebegin", html.repeat( repeat ) );
            el.parentNode.removeChild( el );
            return url;
          });
      }

      /**
       * Load all given imports
       * @param {Node[]} imports
       * @returns {Promise}
       */
      importForElements( imports ) {
        const importForElement = this.importForElement.bind( this );
        return Promise.all( imports.map( importForElement ) );
      }
      /**
       * Find and process all the imports in the DOM
       * @returns {Promise}
       */
      import() {
       const imports = Array.from( document.querySelectorAll( IMPORT_SELECTOR ) );
        if ( !imports.length ) {
          return Promise.resolve();
        }
        return this.importForElements( imports );
      }
    }

    const importer = new HtmlImport();
    /**
     * CustomEvent with support for IE (9+)
     * @param {string} type
     * @param {Object} detail
     * @returns {object}
     */
    function createCustomEvent( type, detail ) {
      try {
        return new CustomEvent( type, { detail: detail } );
      } catch( e ) {
        const ev = document.createEvent( "CustomEvent" );
        ev.initCustomEvent( type, false, false, { detail: detail });
        return ev;
      }
    }

    onDOMReady(() => {
      importer.import()
        .then(( urls ) => {
            const event = createCustomEvent( "html-imports-loaded", { urls } );
            document.dispatchEvent( event );
          });
    });

    /**
    * Load JavaScript - utility that is handy to used in conjuction with the tool
    * @param {string} url
    * @returns {Promise}
    */
    importer.loadJs = ( url ) => {
      return new Promise( resolve => {
        const script = document.createElement( "script" );
        script.src = url;
        script.onload = resolve;
        document.head.appendChild( script );
      });
    };

    return importer;
}));