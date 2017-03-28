Email Services API
==================
API for the to send Email using multiple services for failover using [email services library](https://github.com/mavidser/fluffy-robot).

## How to run

Add your API keys in `config/default.json`.

```
npm install
npm start
```

## Usage

### `POST /api/send`

#### POST Body

Field   | Required   | Description
--------|------------|---
to      | required   | The to field in the Email
from    | required   | The from field in the Email
cc      | *optional* | The cc field in the Email
bcc     | *optional* | The bcc field in the email
subject | *optional* | The subject of the email
text    | *optional* | Text only version of the message
html    | *optional* | HTML version of the message

#### Example

`curl -X POST 'http://127.0.0.1:3000/api/send/' -d 'from=sid@sid@hello.com&to=humantest@yopmail.com&subject=hi&text=HI there!'`

## License

MIT
