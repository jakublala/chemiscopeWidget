#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Jakub Lala.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""
import json

from ipywidgets import DOMWidget, ValueWidget, register
from traitlets import Unicode, Bool, validate, TraitError

from ._frontend import module_name, module_version

from .input import write_input

@register
class Chemiscope(DOMWidget, ValueWidget):
    _model_name = Unicode('ChemiscopeModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _model_id = 1

    _view_name = Unicode('ChemiscopeView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    
    with open("../examples/chemiscope.json") as f:
            value = Unicode(json.dumps(json.load(f))).tag(sync=True)

def display(frames, properties):
    write_input("chemiscope.json", frames, properties=properties)
    x = Chemiscope()
    return