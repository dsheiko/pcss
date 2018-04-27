const frame = document.querySelector( "[data-bind=frame]" );

function isWhitelisted( url ){
  return url.substr( 0, 2 ) === "./";
}

function parsePseudoUrl( hash ){
  const raw = hash.substr( 1 ),
        [ url, locator ] = raw.split( "!" ),
        file = url.split( "/" ).pop(),
        section = file.split( "." ).shift();
  return { url, file, section, locator };
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
      const id = `${req.section}--${req.locator}`,
            el = document.getElementById( id );
      el && el.scrollIntoView && el.scrollIntoView();
    })
    .catch( e => console.error( "html-import:", e ) );
};

window.addEventListener( "hashchange", handleHashChange );
handleHashChange();