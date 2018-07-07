# Estimate It

Tool for a project time estimation.
Each task of a project can have several equivalent (in terms of probability) estimates.
Tasks could be arbitrary nested (by using indentation).

Write each task line by line alongside with estimated hours splitting them by `|` or `=` sign:

```
First task | 10 20
Second task
  First nested task | 2
  Second nested task | 3 4
...
```

Available directives:

> `@summary` - writes overal hours row.

> `@rounding` - sets results rounding. The more is precisier, the less is faster.

# Development

The app is created using `create-react-app`.
To contributing clone this repository and switch terminal to project's folder.
Install all dependencies with `npm i`.
Start app with `npm start`. Open http://localhost:3000/estimate/new in your browser.

Data is storing on https://restdb.io.
To save and share estimate you have to authorize using `apiKey`.
