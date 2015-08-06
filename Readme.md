PCSS
=====

**Pragmatic CSS** is guidelines for writing scalable and maintainable style-sheets. PCSS divides the
whole UI into portable and reusable units: components, elements and layouts, where units may have own
states and depend on themes. Every UI unit is provided with a CSS (SASS/LESS/etc) module.
PCSS naming convention makes it easier to locate a module corresponding to a problem and encourages developer
on producing optimized object-oriented CSS.
The concept is heavily based on
[SMACSS](https://smacss.com/), [RSCSS](https://github.com/rstacruz/rscss/) and [OOCSS](http://oocss.org/).

# Contents
* [Abstraction](#a-abs)
* [File Structure Example](#a-fs)
* [Naming Conventions](#a-nc)
* [Selector Conventions](#a-sc)

<a id="a-abs"></a>
Abstraction
-------

## Component
Class | Location
----|----
`.foo` | ./Component/_foo.scss

Component is a reusable module of UI, e.i. navigation bar, panel, form. Normally component consists of a container element
and auxiliary elements. Those elements are integral parts of the component that build the component and cannot be reused outside of component scope.

### Component Part
Class | Location
----|----
`.foo-bar` | ./Component/_foo.scss


### Component Extension
Class | Location
----|----
`.foo-baz` | ./Component/Foo/_baz.scss

Following OOP practices, for a concrete component we need an abstract type and concrete one, which inherits from the abstract.
For example, when we are required of a dialog window, we create `./Component/_dialog.scss` where put the base styles for
any dialogs that we can have within the application. Then we compose `./Component/Dialog/_alert.scss` where set the extending styles
for the concrete modal window. Now we refer to a concrete component in the HTML like that:

```
<div class="dialog dialog-alert">..</div>
<div class="dialog dialog-prompt">..</div>
```

### Component Example

![](images/a-component.png)
```html
<div class="progressbar progressbar-big">
	<output class="progressbar-status">
		Install is 70% complete
	</output>
	<progress value="70" max="100"></progress>
	<div class="progressbar-actions">
		<div class="icon icon-pause">pause</div>
		<div class="icon icon-play is-hidden">resume</div>
	</div>
</div>
```



## Element
Class | Location
----|----
`.foo-bar` | ./Element/_foo.scss

Element is an atomic building block such as button or field that designed to be easily ported across components.
Unlike a component, an element usually has no constituents.

### Element Extension
Class | Location
----|----
`.foo-baz` | ./Element/Foo/_baz.scss

Similar to Component, Element assumes abstract type and extending types. Handy example here would be a button element.

```
<div class="btn btn-primary">..</div>
<div class="btn btn-secondary btn-secondary-light">..</div>
```

### Element Example

![](images/a-element.png)

```html
	<button class="btn btn-primary">OK</button>
	<button class="btn btn-primary" disabled="">OK</button>
	<a class="btn btn-secondary">OK</a>
	<a class="btn btn-secondary" disabled="">OK</a>
```



## Layout

Class | Location
----|----
`.l-foo` | ./Layout/_foo.scss

Layout specifies how the components are arranged in a given context.

### Layout Extension
Class | Location
----|----
`.l-foo-baz` | ./Layout/Foo/_baz.scss


### Layout Theme
Class | Location
----|----
`.theme-baz .l-foo` | ./Layout/_foo.scss

### Layout Example

![](images/a-layout.png)

```html
<div class="l-app">
  <header class="l-app-header">
   Baz
  </header>
  <aside class="l-app-aside">Foo</aside>
  <div class="l-app-main">Bar</div>
</div>
```


## State
State classes are intended to represent a UI unit state: `.is-expanded`, `.is-hidden`, `.has-error`.

```html
<div class="l-main has-error">
<aside class="sidebar is-hidden">...</aside>
</div>
```
**./Layout/_main.scss**
```css
.l-main {
  /* default style */
  &.has-error {
    /* state modified style */
  }
}
```
**./State/_global.scss**
```css
/* Global state */
.is-hidden {
  display: none !important;
}
```



## Theme
Theme classes used to alternate the style of an existing UI unit (layout/component/element)
depending on the context.

```html
<html class="theme-foo">
  <div class="l-main">
  <aside class="sidebar">...</aside>
  </div>
</html>
```

**./Component/_sidebar.scss**
```css
.sidebar {
/* default style */
}
.theme-foo .sidebar {
/* alterntive style */
}
```

### Programmatic Theming

If we need components to change styles according to a set theme (`.theme-baz` and
`.theme-qux`), we can use a mixin like:

```
@mixin theme-dialog($theme) {
  $bg: get-theme-style($theme, "bg");
  .theme-#{$theme} .dialog {
    background-color: #{$bg};
  }
}
@each $theme in $themes {
  @include theme-dialog($theme);
}
```

Where we have in `./Base/_defenitions.scss`:
```
$themes: baz qux;
@function get-theme-style($theme, $key) {
  $baz-map: (
    "bg": $baz-bg
  }
  $qux-map: (
    "bg": $qux-bg
  }
  @if $theme == "baz" {
    @return map-get( $baz-map, $key );
  }
  @if $theme == "qux" {
    @return map-get( $qux-map, $key );
  }
  @return map-get( $baz-map, $key );
}
```

### Theme Example

![](images/a-theme.png)

```html
<div class="theme-foo">
  <article class="entry">
    <h2 class="entry-heading">Lorem ipsum dolor</h2>
    <time datetime="2008-02-14 20:00" class="entry-time">2 hours ago</time>
  </article>
  <article class="entry">
    <h2 class="entry-heading">Lorem ipsum dolor</h2>
    <time datetime="2008-02-14 20:00" class="entry-time">2 hours ago</time>
  </article>
  <article class="entry">
    <h2 class="entry-heading">Lorem ipsum dolor</h2>
    <time datetime="2008-02-14 20:00" class="entry-time">2 hours ago</time>
  </article>
</div>

<div class="theme-bar">
...
</div>
```

<a id="a-fs"></a>
File Structure Example
-------

```
Styles
├───Component
│   │   _form.scss
│   │
│   └───Form
│       │   _auth.scss
│       │   _nav.scss
│       │
│       ├───Auth
│       │       _login.scss
│       │
│       └───Nav
│               _search.scss
│
├───Base
│   │   _h5b-normalize.scss
│   │   _base.scss
│   │   _definitions.scss
│   │
│   └───Mixin
│           _media.scss
│
├───Element
│   │   _btn.scss
│   │
│   └───Btn
│           _primary.scss
│
└───Layout
        _grid.scss

```


<a id="a-nc"></a>
Naming Conventions
-------

* Component or element has corresponding CSS class on the container HTML element (e.g. `progressbar`).
* Layout's class name is always prefixed with "l-" (e.g. `l-foo`).
* Class name of a part of component/layout is prefixed with the base name (e.g. `l-app-header` is a part of `l-app`).
* CSS classes reflect the hierarchy of a type. For example, one shall read the composition `progressbar progressbar-big` as
concrete component `progressbar-big` extends abstract component `progressbar`.
* Class name also represents source location. Let's say styles for `form-nav-search` is expected in the file
`Component/Form/Nav/_search.scss` [File Structure](#a-fs)).
* State classes are prefixed with `is-` or `has-` (e.g. `.is-hidden`, `.has-success`).
* Theme classes are prefixed with `theme-`.


Further readings
* [Modular CSS naming conventions](http://thesassway.com/advanced/modular-css-naming-conventions)
* [Naming CSS Stuff Is Really Hard](http://seesparkbox.com/foundry/naming_css_stuff_is_really_hard)

<a id="a-sc"></a>
Selector Conventions
-------

### Keep selectors short
Remember that browser reads selectors from right to left, long selectors may give it an extra workload. Besides it is
a unwanted contribution to production style-sheet file size. Deep nesting in CSS-preprocessor sources may cause
the described problems even without your awareness. So, keep nesting no more than 3-4 levels.

Avoid `@extend`-ing in SASS/LESS. It adds a long CSS selectors in a compiled code.

### Use classes for styling, IDs and data-attributes to bind JavaScript

IDs can be used in HTML for fragment identifiers and JavaScript hooks, but IDs should never be used in CSS.
Functional element attributes can be quite handy for styling (e.g. input[disabled]), but we rather avoid styling via custom attributes (data-attr)
for a better separation of concerns. When you use only classes for styling and keep IDs and attributes for
JavaScript binding you get much more flexibility in moving styles across the document.


### Loose Coupling (Tag Independence)
Avoid qualified selectors (prepended with tag). Thus you will gain additional agility in moving classes around components.

### Loose Coupling (Location Independence)
Avoid long selectors with descendant/child combinators (.feed nav ul li h2).
Long selectors besides harmful affect on selector performance mean that style rule-set is tied to particular
location in the DOM. Independent selectors allow us to move components around our markup more freely.


Further Reading

* [When using IDs can be a pain in the class...](http://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/)
* [Code smells in CSS](http://csswizardry.com/2012/11/code-smells-in-css/)

[![Analytics](https://ga-beacon.appspot.com/UA-1150677-13/dsheiko/pcss)](http://githalytics.com/dsheiko/pcss)