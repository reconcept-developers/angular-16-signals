# todo

- call functions from computed / effect

# optional listening

```typescript
double = computed(() => {
  console.log('running double')
  return this.counter() * 2
})

effect(() => {
  const counter = this.counter();
  if (counter % 3 === 0) {
    console.log(this.double())
  }
})
```

# circular effects

```typescript
effect(() => {
  console.log('first effect');

  const mainCounter = this.counter();

  this.counter.update(c => mainCounter + c);
}, {
  allowSignalWrites: true
})

effect(() => {
  const mainCounter = this.counter();

  this.counter.update(c => mainCounter + c);

  console.log('second effect')
}, {
  allowSignalWrites: true
})
```
