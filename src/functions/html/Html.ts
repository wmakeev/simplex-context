// https://cheerio.js.org/docs/intro
import * as cheerio from 'cheerio'

export class Html {
  static fromString(html: string) {
    return new this(cheerio.load(html).root())
  }

  #dom: cheerio.Cheerio<any>

  /**
   * @param {} html
   */
  constructor(html: cheerio.Cheerio<any>) {
    this.#dom = html
  }

  get [Symbol.toStringTag]() {
    return 'Html'
  }

  find(selector: string) {
    return new Html(this.#dom.find(selector))
  }

  children(selector: string) {
    return new Html(this.#dom.children(selector))
  }

  parent(selector?: string) {
    return new Html(this.#dom.parent(selector))
  }

  next(selector?: string) {
    return new Html(this.#dom.next(selector))
  }

  prev(selector?: string) {
    return new Html(this.#dom.prev(selector))
  }

  text() {
    return this.#dom.text()
  }

  html() {
    return this.#dom.html()
  }

  toArray() {
    const result: Html[] = Array(this.#dom.length)

    for (const [index, el] of this.#dom.toArray().entries()) {
      result[index] = new Html(cheerio.load(el).root())
    }

    return result
  }
}
