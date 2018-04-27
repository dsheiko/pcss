const frame = document.querySelector( "[data-bind=frame]" ),
      mainNavEl = document.querySelector( "[data-bind=mainnav]" );

/**
 * Test if it's a URL
 * @param {string} url
 * @returns {Boolean}
 */
function isWhitelisted( url ){
  return url.substr( 0, 2 ) === "./";
}

/**
 * Parse hash like e.g. /#./page/grid.html!equal-width into
 * {
 *  url: ./page/grid.html
 *  file: grid.html
 *  section: grid,
 *  locator: equal-width
 *
 * @param {string} hash
 * @returns {object}
 */
function parsePseudoUrl( hash ){
  const raw = hash.substr( 1 ),
        [ url, locator ] = raw.split( "!" ),
        file = url.split( "/" ).pop(),
        section = file.split( "." ).shift();
  return { url, file, section, locator };
}

/**
 * When received a subnavigation request
 * e.g. /#./page/grid.html!equal-width
 * we scroll into view element matching
 * #grid--equal-width
 *
 * @param {Object} req
 */
function scrollAnchorIntoView( req ) {
   const id = `${req.section}--${req.locator}`,
            el = document.getElementById( id );
      el && el.scrollIntoView && el.scrollIntoView();
}

function highlightMainMenuItem( req ) {
   const el = document.querySelector( `a[href="#${req.url}"]` );
   Array.from( mainNavEl.querySelectorAll( ".menu-item" ) ).forEach( el => el.classList.remove( "is-active" ) );
   el && el.parentNode.classList.add( "is-active" );
}

function handleHashChange() {
  const req = parsePseudoUrl( location.hash ),
        url = location.hash ? req.url : "./page/grid.html";

  if ( !isWhitelisted( url ) ) {
    return;
  }

  frame.innerHTML = `<link rel="html-import" href="${url}">`;
  window.HTMLImport.importForElement( frame.querySelector( "link" ) )
    .then(() => {
      scrollAnchorIntoView( req );
      highlightMainMenuItem( req );
    })
    .catch( e => console.error( "html-import:", e ) );
};

window.addEventListener( "hashchange", handleHashChange );
handleHashChange();
