const DEFAULT_CONFIG = {
  versition: '1.4.0',
  hostAndPath: 'webapi.amap.com/maps',
  key: 'f97efc35164149d0c0f299e7a8adb3d2',
  callback: '__amap_init_callback',
  useAMapUI: false
}

export default class MapLoader {
  constructor() {
    this.config = DEFAULT_CONFIG;
  }

  getScriptSrc(cfg) {
    return `http://${cfg.hostAndPath}?v=${cfg.versition}&key=${cfg.key}&callback=${cfg.callback}`
  }

  buildScriptTag(src) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.defer = true
    script.src = src
    return script
  }

  getMainPromise() {
    const script = this.buildScriptTag(this.getScriptSrc(this.config))
    const p = new Promise(resolve => {
      window[this.config.callback] = () => {
        resolve()
        delete window[this.config.callback]
      }
    })
    document.body.appendChild(script)
    return p
  }

}