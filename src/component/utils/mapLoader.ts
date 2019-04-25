const DEFAULT_CONFIG = {
  version: '1.4.0',
  hostAndPath: 'webapi.amap.com/maps',
  key: '6b953aec395d345fd37e1b5434d587a9',
};

interface IConfig {
  hostAndPath: string,
  version: string,
  key: string,
}

interface IMapLoader {
  config?: IConfig,
}

export default class MapLoader implements IMapLoader {
  config:IConfig

  constructor(props:IMapLoader) {
    const { config } = props;
    this.config = Object.assign({}, DEFAULT_CONFIG, config);
  }

  getScriptSrc() {
    const { hostAndPath, version, key } = this.config;
    let { protocol } = window.location;
    if (protocol.indexOf(':') === -1) {
      protocol += ':';
    }
    return `${protocol}//${hostAndPath}?v=${version}&key=${key}`;
  }

  buildScriptTag(src: string) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = src;
    return script;
  }

  getMainPromise() {
    const script = this.buildScriptTag(this.getScriptSrc());
    const p = new Promise((resolve) => {
      script.onload = () => {
        resolve();
      };
    });
    document.body.appendChild(script);
    return p;
  }
}
