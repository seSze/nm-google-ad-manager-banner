# Google Ad Manager Banner Web Component

Implmentaion consists of 3 elements

1. External script
2. Configuration
3. Banner web component


## External Script

Include external script into your html like this:
```js
<script src="/dist/gam-banner.js"></script>
```
You can place it anywhere in your html file, however web component doc encourage to put it into `<head>` tag.

## Configuration

Put into html script tag (above included script) with configuration 

```html
<script>
  window.$adManager = {
    ...
  }
</script>

```
### Ad Manager Config

| key         | type    | default | required | description                                                                    |
|-------------|---------|---------|----------|--------------------------------------------------------------------------------|
| onIntersect | boolean | false   | optional | Should all the banners be mounted on intersect using intersection observer api |
| defaults    | object  | null    | false    | Default values for unit and banner size                                        |
| sizing      | object  | {}      | true     | Banner sizes definitions with mappings                                         |


### Defaults
| key  | type   | default | required | description                                                          |
|------|--------|---------|----------|----------------------------------------------------------------------|
| unit | string | null    | optional | Default ad unit name to prevent adding it to every banner definition |
| size | string | null    | optional | Default ad size                                                      |


### Sizing

Sizing is defined as object where property is a name of the banner and value is banner size mapping. If you have rectangle banner you should define it like this:

```js
window.$adManager = {
  sizing: {
    rectangle: [
      { 
        window: [0, 0], 
        sizes: [[300, 250], [340, 300], [340, 400], [340, 250]] },
      {
        window: [1050, 100],
        sizes: [[300, 250], [340, 300]]
      }
    ],
    // more difinitions here
  }
}
```

As you can see every banner mapping consists of at least two elements - mobile and desktop definitions. You can read mor about that in google Ad Manager docs. 

## Banner element

The last element is to place banner code into the place of its usage.

All props example:
```html
<gam-banner unit="antyweb.pl" :targeting="targeting" size="billboard" class="my-class" on-intersect :refresh="30"></gam-banner>
```

Base example:
```html
<gam-banner></gam-banner>
```

**Props**

| key         | type    | default | required | description                                                               |
|-------------|---------|---------|----------|---------------------------------------------------------------------------|
| unit        | string  | null    | optional | Unit name. If not provided name from config is taken                      |
| size        | string  | null    | optional | Unit size. If not provided size from config is taken                      |
| targeting   | object  | {}      | optional | Additional targeting options                                              |
| onIntersect | boolean | false   | optional | If given banner is loaded on intersect. This can overwrites global config |
| refresh     | number  | null    | optional | Refresh interval in seconds                                               |



**Targeting**

To use targeting all the values have to be defined in Google Ad Manager

| key      | type   | default | required | description                                                                                                                                        |
|----------|--------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| entity   | string | null    | optional | Entity name defined in google ad manager. Eg. article, page, contact etc.                                                                          |
| position | string | null    | optional | Position defined in google ad manager. Eg. top, footer, inner etc.                                                                                 |
| index    | number | null    | optional | Index of banner defined in google ad manager. This can be useful if you have multiple banners of the same type and you want to target only n item. |
