# LWR with Lightning Base Components and SLDS Example

This example package contains the minimum code needed to get up and running with a [Lightning Web Runtime (LWR)](https://developer.salesforce.com/docs/platform/lwr/overview) website that uses the [Salesforce Lightning Design System (SLDS)](https://www.lightningdesignsystem.com/) and standard [Lightning Base Components](https://www.npmjs.com/package/lightning-base-components).

## Project Setup

The directory structure looks something like this:

```
src/
  ├── assets/           // static assets
  ├── layouts/          // site page layouts
  └── modules/          // lwc modules
lwr.config.json         // lwr configuration
package.json            // npm packaging configuration
```

## Dependencies

To use the Lightning Base Components and SLDS, there are 2 additional dependencies required in `package.json` at the root of the project.

- `@salesforce-ux/design-system`
- `lightning-base-components`

## Configuration

The LWR server is configured in `lwr.config.json`, at the root of the project.

### Salesforce Lightning Design System (SLDS)

To use the [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/) on this site, the asset's directory in the node module is exposed as via the `lwr.config.json` as an asset directory.

```json
// lwr.config.json
{
    ...
    "assets": [
        ...
        {
            "alias": "sldsDir",
            "dir": "$rootDir/node_modules/@salesforce-ux/design-system/assets",
            "urlPath": "/slds"
        }
    ],
    ...
}
```

To use SLDS, it is as simple as import the CSS file into the HTML or Nunjucks template file.

_Note: for the SLDS to work inside of Lightning Web Components, synthetic shadow is required, see below._

```HTML
<!-- layouts/example_layout.njk -->
<head>
    ...
    <link rel="stylesheet" href="$sldsDir/styles/salesforce-lightning-design-system.min.css" />
    ...
</head>
``` 

### The Shadow DOM and Synthetic Shadow

By default, Lightning Web Components are encapsulated inside of a Shadow DOM which prevents any CSS styles from being inherited by child LWCs. This includes the SLDS. If this step is not done, then any Lightning Base Components will not look the way they're supposed to.

This is where the Synthetic Shadow comes into play. There is no need to include the dependency directly as it is already part of the LWR, but it does need to be enabled in the `lwr.config.json` configuration file. This is done by adding the property `bootstrap.syntheticShadow.true` to each route that requires it.

Read more about the Shadow DOM and Synthetic shadow on [Trailhead](https://trailhead.salesforce.com/en/content/learn/modules/b2b2c-commerce-for-developers/b2b2c-dev-understand-shadow-dom).

```json
// lwr.config.json
{
    ...
    "routes": [
        {
            "id": "example",
            "path": "/",
            "rootComponent": "example/app",
            "layoutTemplate": "$layoutsDir/example_layout.njk",
            "bootstrap": {
                "syntheticShadow": true
            }
        }
    ]
    ...
}
```

### Lightning Base Components

_You can skip this step if you only require SLDS and not the Lightning Base Components._

To use the [Lightning Base Components](https://www.npmjs.com/package/lightning-base-components) on this site, a module is mapped in the `lwr.config.json` as an npm module.

```json
// lwr.config.json
{
    ...
    "lwc": {
        "modules": [
            ...
            {
                "npm": "lightning-base-components"
            }
        ]
    },
    ...
}
```

## Running the Project

```bash
npm install
npm build
npm start # prod mode and ESM format
```

Open the site at [http://localhost:3000](http://localhost:3000)

To start the project in a different mode:

-   dev: `npm dev`
-   compat: `npm start:compat`
-   prod-compat: `npm start:prod-compat`

## Example Usage

```html
<body>
    <div class="slds-theme_default">
        <div class="slds-var-p-around_medium">
            <div class="slds-grid slds-wrap slds-gutters">
                <div class="slds-col">
                    <example-hello-world greeting="Hi There!"></example-hello-world>
                </div>
            </div>
        </div>
    </div>
</body>
```

![Example of the main screen](/sample.png?raw=true "Example of the main screen")