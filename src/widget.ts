// Copyright (c) Jakub Lala
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers,
} from '@jupyter-widgets/base';
/**
declare var require: any;

require.config({
  //Define 3rd party plugins dependencies
  paths: {
    jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min',
    jquery_ui:
      'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min',
  },
}); 
*/

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
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
    this._chemiscopeElement = document.createElement('div');
    this._chemiscopeElement.innerHTML = `


    <main class="container-fluid">
            <div class="row">
                <div class="col-md-7" style="padding: 0">
                    <div class="embed-responsive embed-responsive-1by1">
                        <div id="chemiscope-meta"></div>
                        <div id="chemiscope-map" class="embed-responsive-item" style="position: absolute"></div>
                    </div>
                </div>
                
                <div class="col-md-5" style="padding: 0">
                    <div class="embed-responsive embed-responsive-5by7">
                        <div class="embed-responsive-item">
                            <!-- height: 0 below is a hack to force safari to
                            respect height: 100% on the children
                            https://github.com/philipwalton/flexbugs/issues/197#issuecomment-378908438
                            -->
                            <div id="chemiscope-structure" style="height: 0"></div>
                            <div id="chemiscope-info"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>`;
    this.value_changed();
    this.model.on('change:value', this.value_changed, this);
  }

  value_changed() {
    this.el.appendChild(this._chemiscopeElement);
    const config = {
      map: 'chemiscope-map',
      info: 'chemiscope-info',
      meta: 'chemiscope-meta',
      structure: 'chemiscope-structure',
    };

    DefaultVisualizer.load(config, this.model.get('value')).then(
      (newVisualizer) => {
        this.visualizer = newVisualizer;
      }
    );
  }

  remove() {
    this.visualizer.remove();
  }

  private visualizer: DefaultVisualizer;
  private _chemiscopeElement: HTMLDivElement;
}
