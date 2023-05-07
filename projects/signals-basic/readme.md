# circular effects

```
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
