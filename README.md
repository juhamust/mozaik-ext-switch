# mozaik-ext-switch

Extension for [Mozaïk](http://mozaik.rocks/) that allows to place *multiple widgets* into same grid cell and *switch periodically* between them. Despite the preview shown below, it does the switch with smooth transition.

![preview](https://github.com/juhamust/mozaik-ext-switch/blob/master/previews/switch.gif?raw=true "Switch preview")

## Setup

- Install extension in dashboard

    ```bash
    npm install --save mozaik-ext-switch
    ```

- Rebuild dasbboard: `npm run build-assets`
- Configure widgets in dashboard ``config.js`` (see usage)
- Done.

## Widget: Widgets

Switch between widgets

### parameters

key           | required | description
--------------|----------|---------------
`duration`    | no       | *Duration how long to show each widget. Defaults to 8000*

### usage

Create `switch.widgets` widget and place widgets within `widgets` parameter:

```javascript
dashboards: [
  // First dashboard view
  {
    columns: 1,
    rows: 1,
    widgets: [
      // 1st row
      {
        type: 'switch.widgets',
        columns: 1, rows: 1,
        x: 0, y: 0,
        // Duration how long to show each widget
        duration: 8000,
        // Structure within widgets is same normally
        // with widgets. Naturally the size and placement
        // comes from switch.widgets
        widgets: [
          {
            type: 'time.clock',
            timezone: 'America/Los_Angeles',
            info: 'date',
            title: 'Los Angeles'
          },
          {
            type: 'weather.weather',
            city: 'Helsinki',
            country: 'FI',
            lang: 'en',
          },
          {
            type: 'time.clock',
            info: 'time',
            timezone: 'Asia/Tokyo',
            title: 'Tokyo'
          }
        ]
      }
    ]
  }
]
```

## Changelog

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
