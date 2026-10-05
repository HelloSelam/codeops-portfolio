# Addis Eats Rendering Strategy

| Route | Strategy | Reason |
|---|---|---|
| `/` | Static | The homepage does not depend on request-specific data. |
| `/menu` | ISR | Menu data is fetched from the API and can be revalidated every hour. |
| `/menu/[id]` | Static | `generateStaticParams()` provides the known dish slugs at build time. |
| `/cart` | Client | Cart state belongs to the user's browser. |
| `/checkout` | Dynamic | Checkout reads request-specific cookie data. |

## Streaming

The `/menu` page uses `<Suspense>` around `DishList`, allowing the page shell to render while the menu data is being fetched.

## Menu API

Menu data comes from:

`https://addis-eats-backend.onrender.com/menu`

The API response contains the dishes inside the `data` property.

## ISR

The menu API request uses:

```js
next: { revalidate: 3600 }
```

This allows the menu data to be regenerated approximately every hour.

## Static Dynamic Routes

`generateStaticParams()` uses the API's slug values to generate known dish pages such as:

- `/menu/doro-wat`
- `/menu/siga-wat`
- `/menu/prime-beef-kitfo`

## Dynamic Checkout

The checkout page uses `cookies()` to read request-specific session information. Therefore, it is forced to render dynamically.