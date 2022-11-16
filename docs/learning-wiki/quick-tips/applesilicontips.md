---
date: December 17, 2021
---
# Python and Apple Silicon
## Download, install, & setup [conda miniforge](https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-MacOSX-arm64.sh)

- After downloading the above conda setup script, make it executable, run it, and activate it
```
chmod +x ~/Downloads/Miniforge3-MacOSX-arm64.sh
~/Downloads/Miniforge3-MacOSX-arm64.sh
source ~/miniforge3/bin/activate
```
- I like to use pyenv and venv so I don't use conda unless I need it specifically
```
conda init
conda config --set auto_activate_base false
```
- Create a conda env
```
conda create --name <name> python=3.9
```

## Tensorflow
- Install tensorflow dependencies and tensorflow
```
conda install -c apple tensorflow-deps
pip install tensorflow-macos tensorflow-metal
```
- Install needed packages
```
conda install -c conda-forge -y pandas jupyter
conda install scikit-learn
```
- Install other packages
```
conda install -c conda-forge opencv
pip install matplotlib tqdm pydot scikit-image graphviz tensorflow_datasets
```
## PyQt5
- Unfortunately Qt5 is hard to get working with Apple Silicon
- If you're starting a new PyQt project you're better off using PyQt6 which has support for ARM64 architectures
- However if you must use PyQt5, there are various methods to do so:

### With built-in Python venv (virtualenv)
- If you don't like conda or don't need tensorflow use this method
- Open terminal with Rosetta 2 
    - Go to your Applications folder and make a copy of the terminal app (may be in the Utilities subfolder)
    - Right click > Get Info > Check "Open with Rosetta"
- Use non-homebrew python (usually in /usr/bin/python3) to create virtual environment and activate it
```
/usr/bin/python3 -m venv env
source env/bin/activate
```
- Upgrade pip and install PyQt5
```
pip install --upgrade pip
pip install PyQt5
```

### With Conda

- If you plan to use tensorflow in the same package on MacOS you're probably using conda as well so:
```
brew install pyqt5
echo 'export PATH="/opt/homebrew/Cellar/qt@5/bin:$PATH"' >> ~/.zshrc
echo 'export PATH="/opt/homebrew/Cellar/pyqt@5/<version>/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```
- Then move the PyQt5 lib files into our conda environment
```
cp -r /opt/homebrew/Cellar/pyqt@5/<version>/lib/python3.9/site-packages/* ~/miniforge3/envs/<conda environment>/lib/python3.9/site-packages/
```


:smile: