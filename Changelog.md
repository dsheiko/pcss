* 1.2.2
  - file structure in lowercase, every component has its own directory with `_index.scss` for base class
  - subclasses and elements relation
  - states better explained
* 1.2.1
  - logically layouts belong to components, so their source shall be located in `Component` directory, global states do not need a separate directory also. They go to `Base` directory
* 1.2.0
  - finalized vocabulary (component, element, subclass), ditched component/element separation (now element means a part of component)
* 1.1.0
  - when having all the units, their parts and extensions as hyphen delimited names in the same manner, it's quite hard to distinguish where a CSS class belongs to. Now the spec borrows BEM conventions for parts and extensions (modifiers): `el-name__part` and `el-name--extension-name`