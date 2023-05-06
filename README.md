# Asset List

This is just a list of assets from my CDN to be used on other websites. Nothing too exciting here.

## Data Schemas

Data should follow these patterns:

### Adventure

Screenshots of games.

```ts
{
  fileName: string;
  game: string;
}
[];
```

### Emotes

Custom emotes for Discord.

```ts
{
  fileName: string;
  name: string;
}
[];
```

### Outfits

Outfits for my model.

```ts
{
    name: string;
    fileName: string;
    description: string;
    alt: string;
    credits: {
        [key: string]: string;
    }
}[];
```

### Portraits

Custom art work.

```ts
{
  fileName: string;
  name: string;
  artist: string;
  url: string;
  alt: string;
}
[];
```

### Poses

Koikatsu scenes.

```ts
string[]
```

## Live Version

This page is currently deployed. [View the live website.]

## Feedback and Bugs

If you have feedback or a bug report, please feel free to open a GitHub issue!

## Contributing

If you would like to contribute to the project, you may create a Pull Request containing your proposed changes and we will review it as soon as we are able! Please review our [contributing guidelines](CONTRIBUTING.md) first.

## Code of Conduct

Before interacting with our community, please read our [Code of Conduct](CODE_OF_CONDUCT.md).

## Licensing

Copyright (C) 2022 Naomi Carrigan

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.

The full license terms may be viewed in the [LICENSE.md file](./LICENSE.md)

## Contact

We may be contacted through our [Chat Server](http://chat.nhcarrigan.com) or via email at `contact@nhcarrigan.com`.
