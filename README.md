# Large input issue

## How to reproduce

Install dependencies:

1) run server with any db, tested "updateListByMovements" does not relay on db

yarn postgraphile -c postgres://...

2) Put this query into RURU

```
mutation UpdateDial($input: UpdateListByMovementsInput!) {
    updateListByMovements(input: $input) {
      __typename
    }
}
```

3) use query-data.json contents as variables

Current behavior:
Unusable performance for first query. It takes about 1 minute, second is takes about 500ms. More or less same code was working in postgraphile V4 without any issues


Expected behavior:
- Faster responses, especially for first query
