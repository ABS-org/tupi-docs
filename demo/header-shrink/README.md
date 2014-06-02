# header-shrink [![stable](http://goo.gl/Becm1o)](#)
> **component** provide a ```<header>``` usability improvenment with a *transition* effect.

### Usage

See [dependencies](#dependencies), install it, and Add a js file
```html
<script src="tupi.header-shrink.js"></script>
```
after call this function
```javascript
headerShrink('.header-shrink', 'header-shrink-active' );
```

Add css file
```html
<link rel="stylesheet" type="text/css" href="tupi.header-shrink.css" />
```
Customize with css properties
```css
.header-shrink {
  height: 140px;
  background: #f3efe0;
}
.header-shrink-active {
  height: 80px;
  background: #1ECD97;
}
```

### Dependencies
##### External
- [*classie.js*](https://github.com/desandro/classie)
