###

```typescript
shipQuery = signal('')
results = toSignal(
  toObservable(this.shipQuery).pipe( // needs to be here, for injection context
    switchMap((ship) => {
      const query = `?search=${ship}`
      return this.http.get(`https://swapi.dev/api/starships/${query}`).pipe(
        map((response: any) => response.results as any[])
      )
    }),
    // startWith([])
  ),
  {
    initialValue: []
  }
)

```
