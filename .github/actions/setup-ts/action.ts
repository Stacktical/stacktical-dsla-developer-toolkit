name: "Setup DTK"
description: "Setup DTK"
runs:
  using: "composite"
  steps:
    - uses: actions/setup-node@v2
      with:
        node-version: ${{ env.NODE_VERSION }}
    // - uses: actions/cache@v2
    //   name: Cache Typescript node_modules
    //   id: cache-typescript-node-modules
    //   with:
    //     path: |
    //       ./node_modules/
    //     key: solana-${{ runner.os }}-v0000-${{ env.NODE_VERSION }}-${{ hashFiles('./**/yarn.lock') }}
    // - uses: actions/cache@v2
    //   name: Cache Typescript Dist
    //   id: cache-typescript-dist
    //   with:
    //     path: |
    //       ./dist/
    //     key: solana-${{ runner.os }}-v0000-${{ env.NODE_VERSION }}-${{ hashFiles('./**/*.ts') }}
    - run: yarn install
      shell: bash