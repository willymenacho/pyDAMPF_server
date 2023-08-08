# What is Motivus?

Motivus is a collaborative data processing platform; a marketplace of computing resources where high-performance distributed computing and algorithms interact to optimize processes in industry, science and technology.

You can execute tasks on _Motivus Waterbear Cluster_ using a driver program, this program describes the way task to be distributed to the workers and result handling.

![components-diagram](https://motivus.cl/components-diagram.png 'Components diagram')

The task definition references an _algorithm_; the code that each worker executes, and some inputs; files, execution arguments and/or function parameters.

_Algorithms_ can be obtained directly from the _Motivus Marketplace_ or compiled from source. We currently support algorithm compilation for programs written in C, C++ and Rust programming languages.

> You can upload your own algorithm to the _Motivus Marketplace_ for other people to use on their own drivers.

# Writing a Driver program

To write and run your driver program, you'll need to provide the following environment:

- Python = 3.7 | 3.8 | 3.9
  - We recommend using a `conda` environment.
- [_Motivus Client library_](https://pypi.org/project/motivus/): `$ pip install motivus`
- A _Motivus Application Token_

The easiest way to write a driver is by using a listed algorithm in the _Motivus Marketplace_.

## Steps

1. Create an `.env` file containing your `APPLICATION_TOKEN` as follows:

```sh
# .env
APPLICATION_TOKEN=<your motivus application token>
```

2. Create a python script and define your task, for example:

```python
# driver.py
import asyncio
from motivus.client import Client

data = [
    [-2.7825343, -1.7604825, -5.5550113, -2.9752946, -2.7874138],
    [-2.9847919, -3.8209332, -2.1531757, -2.2710119, -2.3582877],
    [-3.0109320, -2.2366132, -2.8048492, -1.2632331, -4.5755581],
    [-2.8432186, -1.0383805, -2.2022826, -2.7435962, -2.0013399],
    [-2.6638082, -3.5520086, -1.3684702, -2.1562444, -1.3186447],
    [1.7409171, 1.9687576, 4.7162628, 4.5743537, 3.7905611],
    [3.2932369, 2.8508700, 2.5580937, 2.0437325, 4.2192562],
    [2.5843321, 2.8329818, 2.1329531, 3.2562319, 2.4878733],
    [2.1859638, 3.2880048, 3.7018615, 2.3641232, 1.6281994],
    [2.6201773, 0.9006588, 2.6774097, 1.8188620, 1.6076493],
]

task_definition = {
    'algorithm': "kmeans",
    'algorithm_version': "0.0.1",
    'params': [
        data,
        2
    ]
}

async def main():
    motivus = await Client.connect()

    task_id = motivus.call_async(task_definition)
    task = motivus.select_task(task_id)
    return await task

result = asyncio.run(main())
print(result)
# [0, 0, 0, 0, 0, 1, 1, 1, 1, 1]
```

3. Run your driver on _Motivus Waterbear_:

```sh
$ python driver.py
```

## Running Algorithms In Loop-back Mode

You can also run your driver’s algorithms using local loop-back orkers. This feature is experimental.

To enable loop-back mode, follow these steps:

1. Make sure the _Motivus CLI_ tool and docker are available
1. Execute `$ motivus loopback` and take note of the command output.
1. Make the indicated environment variable available to your Driver's execution.
1. Run your Driver as usual `$ python driver.py`

## Task Definition

To define your task, use a dict. This dict can declare several keys:
|key|value type|description|required|
|---|----------|-----------|--------|
|`algorithm`|string|The algorithm name as published on _Motivus Marketplace_|yes|
|`algorithm_name`|string|The algorithm version|yes|
|`params`|list|Parameters to be passed to the algorithm main function invocation: i.e. `fun(list[0], list[1] ...)`|no|
|`arguments`|string \| list[string]|Arguments to be passed to the algorithm invocation, as if where executed using command line arguments: i.e. having `["--some-flag", "--another_flag 1"]` would be equivalent to call `$ kmeans --some-flag --another_flag 1` on the worker.|no|
|`preload_files`|dict[string,string]|Files that should be loaded on the worker's virtual filesystem prior to algorithm execution, which can be accessed from the algorithm. The dict key should be the absolute location and file name where the file will be available and the value should be the file readed from the driver's local filesystem using `motivus.read_file(path)`.|no|
|`result_files`|dict[string,string]]|Files that should be extracted from the worker's virtual filesystem and returned as result to the driver. The key should be a string with the absolute file location on the virtual filesystem and the value should be a path on the driver's filesystem where the file should be stored.|no|
|`wasm_path`|string|Where should the client look for the algorithm `.wasm` generated file.|required when no `algorithm` and `algorithm_version` are used.|
|`loader_path`|string|Where should the client look for the algorithm `.js` generated file.|required when no `algorithm` and `algorithm_version` are used.|
|`data_link`|string|A URL with the algorithm default starting filesystem. When using a filesystem during algorithm compilation this file is generated as a `.data.zip` file.|required only for C\C++ algorithms.|

# Writing Your Own Algorithm

To write, test and distribute your algorithm using the _Motivus Marketplace_, you'll need to provide the following environment:

- Docker
  - Your user must belong to the `docker` group.
- Python = 3.7 | 3.8 | 3.9
  - We recommend using a `conda` environment.
- [_Motivus CLI tool_ and _Motivus Client library_](https://pypi.org/project/motivus/): `$ pip install motivus`
- A _Motivus Personal Access Token_
- A previously created algorithm on _Motivus Marketplace_, in this example we'll use `kmeans`

**We'll describe the steps for a Rust algorithm.**

## Steps

1. Use our template to kick-start your Rust project. You will be asked a few questions about your algorithm to be used as metadata when building and publishing to Motivus Marketplace:

```
$ motivus new kmeans
```

2. A `main` function in `src/lib.rs` will be created and invoked from your Driver program with `params` as function parameters on runtime. An example implementation:

```rust
// src/lib.rs
#[wasm_bindgen]
pub fn main(input: &JsValue, clusters: &JsValue) -> Box<[JsValue]> {
    let xs: Vec<Vec<f32>> = input.into_serde().unwrap();
    let k: usize = clusters.into_serde().unwrap();
    let clustering = kmeans(xs, k);

    // Transform to JS array
    clustering
        .into_iter()
        .map(|s| s as u32)
        .map(JsValue::from)
        .collect::<Vec<JsValue>>()
        .into_boxed_slice()
}
```

3. A `motivus.yml` file is created, declaring some metadata of your algorithm for the framework to use.

```yaml
# motivus.yml
---
version: 1.0

build:
  compiler: mvrc
  source: .
  filesystem: .

package:
  name: kmeans
  version: 0.0.1
  metadata:
    short_description: 'K-means clustering'
    license: 'MIT'
    author: 'Motivus'
    url: 'https://motivus.cl/'
    upstream_url: 'https://github.com/m0tivus/example-kmeans-rust'
    long_description: 'k-means clustering is a method of vector quantization, originally from signal ...'
    # you can also specify a file path of a markdown file
    # long_description: ./USAGE.md
```

4. Build your algorithm using the _Motivus CLI tool_:

```sh
$ motivus build
```

5. You can test your build on a local worker running your driver in loop-back mode:

```sh
$ motivus loopback
```

```sh
WEBSOCKET_URI=ws://localhost:7070/client_socket/websocket python driver.py
```

6. To push your algorithm start by creating your algorithm in _Motivus Marketplace_ using the same name as in `motivus.yml`
7. Create an `.env` file with your personal access token:

```sh
# .env
PERSONAL_ACCESS_TOKEN=<your personal access token here>
```

8. Upload your algorithm version to _Motivus Marketplace_:

```sh
$ motivus push
```

Your algorithm is now published on _Motivus Marketplace_.
