#### 1. 安装依赖
```
npm i --dev vite-plugin-compression
```

#### 2. 导入并使用
```javascript
import viteCompression from 'vite-plugin-compression';
export default ({ command, mode, ...rest }): UserConfig => {
  return {
    pluguns:[
      ...,
      viteCompression({
				verbose: true,      // 记录压缩文件和压缩率,默认 true
				threshold: 10240,   // 阈值(字节)，超过阈值则压缩,默认1025
        filter:'',          // 哪些文件需要压缩 默认/\.(js|mjs|json|css|html)$/i 也可以接收函数 (name:string)=>boolean
				disable: false,     // 是否禁用压缩
				algorithm: 'gzip',  // 压缩算法 默认'gzip' 取值:"gzip" | "brotliCompress" | "deflate" | "deflateRaw"
				ext: '.gz',         // 压缩以后的后缀名 默认 .gz
        deleteOriginFile:false, // 压缩后是否删除源文件 默认false
        // ompressionOptions: {}   // 编译选项 ZlibOptions和BrotliOptions
			})
    ]
  }
}
```