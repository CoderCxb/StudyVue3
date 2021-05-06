import { ElButton, ElAlert } from 'element-plus';
import { App } from 'vue';

export function importElementComponents(app: App) {
	app.use(ElButton);
	app.use(ElAlert);
}
