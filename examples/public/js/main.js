const frame = document.querySelector( "[data-bind=frame]" );

function isWhitelisted( url ){
  return url.substr( 0, 2 ) === "./";
}

function handleHashChange() {
  const url = location.hash ? location.hash.substr( 1 ) : "./page/grid.html";
  if ( !isWhitelisted( url ) ) {
    return;
  }
  frame.innerHTML = `<link rel="html-import" href="${url}">`;
  window.HTMLImport.importForElement( frame.querySelector( "link" ) )
    .then(() => {
    })
    .catch( e => console.error( "html-import:", e ) );
};

window.addEventListener( "hashchange", handleHashChange );
handleHashChange();