# mozaik-ext-switch

Extension for [Mozaïk](http://mozaik.rocks/) that allows to place *multiple widgets* into same grid cell and *switch periodically* between them.

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

## License

Module is MIT -licensed
