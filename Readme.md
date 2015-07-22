# PCSS

**Pragmatic CSS** is my guidelines for writing scalable and maintainable style-sheets. The concept is heavily based on
[SMACSS](https://smacss.com/), [RSCSS](https://github.com/rstacruz/rscss/) and [OOCSS](http://oocss.org/).

# Contents
* [Objectives](#a-cp)
* [CCSS Abstraction](#a-abs)
* [Naming Conventions](#a-nc)
* [File Structure](#a-fs)
* [Selector Conventions](#a-sc)
* [Examples](#a-ex)

<a id="a-cp"></a>

## Objectives

### Modularity

A complex problem can be broken into simpler tasks. So the entire system becomes easier to debug,
update and modify. PCSS describes how divide the style-sheet code-base into multiple files
so that every file represented a small and reusable unit of UI. Modules are expected to have
low coupling and high cohesion.

### Reusability

PCCS implies styling the components, not a page, so that you could apply once created style
an infinite amount of times across the project.

### Testability
In general modular programming assumes better testability. Modules are independent, so you can take
any and test out of context. PCSS provides a .. where you can test separetly element, component and layout.

Composable
from lego bricks

Predictable
where what

<a id="a-abs"></a>
## PCSS Modules
-------

### Component
Class | Location
----|----
`.foo` | ./Component/_foo.scss

Component is a reusable module of UI, e.i. `menu`, `panel`, `toolbar`, `dialog`, `slider`, `form`. Normally component consists of a container element
and auxiliary elements. Those elements are integral parts of the component that build the component and cannot be reused outside of component scope.


#### Component Part
Class | Location
----|----
`.foo-bar` | ./Component/_foo.scss


#### Component Extension
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

#### Composite Component
Class | Location
----|----
`.foo` | ./Component/_foo.scss
`.bar` | ./Component/_bar.scss

By adding a compatible component class to HTML element we can enhance its styles. For example, we set `panel`
class on an element to make it looking accordingly.
Then we add `scrollbar` class that sets `overflow` CSS property and custom scrollbar styling.
```
<div class="panel scrollbar">..</div>
```

#### Component Theme
Class | Location
----|----
`theme-baz .foo` | ./Component/_foo.scss

Theme is a modifier class that is usually set on body or html element. The styles alternating the
component depending on a given theme are kept in the same files with abstract and concrete components. Here the best practices would
to automate theming:

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


#### Component Example

```
<div class="dialog">
  <h2>Header</h2>
  <div class="dialog-main scrollbar">
    Lorem ipsum...
  </div>
  <div class="dialog-toolbar">
    <button class="btn">Cancel</button>
    <button class="btn btn-primary">Cancel</button>
  </div>
</div>
```

Here we use component `dialog` and its parts `dialog-main`, `dialog-toolbar`. Heading `H2` is also an integral part of
the component and styles applied to it are not meant to be used anywhere outside that context.
So we can sacrifice tag independence in this case for better code readability.
In the component markup we also rely to another component `scrollbar` and element `button`



### Element
Class | Location
----|----
`.foo-bar` | ./Element/_foo.scss

Element is an atomic building block such as button or field that designed to be easily ported across components.
Unlike a component, an element usually has no constituents.

#### Element Extension
Class | Location
----|----
`.foo-baz` | ./Element/Foo/_baz.scss

Similar to Component, Element assumes abstract type and extending types. Handy example here would be a button element.

```
<div class="btn btn-primary">..</div>
<div class="btn btn-secondary btn-secondary-light">..</div>
```

#### Element Example

```html
  <a class="btn btn-primary" href="#" role="button">Link</a>
  <button class="btn btn-primary" type="submit">Button</button>
  <input class="btn btn-primary" disabled type="submit" value="Submit">
```

where
* `.btn` is a base class (abstract button),
* `.btn-primary` is a subclass (concrete button),
* `.btn-primary[disabled]` is a state,


### Layout

Class | Location
----|----
`.l-foo` | ./Layout/_foo.scss

Layout specifies how the components are arranged in a given context.

#### Layout Extension
Class | Location
----|----
`.l-foo-baz` | ./Layout/Foo/_baz.scss


#### Layout Theme
Class | Location
----|----
`.theme-baz .l-foo` | ./Layout/_foo.scss

#### Layout Example
```html
  <body class="holygrail">
    <header class="holygrail-header">…</header>
    <div class="holygrail-body">
      <main class="holygrail-content">…</main>
      <nav class="holygrail-nav">…</nav>
      <aside class="holygrail-ads">…</aside>
    </div>
    <footer class="holygrail-footer">…</footer>
  </body>
```




### State
State classes are meant to represent an entity state: `is-selected`, `is-hidden`, `.has-error`.



### Base
_base.scss
_definitions.scss
Mixin/_foo.scss





## Common principles

Classes for styling, IDs and data-* attributes for binding JavaScript

Qualified selectors

div.header {..}

reasons:
They totally inhibit reusability on another element.
They increase specificity.
They increase browser workload

Avoid Loose class names
..


### Loose Coupling (Tag Independence)
Avoid qualified selectors (prepended with tag). Thus you will gain additional agility in moving classes around components.

### Loose Coupling (Location Independence)
Avoid long selectors with descendant/child combinators (.feed nav ul li h2).
Long selectors besides harmful affect on selector performance mean that style rule-set is tied to particular
location in the DOM. Independent selectors allow us to move components around our markup more freely.


Reactive !important

!important is fine. It’s fine and it’s a, well, important tool. However, !important should only be used in certain circumstances.


<a id="a-nc"></a>
# Naming Conventions
-------

Class name represents entity (layout/component/element) or variant (state/theme). Name for an entity constituent is built of
parent class name and its own one (e.g. `.grid-row`, `.grid-span` where both are parts of `.grid`).
Similarly classes reflect the hierarchy of a type and source file location (e.g. component `.form-nav-search` extends ``.form-nav` and `.form`.
The component source is located in  `Component/Form/Nav/Search` [File Structure](#a-fs))
State classes prefixed with is- or has- (e.g. `.is-hidden`, `.has-success`).

Type|Selector
----|----
Layout/Component/Element |.noun {},.adjective-noun{}
Layout/Component/Element child |.type > .type-noun {}
State |.type.is-state {}, .type.has-state {}
Theme |.type.adjective {}, .type[attribute] {}

Further readings
* [Modular CSS naming conventions](http://thesassway.com/advanced/modular-css-naming-conventions)
* [Naming CSS Stuff Is Really Hard](http://seesparkbox.com/foundry/naming_css_stuff_is_really_hard)

<a id="a-fs"></a>
File Structure
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


Further Reading

* [When using IDs can be a pain in the class...](http://csswizardry.com/2011/09/when-using-ids-can-be-a-pain-in-the-class/)
* [Code smells in CSS](http://csswizardry.com/2012/11/code-smells-in-css/)


<a id="a-ex"></a>
Examples
-------

#### Layout

Generic grid layout
```html
  <div class="grid fluid">
    <div class="grid-row">
      <div class="grid-span2"></div>
    </div>
  </div>
```
where
* `.grid` is a layout,
* `.grid-row` and `.grid-span2` layout children,
* `.fluid` is a theme

Holy Grail layout example borrowed from http://philipwalton.github.io/solved-by-flexbox/demos/holy-grail/
```html
  <body class="holygrail">
    <header class="holygrail-header">…</header>
    <div class="holygrail-body">
      <main class="holygrail-content">…</main>
      <nav class="holygrail-nav">…</nav>
      <aside class="holygrail-ads">…</aside>
    </div>
    <footer class="holygrail-footer">…</footer>
  </body>
```

#### Component

A concrete table extending abstract one
```html
  <table class="table table-leaderboard">
  ...
  </table>
```
where
* `.table` is a base class (abstract table),
* `.table-leaderboard` is a subclass (concrete table).

A search form of [Boostrap](http://getbootstrap.com/css/#forms)-like markup
```html
<form class="form form-nav form-nav-search">
  <div class="form-group has-success">
    <label for="search_form_email">Email address</label>
    <input type="email" class="form-control" id="search_form_email" placeholder="Enter email">
  </div>
...
</form>
```
where
* `.form-nav-search` inherits from `form-nav` and from `.form`,
* `.form-group` and `.form-control` are children of `form` base class and can be augmented for `.form-nav-search`,
* `.has-success` represents field state.




#### Context-dependent state

Do not declare a base style for states like `.is-hidden` otherwise you will need to override styles in particular contexts
```css
/* Not displayed  */
.context-foo > .is-hidden {
 display: none;
}
/* Visually hidden */
.context-bar > .is-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px; width: 1px;
  margin: -1px; padding: 0; border: 0;
}
```
JavaScript shall not care about implementation details, it simply toggles the state.


[![Analytics](https://ga-beacon.appspot.com/UA-1150677-13/dsheiko/pcss)](http://githalytics.com/dsheiko/pcss)