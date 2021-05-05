import { UserConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
const { resolve } = require('path');

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })

export default ({ command, mode, ...rest }): UserConfig => {
	console.log(command, mode, rest);
	// 通过loadEnv('mode',)
	console.log(loadEnv(mode, __dirname));

	return {
		base: '/',
		plugins: [
			// vue文件
			vue(),
			// 配置 浏览器兼容性
			{
				...legacy({
					targets: ['defaults', 'not IE 11'],
				}),
				// 默认在build和serve都会运行 可以通过apply指定模式
				apply: 'build',
				// 默认post,在vite核心插件后调用  pre：核心插件前调用
				enforce: 'pre',
			},
		],
		// 默认： 'development' (开发模式)，'production' (生产模式)
		mode: 'development',
		// 设为 false 可以避免 Vite 清屏而错过在终端中打印某些关键信息
		clearScreen: false,
		optimizeDeps: {},
		resolve: {
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
			// 别名
			alias: {
				'@': resolve(__dirname, './src'),
			},
		},
		// 配置css
		// css: {},
		// 配置json
		json: {
			// 导出是使用是否JSON.parse()转成对象,字面量的性能较好
			stringify: false,
		},
		css: {},
		server: {
			// host(主机名) port(端口号) https(是否开启https) open(自动打开浏览器)
			// strictPort(端口号被占用是否直接退出)
			// force  设置为 true 强制使依赖重新预构建
			force: true,
			// 实现代理
			proxy: {
				'/api': {
					target: 'http://localhost:666',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),
				},
			},
			// 为开发服务器配置cors
			cors: true,
			// hmr 热更新
			hmr: {
				timeout: 5000,
			},
			// 监听
			// watch:{}
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
