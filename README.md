# mozaik-ext-switcher

*NOTE: EXTENSION IS IN PROOF-OF-CONCEPT LEVEL. PLEASE TRY IT OUT GIVE FEEDBACK / CONTRIBUTION*

Place *multiple widgets* into same place and *switch periodically* between them.

## Setup

- Install extension in dashboard

    ```bash
    npm install --save mozaik-ext-switcher
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

Create `switcher.widgets` widget and place widgets within `widgets` parameter:

```javascript
dashboards: [
  // First dashboard view
  {
    columns: 1,
    rows: 1,
    widgets: [
      // 1st row
      {
        type: 'switcher.widgets',
        columns: 1, rows: 1,
        x: 0, y: 0,
        // Duration how long to show each widget
        duration: 8000,
        // Structure within widgets is same normally
        // with widgets. Naturally the size and placement
        // comes from switcher.widgets
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
