import test from 'node:test'
import assert from 'node:assert/strict'

import * as num from '../../../src/functions/num/index.js'

test('num.parseFloat', () => {
  /* prettier-ignore */
  const cases = [
    ['0'                  , 0           ],
    ['1'                  , 1           ],
    ['123'                , 123         ],
    ['123.456'            , 123.456     ],
    ['00123.456'          , 123.456     ],
    ['0.123'              , 0.123       ],
    ['123,456'            , 123.456     ],
    ['123,456.00'         , 123456      ],
    ['123,456,789'        , 123456789   ],
    ['123,456,789.12'     , 123456789.12],
    ['123.456,789.12'     , 123.456     ],
    ['123 456'            , 123456      ],
    ['1 2 3'              , 123         ],
    ['123, 4 56,789 . 1 2', 123456789.12],
    ['foo123.45 sdf '     , 123.45      ],
    ['foo0 123 .45 sdf '  , 123.45      ],
    ['$1 393.26'          , 1393.26     ],
    ['456,85 руб'         , 456.85      ]
  ] as [string, number][]

  for (const c of cases) {
    assert.equal(
      num.parseFloat(c[0]),
      c[1],
      `should parse ${c[0]} to ${c[1]} float number`
    )
  }
})
