#!/usr/bin/env python
# coding: utf-8

# Copyright (c) Jakub Lala.
# Distributed under the terms of the Modified BSD License.

"""
TODO: Add module docstring
"""
from ipywidgets import DOMWidget, ValueWidget, register
from traitlets import Unicode, Bool, validate, TraitError

from ._frontend import module_name, module_version

@register
class widget(DOMWidget, ValueWidget):
    _model_name = Unicode('ChemiscopeModel').tag(sync=True)
    _model_module = Unicode(module_name).tag(sync=True)
    _model_module_version = Unicode(module_version).tag(sync=True)
    _model_id = 1

    _view_name = Unicode('ChemiscopeView').tag(sync=True)
    _view_module = Unicode(module_name).tag(sync=True)
    _view_module_version = Unicode(module_version).tag(sync=True)
    
    value = Unicode().tag(sync=True)