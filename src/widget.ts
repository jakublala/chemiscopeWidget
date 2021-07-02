// Copyright (c) Jakub Lala
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';

import { default as $ } from 'jquery';
(window as any).$ = $;

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/bootstrap-iso.css';
import '../css/widget.css';

import { DefaultVisualizer } from 'chemiscope';

export class ChemiscopeModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: ChemiscopeModel.model_name,
      _model_module: ChemiscopeModel.model_module,
      _model_module_version: ChemiscopeModel.model_module_version,
      _view_name: ChemiscopeModel.view_name,
      _view_module: ChemiscopeModel.view_module,
      _view_module_version: ChemiscopeModel.view_module_version,
      value: '',
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers,
    // Add any extra serializers here
  };

  static model_name = 'ChemiscopeModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ChemiscopeView';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}

export class ChemiscopeView extends DOMWidgetView {
  render() {
    this.el.innerHTML = `
    <div class="bootstrap-iso">
        <div id="chemiscope-widget-container">
          <div id="chemiscope-meta-and-map">
            <div id="chemiscope-meta"></div>
            <div id="chemiscope-map" ></div>
          </div>
          <div id="chemiscope-structure-and-info">
            <div id="chemiscope-structure"></div>
            <div id="chemiscope-info"></div>
          </div>
        </div>
      </div>
      </div>`;

    const config = {
      map: this.el.querySelector('#chemiscope-map') as HTMLElement,
      info: this.el.querySelector('#chemiscope-info') as HTMLElement,
      meta: this.el.querySelector('#chemiscope-meta') as HTMLElement,
      structure: this.el.querySelector('#chemiscope-structure') as HTMLElement,
    };

    DefaultVisualizer.load(config, JSON.parse(this.model.get('value'))).then(
      (newVisualizer: any) => {
        this.visualizer = newVisualizer;
      }
    );
  }
  remove() {
    if (this.visualizer !== undefined) {
      this.visualizer.remove();
    }
  }
  private visualizer: DefaultVisualizer;
}
