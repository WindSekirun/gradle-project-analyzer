# docker-gradle-project-analyze

REST APIs that providing analysis functions of Gradle-based projects

## Features

- Provide API for git projects for automation
- Find relative path from moduleName, canonicalName
  - moduleName: `:feature:bookmarks`
  - canonicalName: `com.google.samples.apps.nowinandroid.feature.bookmarks.BookmarksScreenTest`
- Generate Cloc Report per module

## Demo

![](docs/demo.png)

## Usage

### Production

1. `docker-compose up -d`
2. Access 'http://localhost:3000'

## Development

1. `pnpm i`
2. `pnpm start`
3. open 'demo/demo.html' in browser for demo page

## License

MIT License
