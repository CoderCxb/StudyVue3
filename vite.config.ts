import { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const { resolve } = require('path');

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })

export default ({ command, mode, ...rest }): UserConfig => {
	console.log(command, mode, rest);
	return {
		plugins: [vue()],
		// 默认： 'development' (开发模式)，'production' (生产模式)
		optimizeDeps: {},
		resolve: {
			alias: {
				'@assets': resolve(__dirname, './src/assets'),
				'@components': resolve(__dirname, './src/components'),
			},
		},
		server: {
			// 实现代理
			proxy: {
				'/api': {
					target: 'http://localhost:666',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
		},
		build: {
			// 1. target 设置最终构建的浏览器兼容目标
			// modules 支持原生 ES 模块的浏览器
			// esnext 即指执行 minify 转换（作最小化压缩）并假设有原生动态导入支持
			target: 'modules',
			// 2. polyfillDynamicImport
			// 是否自动注入 polyfill 默认为true,除非 target是esnext
			polyfillDynamicImport: true,
			// 3. assetsInlineLimit 设置资源阈值
			// 默认4096 小于阈值时 将资源内联为base64
			assetsInlineLimit: 4096,
			// 4. css 优化
			cleanCssOptions: {},
			// 5. cssCodeSplit css切片
			// 如果禁用 则整个项目的css都会被提取到一个文件
			cssCodeSplit: true,
			// 6.sourcemap 构建后是否生成 source map 文件
			sourcemap: true,
			// 7. 配置rollup选项
			rollupOptions: {},
			// 8. brotliSize
			// brotliSize: false,
			// 9. minify 最小化混淆
			// boolean | 'terser' | 'esbuild' 默认 terser,推荐terser,体积更小
			minify: 'terser',
			// 10. terser设置
			terserOptions: {},
			// 10. chunk大小警告限制(单位kb) 默认500
			chunkSizeWarningLimit: 1024,
			// 11. 启动rollup的监听器
			// watch: {},
		},
	};
};
