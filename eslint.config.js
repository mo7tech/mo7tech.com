import globals from 'globals';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import js from '@eslint/js';

export default defineConfigWithVueTs(
  // 1. 原生全局忽略（只有 ignores 没有 files 即为全局忽略）
  {
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/*.min.js',
      '.obsidian/**',
      '.stfolder/**',
    ],
  },

  // 2. 基础 JS 推荐配置（必须放在 TS / Vue 前面）
  js.configs.recommended,
  // 3. Vue 3 推荐规则（建议使用 flat/recommended 获取完整模板校验）
  pluginVue.configs['flat/recommended'],
  // 4. Vue + TS 推荐规则（覆盖 JS 冲突项）
  vueTsConfigs.recommended,
  // 5. 语言环境与自定义业务规则
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // 必须关闭原生 unused-vars，开启 TS 专用版本
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-this-alias': 'off',

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info', 'group', 'groupCollapsed', 'groupEnd', 'table'],
        },
      ],
      // 禁止使用嵌套的三元表达式
      'no-nested-ternary': 'error',
      // 强制统一 this 别名
      'consistent-this': ['error', '_this'],
      // 强制对象字面量中的属性和方法使用 ES6 简写语法
      'object-shorthand': 'error',
      // 禁止省略花括号的单行写法
      curly: 'error',
      // 强制 switch 必须包含 default 分支
      'default-case': 'error',
      // 声明后从未被重新赋值的变量，必须强制使用 const
      'prefer-const': 'error',
      'no-var': 'error',
      // 强制使用模板字符串代替复杂的字符串拼接
      'prefer-template': 'error',
    },
  },

  // 6. 解决与 Prettier 的冲突（必须作为数组最后一项生效）
  eslintConfigPrettier,
);
