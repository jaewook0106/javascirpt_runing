# 자바스크립트에서 Promises 구현

프로그래밍에 대해 내가 가장 좋아하는 것은 aha(아~)입니다! 개념을 완전히 이해하기 시작하는 순간입니다.  
비록 거기까지 가는데 오랜 시간이 걸리고 작은 노력도 없을지라도, 그것은 확실히 가치가 있습니다.  

주어진 주제에 대한 우리의 이해 정도를 평가하고 개선하는데 가장 효과적인 방법은 지식을 현실 세계에 적용하려고 시도하는 것입니다. 이를 통해 약점을 파악하고 궁극적으로 해결할 수있을뿐만 아니라 작동 방식에 대한 정보도 얻을 수 있습니다. 간단한 시행 착오 접근법은 종종 이전에 애매했던 세부 사항을 드러냅니다.  

이를 염두에 두고 Promises를 구현하는 방법을 배우는 것이 프로그래밍 과정에서 가장 중요한 순간 중 하나라고 생각합니다. 비동기 코드의 작동 방식에 대한 귀중한 통찰력을 얻었고 전반적인 프로그래머가되었습니다.  

이 글이 자바스크립트에서 Promises를 구현하는데 도움이되기를 바랍니다.  

[Bluebird API](http://bluebirdjs.com/docs/api-reference.html)의 몇가지 방법으로 [Promises / A+ 사양](https://promisesaplus.com/)에 따라 Promise core를 구현하는 방법에 중점을 둘 것입니다.  
또한 [Jest](https://jestjs.io/)와 함께 [TDD](https://en.wikipedia.org/wiki/Test-driven_development)방식을 사용할 것입니다.    

[TypeScript](https://www.typescriptlang.org/)도 유용 할 것입니다.

여기서 우리가 구현 기술을 연구하고 있다는 점을 감안할 때, Promises가 무엇인지에 대한 기본적인 이해와 작동 방식에 대한 막연한 생각을 가지고 있다고 가정할 것입니다. 그렇지 않다면, [여기](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) 시작하기에 좋은 곳이 있습니다.  
이제 그 문제는 접어두고, [repository](https://github.com/maciejcieslar/promiseq)를 복제하고 시작합시다.  

## The core of a promise  
아시다시피 Promise는 다음과 같은 속성을 가진 개체입니다.

### Then 
Promise에 핸들러를 연결하는 방법입니다. 핸들러 메소드 중 하나에 의해 맵핑된 이전 Promise의 값으로 새로운 Promise를 리턴합니다.  
### Handlers 
`then`에 의해 연결된 핸들러 배열입니다. 핸들러는 `onSuccess`와 `onFail`의 두 가지 메소드를 포함하는 객체이며, 둘 다`then (onSuccess, onFail)`에 인수로 전달됩니다.  

```javascript
type HandlerOnSuccess<T, U = any> = (value: T) => U | Thenable<U>;
type HandlerOnFail<U = any> = (reason: any) => U | Thenable<U>;

interface Handler<T, U> {
  onSuccess: HandlerOnSuccess<T, U>;
  onFail: HandlerOnFail<U>;
}
```

### State
Promise는 resolved, rejected, 혹은 pending 세가지 state중 하나일 수 있습니다.  

Resolved는 모든 것이 순조롭게 진행되어 값을 얻거나 오류를 파악하고 처리했음을 의미합니다.   

Rejected는 Promise를 거부했거나 오류가 발생하여 잡지 않았음을 의미합니다.  

Pending은 resolve 또는 reject 메소드가 아직 호출되지 않았으며 여전히 값을 기다리고 있음을 의미합니다.  

"Promise가 확정되었습니다(the promise is settled)"라는 용어는 Promise가 resolved이거나 rejected되었음을 의미합니다.  

### Value 
resolved 혹은 rejected 값입니다.  
값이 설정되면 변경할 방법이 없습니다.  

### Testing  
TDD 접근법에 따르면 실제 코드가 나오기 전에 테스트를 작성하려고합니다. 그냥 해봅시다.

핵심 테스트는 다음과 같습니다.  

```javascript
describe('PQ <constructor>', () => {
  test('resolves like a promise', () => {
    return new PQ<number>((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 30);
    }).then((val) => {
      expect(val).toBe(1);
    });
  });

  test('is always asynchronous', () => {
    const p = new PQ((resolve) => resolve(5));

    expect((p as any).value).not.toBe(5);
  });

  test('resolves with the expected value', () => {
    return new PQ<number>((resolve) => resolve(30)).then((val) => {
      expect(val).toBe(30);
    });
  });

  test('resolves a thenable before calling then', () => {
    return new PQ<number>((resolve) =>
      resolve(new PQ((resolve) => resolve(30))),
    ).then((val) => expect(val).toBe(30));
  });

  test('catches errors (reject)', () => {
    const error = new Error('Hello there');

    return new PQ((resolve, reject) => {
      return reject(error);
    }).catch((err: Error) => {
      expect(err).toBe(error);
    });
  });

  test('catches errors (throw)', () => {
    const error = new Error('General Kenobi!');

    return new PQ(() => {
      throw error;
    }).catch((err) => {
      expect(err).toBe(error);
    });
  });

  test('is not mutable - then returns a new promise', () => {
    const start = new PQ<number>((resolve) => resolve(20));

    return PQ.all([
      start
        .then((val) => {
          expect(val).toBe(20);
          return 30;
        })
        .then((val) => expect(val).toBe(30)),
      start.then((val) => expect(val).toBe(20)),
    ]);
  });
});
```

### 테스트 실행  

Visual Studio Code용 Jest 확장을 사용하는 것이 좋습니다. 그것은 우리를 위해 백그라운드에서 테스트를 실행하고 코드 줄 사이의 결과를 각각 통과 및 실패 테스트에 대한 녹색 및 빨간색 점으로 표시해줍니다.

결과를 보려면 "Output"콘솔을 열고 "Jest"탭을 선택하십시오.  

<img src="https://cdn-media-1.freecodecamp.org/images/0*dr7riPl5ZRkUF8lo" width="800" alt=""> 

다음 명령을 실행하여 테스트를 실행할 수도 있습니다.  

```javascript
npm run test
```  

테스트를 수행하는 방법에 관계없이 모든 테스트가 부정적으로 돌아 오는 것을 볼 수 있습니다.  
변경해 봅시다.   

## Promise 핵심 구현 

### constructor 

```javascript
class PQ<T> {
  private state: States = States.PENDING;
  private handlers: Handler<T, any>[] = [];
  private value: T | any;
  public static errors = errors;

  public constructor(callback: (resolve: Resolve<T>, reject: Reject) => void) {
    try {
      callback(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
}
```

constructor는 매개 변수로 `callback`을 받습니다.  
`this.resolve` 및 `this.reject`를 인수로 사용하여 이 callback을 호출합니다.  
일반적으로 `this.resolve`와 `this.reject`를 `this`에 바인딩했지만 여기서는 class arrow 메소드를 대신 사용했습니다.  

### setResult 
이제 결과를 설정해야합니다. 결과를 올바르게 처리해야한다는 것을 기억하십시오.   
즉 Promise을 반환하면 먼저 결과를 해결해야합니다.  

```javascript
class PQ<T> {

  // ...
  
  private setResult = (value: T | any, state: States) => {
    const set = () => {
      if (this.state !== States.PENDING) {
        return null;
      }

      if (isThenable(value)) {
        return (value as Thenable<T>).then(this.resolve, this.reject);
      }

      this.value = value;
      this.state = state;

      return this.executeHandlers();
    };

    setTimeout(set, 0);
  };
}
```   
먼저 state가 `pending`이 아닌지 확인합니다.  
해당 state인 경우 Promise가 이미 정해지고 새로운 값을 할당 할 수 없습니다.    

그런 다음 값이 `thenable`인지 확인해야합니다. 간단히 말해 `thenable`은`then`을 메소드로 사용하는 객체입니다.  

일반적으로 `thenable`은 `promise`처럼 행동해야합니다. 결과를 얻기 위해 호출 한 다음 `this.resolve` 및 `this.reject` 인수로 전달합니다.  

`thenable`이 정해지면, 메소드 중 하나를 호출하고 예상 된 `non-promise`값을 제공 할 것입니다.  

이제 객체가 `thenable`인지 확인해야합니다.  

```javascript
describe('isThenable', () => {
  test('detects objects with a then method', () => {
    expect(isThenable({ then: () => null })).toBe(true);
    expect(isThenable(null)).toBe(false);
    expect(isThenable({})).toBe(false);
  });
});
``` 

```javascript
const isFunction = (func: any) => typeof func === 'function';

const isObject = (supposedObject: any) =>
  typeof supposedObject === 'object' &&
  supposedObject !== null &&
  !Array.isArray(supposedObject);

const isThenable = (obj: any) => isObject(obj) && isFunction(obj.then);
```

`callback` 내부의 코드가 있더라도 promise가 동기가되지 않을 것이라는 점을 인식하는 것이 중요합니다.   
`setTimeout`을 사용하여 다음 이벤트 루프 반복까지 실행을 지연시킵니다.  
이제 남은 것은 값과 상태를 설정 한 다음 등록 된 핸들러를 실행하는 것입니다.  

### executeHandlers 
```javascript
class PQ<T> {

  // ...
  
  private executeHandlers = () => {
    if (this.state === States.PENDING) {
      return null;
    }

    this.handlers.forEach((handler) => {
      if (this.state === States.REJECTED) {
        return handler.onFail(this.value);
      }

      return handler.onSuccess(this.value);
    });

    this.handlers = [];
  };
}
```

다시, 상태가 `pending`이 아닌지 확인하십시오. 

promise의 상태는 우리가 사용할 함수를 나타냅니다.  
문제가 해결되면 `onSuccess`를 실행하고 그렇지 않으면 `onFail`을 실행해야합니다.  

이제 안전하고 나중에 우연히 실행되지 않도록 핸들러 배열을 분명히 해둡시다. 핸들러는 나중에도 부착하고 실행 할 수 있습니다. 

그 다음에 다루어야 할 내용은 핸들러를 연결하는 방법입니다.  

### attachHandler  

```javascript
class PQ<T> {

  // ...
  
  private attachHandler = (handler: Handler<T, any>) => {
    this.handlers = [...this.handlers, handler];

    this.executeHandlers();
  };
}
```  
보이는 것처럼 간단합니다. 핸들러 배열에 핸들러를 추가하고 실행하면됩니다. 이게 다입니다.  
이제 모든 것을 합치려면 `then`메소드를 구현해야합니다.  

### then 

```javascript
class PQ<T> {

  // ...
  
  public then<U>(
    onSuccess?: HandlerOnSuccess<T, U>,
    onFail?: HandlerOnFail<U>,
  ) {
    return new PQ<U | T>((resolve, reject) => {
      return this.attachHandler({
        onSuccess: (result) => {
          if (!onSuccess) {
            return resolve(result);
          }

          try {
            return resolve(onSuccess(result));
          } catch (e) {
            return reject(e);
          }
        },
        onFail: (reason) => {
          if (!onFail) {
            return reject(reason);
          }

          try {
            return resolve(onFail(reason));
          } catch (e) {
            return reject(e);
          }
        },
      });
    });
  }
}
```
`then`에서, 우리는 promise를 반환하고,`callback`에서 현재 promise가 확정되기를 기다리는데 사용되는 핸들러를 연결합니다.  
이 경우 핸들러의 `onSuccess` 또는 `onFail`이 실행되고 그에 따라 진행됩니다.  

여기서 기억해야 할 것은 전달된 핸들러 중 어느 것도 필요하지 않다는 것입니다. 그러나 `undefined`를 실행하려고 시도하지 않는 것이 중요합니다.   

또한 핸들러가 전달 될 때 `onFail`에서 오류가 처리되었으므로 실제로 리턴된 promise를 해결합니다.  

### catch
`Catch`는 실제로 `then`메소드에 대한 추상화입니다.   

```javascript
class PQ<T> {

  // ...
  
  public catch<U>(onFail: HandlerOnFail<U>) {
    return this.then<U>(identity, onFail);
  }
}
```

이게 다입니다.  

### Finally  

`Finally`는 또한 promise의 결과에 실제로 신경 쓰지 않기 때문에 `then(finallyCb, finallyCb)`에 대한 추상화입니다.
실제로 이전 promise의 결과도 보존하고 반환합니다. 따라서 `finallyCb`에 의해 반환되는 것은 실제로 중요하지 않습니다.  

```javascript
describe('PQ.prototype.finally', () => {
  test('it is called regardless of the promise state', () => {
    let counter = 0;
    return PQ.resolve(15)
      .finally(() => {
        counter += 1;
      })
      .then(() => {
        return PQ.reject(15);
      })
      .then(() => {
        // wont be called
        counter = 1000;
      })
      .finally(() => {
        counter += 1;
      })
      .catch((reason) => {
        expect(reason).toBe(15);
        expect(counter).toBe(2);
      });
  });
});
```
```javascript
class PQ<T> {

  // ...
  

  public finally<U>(cb: Finally<U>) {
    return new PQ<U>((resolve, reject) => {
      let val: U | any;
      let isRejected: boolean;

      return this.then(
        (value) => {
          isRejected = false;
          val = value;
          return cb();
        },
        (reason) => {
          isRejected = true;
          val = reason;
          return cb();
        },
      ).then(() => {
        if (isRejected) {
          return reject(val);
        }

        return resolve(val);
      });
    });
  }
}
```

### toString   
```javascript
describe('PQ.prototype.toString', () => {
  test('returns [object PQ]', () => {
    expect(new PQ<undefined>((resolve) => resolve()).toString()).toBe(
      '[object PQ]',
    );
  });
});
```

```javascript
class PQ<T> {

  // ...
  
  public toString() {
    return `[object PQ]`;
  }
}

```

문자열 `[object PQ]`만 반환합니다.  
promise의 핵심을 구현 한 후에는 앞서 언급 한 Bluebird 메소드중 일부를 구현하여 promise를 보다 쉽게 수행 할 수 있습니다.  

## Additional methods  

### Promise.resolve 

[작동방식](http://bluebirdjs.com/docs/api/promise.resolve.html)

```javascript
describe('PQ.resolve', () => {
  test('resolves a value', () => {
    return PQ.resolve(5).then((value) => {
      expect(value).toBe(5);
    });
  });
});
```
```javascript
class PQ<T> {

  // ...
  
  public static resolve<U = any>(value?: U | Thenable<U>) {
    return new PQ<U>((resolve) => {
      return resolve(value);
    });
  }
}
```  

### Promise.reject  
[작동방식](http://bluebirdjs.com/docs/api/promise.reject.html)  
```javascript
describe('PQ.reject', () => {
  test('rejects a value', () => {
    return PQ.reject(5).catch((value) => {
      expect(value).toBe(5);
    });
  });
});
```
```javascript
class PQ<T> {

  // ...
  
  public static reject<U>(reason?: any) {
    return new PQ<U>((resolve, reject) => {
      return reject(reason);
    });
  }
}
```

### Promise.all
[작동방식](http://bluebirdjs.com/docs/api/promise.all.html)  

```javascript
describe('PQ.all', () => {
  test('resolves a collection of promises', () => {
    return PQ.all([PQ.resolve(1), PQ.resolve(2), 3]).then((collection) => {
      expect(collection).toEqual([1, 2, 3]);
    });
  });

  test('rejects if one item rejects', () => {
    return PQ.all([PQ.resolve(1), PQ.reject(2)]).catch((reason) => {
      expect(reason).toBe(2);
    });
  });
});
```
```javascript
class PQ<T> {

  // ...
  
  public static all<U = any>(collection: (U | Thenable<U>)[]) {
    return new PQ<U[]>((resolve, reject) => {
      if (!Array.isArray(collection)) {
        return reject(new TypeError('An array must be provided.'));
      }

      let counter = collection.length;
      const resolvedCollection: U[] = [];

      const tryResolve = (value: U, index: number) => {
        counter -= 1;
        resolvedCollection[index] = value;

        if (counter !== 0) {
          return null;
        }

        return resolve(resolvedCollection);
      };

      return collection.forEach((item, index) => {
        return PQ.resolve(item)
          .then((value) => {
            return tryResolve(value, index);
          })
          .catch(reject);
      });
    });
  }
}
```  
구현이 매우 간단하다고 생각합니다.

`collection.length`에서 시작하여 0에 도달 할 때까지 각 `tryResolve'`로 카운트 다운합니다. 이는 컬렉션의 모든 항목이 해결되었음을 의미합니다. 그런 다음 새로 만든 컬렉션을 해결합니다.  

### Promise.any 
[작동방식](http://bluebirdjs.com/docs/api/promise.any.html)  

```javascript
describe('PQ.any', () => {
  test('resolves the first value', () => {
    return PQ.any<number>([
      PQ.resolve(1),
      new PQ((resolve) => setTimeout(resolve, 15)),
    ]).then((val) => expect(val).toBe(1));
  });

  test('rejects if the first value rejects', () => {
    return PQ.any([
      new PQ((resolve) => setTimeout(resolve, 15)),
      PQ.reject(1),
    ]).catch((reason) => {
      expect(reason).toBe(1);
    });
  });
});
```

```javascript
class PQ<T> {

  // ...

  public static any<U = any>(collection: (U | Thenable<U>)[]) {
    return new PQ<U>((resolve, reject) => {
      return collection.forEach((item) => {
        return PQ.resolve(item)
          .then(resolve)
          .catch(reject);
      });
    });
  }
}
```

우리는 단순히 첫 번째 값이 해결되어 Promise로 돌아 오기를 기다립니다.  

### Promise.props  
[작동방식](http://bluebirdjs.com/docs/api/promise.props.html) 

```javascript
describe('PQ.props', () => {
  test('resolves object correctly', () => {
    return PQ.props<{ test: number; test2: number }>({
      test: PQ.resolve(1),
      test2: PQ.resolve(2),
    }).then((obj) => {
      return expect(obj).toEqual({ test: 1, test2: 2 });
    });
  });

  test('rejects non objects', () => {
    return PQ.props([]).catch((reason) => {
      expect(reason).toBeInstanceOf(TypeError);
    });
  });
});
```
```javascript
class PQ<T> {

  // ...
  
  public static props<U = any>(obj: object) {
    return new PQ<U>((resolve, reject) => {
      if (!isObject(obj)) {
        return reject(new TypeError('An object must be provided.'));
      }

      const resolvedObject = {};

      const keys = Object.keys(obj);
      const resolvedValues = PQ.all<string>(keys.map((key) => obj[key]));

      return resolvedValues
        .then((collection) => {
          return collection.map((value, index) => {
            resolvedObject[keys[index]] = value;
          });
        })
        .then(() => resolve(resolvedObject as U))
        .catch(reject);
    });
  }
}
```
전달 된 객체의 키를 반복하여 모든 값을 해결합니다. 그런 다음 새 객체에 값을 할당하고 Promise를 해결합니다.   

### Promise.prototype.spread 

[작동방식](http://bluebirdjs.com/docs/api/spread.html) 

```javascript
describe('PQ.protoype.spread', () => {
  test('spreads arguments', () => {
    return PQ.all<number>([1, 2, 3]).spread((...args) => {
      expect(args).toEqual([1, 2, 3]);
      return 5;
    });
  });

  test('accepts normal value (non collection)', () => {
    return PQ.resolve(1).spread((one) => {
      expect(one).toBe(1);
    });
  });
});

```

```javascript
class PQ<T> {

  // ...
  
  public spread<U>(handler: (...args: any[]) => U) {
    return this.then<U>((collection) => {
      if (Array.isArray(collection)) {
        return handler(...collection);
      }

      return handler(collection);
    });
  }
}
```

### Promise.delay 

[작동방식](http://bluebirdjs.com/docs/api/delay.html) 

```javascript
describe('PQ.delay', () => {
  test('waits for the given amount of miliseconds before resolving', () => {
    return new PQ<string>((resolve) => {
      setTimeout(() => {
        resolve('timeout');
      }, 50);

      return PQ.delay(40).then(() => resolve('delay'));
    }).then((val) => {
      expect(val).toBe('delay');
    });
  });

  test('waits for the given amount of miliseconds before resolving 2', () => {
    return new PQ<string>((resolve) => {
      setTimeout(() => {
        resolve('timeout');
      }, 50);

      return PQ.delay(60).then(() => resolve('delay'));
    }).then((val) => {
      expect(val).toBe('timeout');
    });
  });
});
```

```javascript
class PQ<T> {

  // ...
  
  public static delay(timeInMs: number) {
    return new PQ((resolve) => {
      return setTimeout(resolve, timeInMs);
    });
  }
}
``` 
`setTimeout`을 사용함으로써, 주어진 밀리 초만큼 `resolve` 함수의 실행을 지연시킵니다.  

### Promise.prototype.timeout 

[작동방식](http://bluebirdjs.com/docs/api/timeout.html)  

```javascript
describe('PQ.prototype.timeout', () => {
  test('rejects after given timeout', () => {
    return new PQ<number>((resolve) => {
      setTimeout(resolve, 50);
    })
      .timeout(40)
      .catch((reason) => {
        expect(reason).toBeInstanceOf(PQ.errors.TimeoutError);
      });
  });

  test('resolves before given timeout', () => {
    return new PQ<number>((resolve) => {
      setTimeout(() => resolve(500), 500);
    })
      .timeout(600)
      .then((value) => {
        expect(value).toBe(500);
      });
  });
});
```

```javascript
class PQ<T> {

  // ...
  
  public timeout(timeInMs: number) {
    return new PQ<T>((resolve, reject) => {
      const timeoutCb = () => {
        return reject(new PQ.errors.TimeoutError());
      };

      setTimeout(timeoutCb, timeInMs);

      return this.then(resolve);
    });
  }
}

```
이것은 조금 까다 롭습니다.  

`setTimeout`이 `promise`에서보다 더 빠르게 실행되면 특별한 오류로 `promise`를 거절합니다.  

### Promise.promisify 

[작동방식](http://bluebirdjs.com/docs/api/promise.promisify.html)  

```javascript
describe('PQ.promisify', () => {
  test('works', () => {
    const getName = (firstName, lastName, callback) => {
      return callback(null, `${firstName} ${lastName}`);
    };

    const fn = PQ.promisify<string>(getName);
    const firstName = 'Maciej';
    const lastName = 'Cieslar';

    return fn(firstName, lastName).then((value) => {
      return expect(value).toBe(`${firstName} ${lastName}`);
    });
  });
});
```

```javascript
class PQ<T> {

  // ...
  
  public static promisify<U = any>(
    fn: (...args: any[]) => void,
    context = null,
  ) {
    return (...args: any[]) => {
      return new PQ<U>((resolve, reject) => {
        return fn.apply(context, [
          ...args,
          (err: any, result: U) => {
            if (err) {
              return reject(err);
            }

            return resolve(result);
          },
        ]);
      });
    };
  }
}
```  

전달 된 모든 인수와 마지막 인수로 함수에 적용하여 오류 우선 `callback`을 제공합니다. 

### Promise.promisifyAll 

[작동방식](http://bluebirdjs.com/docs/api/promise.promisifyall.html)  

```javascript
describe('PQ.promisifyAll', () => {
  test('promisifies a object', () => {
    const person = {
      name: 'Maciej Cieslar',
      getName(callback) {
        return callback(null, this.name);
      },
    };

    const promisifiedPerson = PQ.promisifyAll<{
      getNameAsync: () => PQ<string>;
    }>(person);

    return promisifiedPerson.getNameAsync().then((name) => {
      expect(name).toBe('Maciej Cieslar');
    });
  });
});
```

```javascript
class PQ<T> {

  // ...
  
  public static promisifyAll<U>(obj: any): U {
    return Object.keys(obj).reduce((result, key) => {
      let prop = obj[key];

      if (isFunction(prop)) {
        prop = PQ.promisify(prop, obj);
      }

      result[`${key}Async`] = prop;

      return result;
    }, {}) as U;
  }
}

```
우리는 객체와 `promisify`의 키를 반복하였고 이것은 각각 `Async`라는 메소드의 이름으로 추가합니다.  


## 마무리

여기에는 모든 Bluebird API 메소드 중 몇 가지만 포함되어 있으므로 나머지를 탐색하고 해결하고 구현해 보시기 바랍니다.  

처음에는 어려워 보일 수 있지만 낙담하지는 마십시오. 쉬우면 가치가 없습니다.   

읽어 주셔서 감사합니다! 이 기사가 유익하고 Promise의 개념을 이해하는 데 도움이 되었기를 바랍니다. 앞으로는 Promise을 사용하거나 단순히 비동기 코드를 작성하는 것이 더 편안해질것입니다.  

질문이나 의견이 있으시면 아래의 의견 섹션에 자유롭게 의견을 보내거나 [메시지](https://www.mcieslar.com/contact)를 보내주십시오.  

내 소셜 미디어를 확인하십시오!

내 [뉴스 레터](https://primq.us12.list-manage.com/subscribe?u=2b7fd66363dd29638beaf7c1e&id=38ed1d9b28)에 가입하십시오!  


Originally published at www.mcieslar.com on August 4, 2018.  