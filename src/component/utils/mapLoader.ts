const DEFAULT_CONFIG = {
  version: '1.4.0',
  hostAndPath: 'webapi.amap.com/maps',
  key: '59ba5e8427f215f33f359b196119a1e2',
}

interface IMapLoader {
  config?: IConfig,
}

interface IConfig {
  hostAndPath: string,
  version: string,
  key: string,
}

export default class MapLoader implements IMapLoader {

  config:IConfig

  constructor(props:IMapLoader) {
    const { config } = props;
    this.config = Object.assign({}, DEFAULT_CONFIG, config);
  }

  getScriptSrc() {
    const { hostAndPath, version, key } = this.config;
    let protocol = window.location.protocol;
    if (protocol.indexOf(':') === -1) {
      protocol += ':';
    }
    console.log(protocol);
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
    const p = new Promise(resolve => {
      script.onload = () => {
        resolve()
      }
    })
    document.body.appendChild(script);
    return p;
  }

}