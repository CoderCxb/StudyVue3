#### 1. 使用 alias 别名方式 简化导入

```javascript
// 这样导入的时候 <script lang='ts'>会报错,但是能照常运行
resolve: {
  // 别名
  alias: {
    '@': resolve(__dirname, './src'),
  },
},
```

#### 2. 在 js/ts.config.json 中配置路径 不会报错

```
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  },
}
```
