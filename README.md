# mozaik-ext-switch

Extension for [Mozaïk](http://mozaik.rocks/) that allows to place *multiple widgets* into same grid cell and *switch periodically* between them. Despite the preview shown below, it does the switch with smooth transition.

![preview](https://github.com/juhamust/mozaik-ext-switch/blob/master/previews/switch.gif?raw=true "Switch preview")

## Setup

- Install extension in dashboard

    ```bash
    npm install --save mozaik-ext-switch
    ```

- Register extension in dashboard `src/register_extensions.js`
  ```javascript
  // Import extension
  import switcher from 'mozaik-ext-switch'

  Registry.addExtensions({
    github,
    gitlab,
    time,
    travis,
    // Add into extension with name 'switch'
    switch: switcher,
  })
  ```
- Rebuild dasbboard: `yarn build`
- Configure widgets in dashboard ``config.yml`` (see usage)
- Done.

## Widget: Widgets

Switch between widgets

### parameters

key                 | required | description
--------------------|----------|---------------
`duration`          | no       | *Duration how long to show each widget in milliseconds. Defaults to 5000*
`transitionDuration`| no       | *Duration how long it takes to tranform between widgets in milliseconds. Keep shorter than duration. Defaults to 500*

### usage

Create `switch.widgets` widget and place widgets within `widgets` parameter:

```yml
dashboards:
- columns: 1
  rows:    1
  title:   Simple
  widgets:
  -
    extension:    switch
    widget:       Widgets
    columns:      1
    rows:         1
    x:            0
    y:            0
    widgets:
    -
      extension:    github
      widget:       OrgBadge
      organization: ekino
      columns:      1
      rows:         1
    -
      extension:    github
      widget:       OrgBadge
      organization: juhamust
      columns:      1
      rows:         1
```

## Changelog

#### Release 2.0.0-dev

- Compatible with [Mozaik 2.x](http://mozaik.rocks/)
- Added support for setting transition duration

#### Release 1.0.0

- First stable release
- No changes since prev version

#### Release 0.4.0

- Added support for switch transition
- Using opacity instead of display none to fix widget layout issues

#### Release 0.3.1

- Fixed style regression due the name change

#### Release 0.3.0

- Renamed project to `mozaik-ext-switch`

#### Release 0.2.0

- Fixed the data fetching by mounting all widgets at once

#### Release 0.1.0

- Initial release

## License

Module is MIT -licensed
