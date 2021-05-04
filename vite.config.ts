import { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()]
// })

export default ({ command, mode, ...rest }): UserConfig => {
	console.log(command, mode, rest);
	return {
		plugins: [vue()],
	};
};
