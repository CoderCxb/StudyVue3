<template>
	<div id="main"></div>
</template>

<script>
import * as echarts from 'echarts/core';
import {
	TitleComponent,
	TooltipComponent,
	LegendComponent,
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted } from 'vue';

export default {
	setup() {
		echarts.use([
			TitleComponent,
			TooltipComponent,
			LegendComponent,
			PieChart,
			CanvasRenderer,
		]);

		onMounted(() => {
			var chartDom = document.getElementById('main');
			var myChart = echarts.init(chartDom);
			let option = {
				title: {
					text: '某站点用户访问来源',
					subtext: '纯属虚构',
					left: 'center',
				},
				tooltip: {
					trigger: 'item',
				},
				legend: {
					orient: 'vertical',
					left: 'left',
				},
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '40%',
						data: [
							{ value: 900, name: '搜索引擎' },
							{ value: 735, name: '直接访问' },
							{ value: 580, name: '邮件营销' },
							{ value: 484, name: '联盟广告' },
							{ value: 300, name: '视频广告' },
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)',
							},
						},
					},
				],
			};

			option && myChart.setOption(option);
		});
	},
};
</script>

<style scoped>
#main {
	width: 500px;
	height: 500px;
}
</style>
