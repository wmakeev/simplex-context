import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import { createExpressionContextState } from '../../../src/expressionContext.js'
import { Html } from '../../../src/functions/html/Html.js'
import { getFunctions } from '../../../src/functions/index.js'

const fn = getFunctions(createExpressionContextState())

test('Html (complex)', async () => {
  const htmlStr = await readFile(
    path.join(process.cwd(), 'test/cases/sample.html'),
    'utf8'
  )

  const html = fn['Html:fromStr']!(htmlStr)

  assert.ok(html instanceof Html)

  const html1 = fn['Html:find']!(
    html,
    'h2.product-tabs-column-title:contains("Характеристики")'
  )

  const html2 = fn['Html:next']!(html1)

  const html3 = fn['Html:find']!(html2, '.list-item')

  const htmls = fn['Html:toArray']!(html3)

  assert.ok(Array.isArray(htmls))

  const entries = htmls.slice(0, 4).map(it => {
    return [
      fn['Html:find']!(it, '.list-col:nth-child(1)').text().trim(),
      fn['Html:find']!(it, '.list-col:nth-child(2)').text().trim()
    ]
  })

  const result = Object.fromEntries(entries)

  assert.deepEqual(result, {
    'Зона морозостойкости (зимостойкость)': '4 (до -35С)',
    'Группа': 'Шиповники и парковые',
    'Высота взрослого растения': '100 см',
    'Производитель (питомник)': 'Голландия'
  })
})

test('Html:toStr', async () => {
  const htmlStr = await readFile(
    path.join(process.cwd(), 'test/cases/sample.html'),
    'utf8'
  )

  const html = fn['Html:fromStr']!(htmlStr)

  const html2 = fn['Html:find']!(html, '#product-tabs-nav')

  const result = fn['Html:toStr']!(html2)

  assert.equal(
    result.trim(),
    '<ul class="list">\n                                <li class="list-item" v-for="(tab, key) in tabs" :class="[\'list-item--\' + key, {\'list-item--active\': tab.active}, {\'list-item--no-mobile\': tab.desktopOnly}, {\'list-item--no-desktop\': tab.mobileOnly}]" @click="choseTab(key, true)" v-if="!tab.hidden &amp;&amp; tab.quantity !== \'null\'">\n                                  ${ tab.label }\n                                  <span v-if="tab.quantity" class="list-item-count">${ tab.quantity }</span>\n                                </li>\n                              </ul>'
  )
})

test('Html:asText', async () => {
  const htmlStr = await readFile(
    path.join(process.cwd(), 'test/cases/sample.html'),
    'utf8'
  )

  const html = fn['Html:fromStr']!(htmlStr)

  const html2 = fn['Html:find']!(html, 'title')

  const result = fn['Html:asText']!(html2)

  assert.equal(
    result.trim(),
    'Роза Морден Файрглоу канадская парковая купить в Москве по низкой цене - интернет-магазин Гаршинка'
  )
})
