# Prettier + ESList

---

## 1. Instalar as dependências

No root do seu projeto, rode:

```bash
npm i -D prettier eslint-plugin-prettier eslint-config-prettier lint-staged husky
```

- **prettier**: o formatador
- **eslint-plugin-prettier**: faz o ESLint rodar o Prettier como regra
- **eslint-config-prettier**: desliga regras do ESLint que conflitam com Prettier
- **lint‑staged** + **husky**: para pré‑commit automático

---

## 2. Ajustar o `eslint.config.mjs`

Abra seu `eslint.config.mjs` e adicione o plugin-prettier e a regra `prettier/prettier`. Por exemplo:

```js
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
// @ts-expect-error
import prettierPlugin from 'eslint-plugin-prettier'

export default withNuxt({
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    // roda o Prettier como regra do ESLint
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        trailingComma: 'all',
        vueIndentScriptAndStyle: true,
        tabWidth: 2,
        bracketSameLine: false,
      },
    ],

    // suas regras Vue / TS existentes
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
    'vue/block-order': [
      'error',
      { order: ['script[setup]', 'template', 'style'] },
    ],
    'vue/define-macros-order': [
      'error',
      { order: ['defineOptions', 'defineProps', 'defineEmits'] },
    ],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: true,
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 1 },
        multiline: { max: 1 },
      },
    ],
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
  },
})
```

Isso faz o ESLint:

1. **rodar o Prettier** e reportar formatações incorretas como erro (`prettier/prettier: error`)
2. **desligar** (via `eslint-config-prettier` automaticamente, graças ao `withNuxt()`) as regras conflitantes

---

## 3. Criar `.prettierrc` e `.prettierignore`

No root:

**`.prettierrc`**:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "vueIndentScriptAndStyle": true,
  "tabWidth": 2,
  "bracketSameLine": false
}
```

**`.prettierignore`**:

```
node_modules
.dist
.nuxt
```

---

## 4. Configurar VS Code

No seu **`.vscode/settings.json`** adicione:

```jsonc
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
  "eslint.experimental.useFlatConfig": true,
}
```

- **`eslint.validate`** informa ao VS Code para detectar erros em `.vue`
- **`codeActionsOnSave`** aplica correções do ESLint (inclusive Prettier)
- **`defaultFormatter`** garante que o Prettier formate

---

## 5. Scripts e Teste

1. No `package.json`, configure o lint-staged:

   ```json
   {
     "scripts": {
       "lint": "eslint . --ext .js,.ts,.vue",
       "lint:fix": "eslint . --ext .js,.ts,.vue --fix",
       "format": "prettier --write ."
     }
   }
   ```

- **Salvar um `.vue/ .ts`** com erros de estilo deve mostrar linhas vermelhas e formatar
- **`npm run lint`** deve apontar erros (incluindo `prettier/prettier`)
- **`npm run format`** deve formatar todos os arquivos

---
