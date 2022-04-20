---
---
# howird.com
personal website

### installation
```
git submodule init
cd mkdocs
python setup.py install

cd ..

pip install -r requirements.txt
pip install markupsafe==2.0.1
pip install "Jinja2<3.0.0"
```

### running website locally
```
mkdocs serve
```

### building website's static files
```
mkdocs build
```