# Open3D ML
- Open3D ML is a module in Open3D which provides various submodules to organize and add provide functionality to machine learning model development for point cloud data.
- Open3D ML provides 2 similar interfaces for the deep learning backends: TensorFlow (`open3d.ml.tf`) and PyTorch (`open3d.ml.torch`)
- Open3D consists of 3 main components along with various other tools, the 3 main components being Datasets, Pipelines, and Models

# Datasets

## Dataset Class
To create a custom dataset that is compatible with `open3d.ml`, it must inherit from the `BaseDataset` class which implements the following functions:

#### `__init__(dataset_path)`
When initialized, `dataset_path` is used to configure all of the splits as well as the other attributes to be used later

#### `get_label_to_names()`

Returns a dictionary mapping from the label number to the label name. For example:

`{0: 'cat', 1: 'dog'}`

- this will be used in `get_3d_summary()` when visualizing the results

#### `get_split(split)`
Returns a split of the dataset given one of: `['training', 'test', 'validation', 'all']`
- the return type is `DatasetSplit` which will be discussed next

#### `get_split_list(split)`
Returns a list of the paths to all files belonging to the given split. e.g. `['data/train/0.npy', 'data/train/1.npy', 'data/test/0.npy']`
- This function is not required but is useful for the initialization of the `DatasetSplit` Class

#### `save_test_result(results, attr)`
which saves the test results to the attribute `test_result_folder`
- this is used in the `run_test()` function of the `SemanticSegmentationPipeline` object

#### `is_tested(data, attr)` 
Checks the aforementioned `test_result_folder` if there is a filename that matches the `attr` dict of the given `data` and returns `True` if there is a test file there, else `False`


## DatasetSplit Class
All Datasets must have a corresponding `DatasetSplit` object to be returned by `get_split()`

These objects inherit from `BaseDataset` class which implements the following functions:

#### `__init__(dataset, split)`
- all the config params from `Dataset` are copied into the split
- `get_split_list(split)` is used to retrieve all the filepaths belonging to the split

#### `get_data(idx)`
Loads the `.npy` file (containing a `(N,3+f+1) np.array`) within the current split in  the Dataset folder and returns a `dict` 

`dict`  structure: 
```python
{
    'point': (N,3) np.array, 
    'feat': (N,f) np.array, 
    'label': (N,) np.array
}
```
- if there are no features (`f == 0`),  `'feat'` will be `None`
- if the split is `'test'`, `'label'` will be `np.zeros((N,))`

#### `get_attr(idx)`
Returns `dict` of information regarding the point cloud at the given index

- `dict`  structure: 
```python
{
    'name': name of file without '.npy'. e.g. 'point_cloud_0',
    'path': path to file. e.g. 'data/test/point_cloud_0.npy',
    'split': 'training', 'test', 'validation', or 'all'
}
```

## Dataloaders
Dataloaders are required during training where large amounts of data are used and the less performant `open3d.ml.Dataset` may be a bottleneck since data must be loaded to memory. Thus we can pass `open3d.ml.Dataset` and `open3d.ml.Model` to `Dataloader` for use during training.

Since models in `tf` and `torch` consume data differently, there must be two unique implementations for Dataloaders unlike `Dataset` which is not specific to either framework. The implementations of Dataloaders are `TFDataloader` and `TorchDataloader`

#### `__init__(dataset, model, use_cache, get_batch_gen)`
- `dataset`:  `DatasetSplit` object whose attributes are used to configure
- `model`:  `Model` object which provides its `preprocess` and `transform` functions which are applied to the data and `get_batch_gen` function which is used by `get_loader`

#### `get_loader()`
- Creates a `tf.data.Dataset` object called `loader` from `tf.data.Dataset.from_generator` using `model`'s `get_batch_gen` function
- Maps the `transform` function onto `tf.data.Dataset` using `loader.map`
- Returns `loader` and the dataset length
- Iterating through loader will return the output of `model.transform`


# Metrics and Losses
## Metrics
#### `__init__(pipeline, model, dataset)`

## Losses


# Models
## BaseModel
#### `__init__(model, dataset, ...)`

#### `get_loss(Loss, results, inputs)`
"""Computes the loss given the network input and outputs.

Args:
    Loss: A loss object.
    results: This is the output of the model.
    inputs: This is the input to the model.

Returns:
    Returns the loss value.
"""
return

#### `get_optimizer(cfg_pipeline)`
This takes in the pipeline config and uses the params to create a `tf.keras.optimizers` object, in `RandLANet` the optimizer is `Adam`

#### `preprocess(data, attr)`
This function is called before training to preprocess the data from a dataset.

Args:
    data: A sample from the dataset.
    attr: The corresponding attributes.

Returns:
    Returns the preprocessed data
"""
return

#### `get_batch_gen(dataset)`
Returns a generator of `DatasetSplit.get_data()` as well as the types and shapes of the yielded data
- This returned generator gets the data from the `DatasetSplit` runs `preprocess` and perfoms other preprocessing before yielding (which is consumed by `transform` within `TFDatloader`)

#### `transform()`
Transforms the raw function for the point cloud and features.

Only used during Training, alternate is used during testing (`transform_inference()`):
- used by `TFDataloader` and applied to all objects generated by `get_batch_gen`
- you can think of the input to `transform` as the direct return of the `get_batch_gen` generator since `TFDataloader` recieves the yield of the `get_batch_gen` generator which is then mapped to `transform`


### Test/Inference Functions
The inference functions interface directly to the less performant `open3d.ml.Dataset` object instead of passing `open3d.ml.Dataset` into `TFDataloader`

These are all run within the `Pipeline.run_inference` which is called by `Pipeline.run_test`

#### `inference_begin(data)`
Called at the start of `Pipeline.run_test` before running inference. 
- `data` arg is created from `DatasetSplit.get_data(idx)`
- `data` passed into `preprocess()`, then stored into attr `self.inference_data`
- `self.test_probs` is set to `np.zeros((N, num_classes))`
- `self.possibility` is set to `np.random.rand(num_points) * 1e-3`, 
- `tqdm` progressbar, `pbar` is created


#### `inference_preprocess()`
Prepares the inputs for the model by running `transform_inference` on `self.inference_data`
Returns `inputs` to be consumed by the `call()` function of the model.

#### `inference_end(results)`
The output of `model.call()` is passed into this function, post-processing on the outputs
- Sets `self.inference_result` to a dict with structure:
```python
{
    'predict_scores': (N, 3) np.array of scores,
    'predict_labels': (N,) np.array of labels based on the scores
}
```


# Pipelines
Pipelines bring together models and datasets and allow you to run ML pipelines upon them

Like models, there are 2 implementations of pipelines, one for `tf` and one for `pytorch`

There are two pipelines for the two main tasks in point cloud classification: __Semantic Segmentation__ and __Object Detection__.

There generally shouldn't be any need for custom pipelines to be built since `SemanticSegmentationPipeline` and `ObjectDetectionPipeline` should be flexible and generalizable for most tasks. These to classes inherit from the `BasePipeline` class to be compatible with `open3d.ml`, and must implement the following functions:

## SemanticSegmentationPipeline

#### `__init__(model, dataset, ...)`
There are many other args determining to the model training. However, in regards to the data pipeline itthe ones relevant to us are:
- `main_log_dir`: The directory where logs are stored.
- `device`: The device to be used for training. `['gpu', 'cpu']`
- `split`: The dataset split to be used.
- `train_sum_dir`: The directory where the training summary is stored.


#### `run_inference(data)`
- runs `inference_begin(data)` to load the data into the `model` object
- runs `inference_preprocess()` to preprocess the data and return `input`
- runs the `call()` function on `inputs` to get `results` which is passed into `model.inference_end()` and updates the `model.inference_result` attribute
- A `SemSegMetric` object is created and then `SemSegMetric.update(model.inference_result['predict_scores'], data['label'])` is called upon it, to calculate the IoU and Accuracy metrics, these metrics are logged
- Returns the `inference_end` dict with structure:
```python
{
    'predict_scores': (N, 3) np.array of scores,
    'predict_labels': (N,) np.array of labels based on the scores
}
```

#### `run_test()`
- Generates log files and retrieves the `'test'` split
- Creates `SemSegLoss` and `SemSegMetric` objects
- For each sample in the `DatasetSplit`:
    - get `data` and `attr` and pass through `run_inference()`
    - pass results to `SemSegLoss.filter_valid_label()` and `SemSegMetric.update()`
    - Runs `get_3d_summary()` on results

#### `run_train()`
- Generates log files, retrieves the `'train'` and `'validation'` `TFDataloader`, and configures Tensorboard
- Create `SemSegMetric` and `SemSegLoss` for both `'train'` and `'validation'` 
- For each epoch:
    - Reset `SemSegMetric` and `SemSegLoss`
    - For each `input` generated from `train_loader` DataLoader:
        - Pass `input` through model for training
        - Get gradients and update weights
        - Calculate `SemSegMetric` and `SemSegLoss` for `'train'`

    - For each `input` generated from `valid_loader` DataLoader:
        - Pass `input` through model
        - Calculate `SemSegMetric` and `SemSegLoss` for `'validation'`
    
    - Call `self.save_logs()` and `self.save_ckpt()` if correct interval
